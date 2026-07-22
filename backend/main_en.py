"""
main_en.py — FastAPI English Edition
"""
from fastapi import FastAPI, Request, Query, HTTPException
import stripe
import os
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import pytz

from themes import DEFAULT_THEMES
from themes_en import (
    translate_themes_dict, translate_theme, translate_stock,
    EXTRA_THEMES_EN, THEME_NAME_EN,
)
from data import (
    fetch_theme_results, fetch_theme_trend, fetch_momentum_data,
    fetch_heatmap_data, fetch_heatmap_monthly, fetch_macro_data,
    fetch_market_segments, fetch_segment_detail, fetch_theme_detail,
    MARKET_SEGMENTS, SEGMENT_GROUPS, warmup_cache_extended,
)


# ── Subscription plan check (gating valuation columns) ──
from supabase import create_client as _create_client
import os as _os
_sb_url = _os.environ.get("SUPABASE_URL", "")
_sb_key = _os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
_sb_plan_client = _create_client(_sb_url, _sb_key) if _sb_url and _sb_key else None

def _is_subscribed(uid: str | None) -> bool:
    if not uid or not _sb_plan_client:
        return False
    try:
        res = _sb_plan_client.table("subscriptions") \
            .select("status,plan") \
            .eq("user_id", uid) \
            .eq("status", "active") \
            .execute()
        if res.data and len(res.data) > 0:
            return True
    except Exception:
        pass
    return False

def _strip_valuation(stocks: list, uid: str | None) -> list:
    subscribed = _is_subscribed(uid)
    if not subscribed:
        for s in stocks:
            for k in ("per", "per_fwd", "pbr", "pbr_fwd", "peg", "peg_fwd"):
                if k in s:
                    s[k] = None
    return stocks, (not subscribed)


app = FastAPI(title="StockWaveJP API (English)", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://stockwavejp-en.com','https://www.stockwavejp-en.com','http://localhost:5173','http://127.0.0.1:5173'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'], expose_headers=['*'],
)

THEMES_EN = {**translate_themes_dict(DEFAULT_THEMES), **EXTRA_THEMES_EN}

MACRO_NAME_EN = {
    "\u65e5\u7d4c\u5e73\u5747": "Nikkei 225",
    "TOPIX": "TOPIX",
    "S&P500": "S&P500",
    "\u30c9\u30eb\u5186": "USD/JPY",
    "\u30ca\u30b9\u30c0\u30c3\u30af": "Nasdaq",
    "VIX": "VIX",
}

SEGMENT_NAME_EN = {
    "\u65e5\u7d4c225\uff5c\u6280\u8853\u30fb\u96fb\u6c17\u6a5f\u5668": "Nikkei225 | Tech & Electronics",
    "\u65e5\u7d4c225\uff5c\u7d20\u6750\u30fb\u5316\u5b66": "Nikkei225 | Materials & Chemicals",
    "\u65e5\u7d4c225\uff5c\u8cc7\u672c\u8ca1\u30fb\u6a5f\u68b0": "Nikkei225 | Capital Goods & Machinery",
    "\u65e5\u7d4c225\uff5c\u6d88\u8cbb\u30fb\u30b5\u30fc\u30d3\u30b9": "Nikkei225 | Consumer & Services",
    "\u65e5\u7d4c225\uff5c\u91d1\u878d": "Nikkei225 | Financials",
    "\u65e5\u7d4c225\uff5c\u904b\u8f38\u30fb\u901a\u4fe1": "Nikkei225 | Transport & Telecom",
    "TOPIX\uff5cCore30\uff08\u6642\u4fa1\u7dcf\u984d\u6700\u4e0a\u4f4d\uff09": "TOPIX | Core30",
    "TOPIX\uff5cLarge70\uff08\u5927\u578b\u682a\uff09": "TOPIX | Large70",
    "\u30d7\u30e9\u30a4\u30e0\u5e02\u5834\uff08\u4e3b\u8981\u9298\u67c4\uff09": "Prime Market",
    "\u30b9\u30bf\u30f3\u30c0\u30fc\u30c9\u5e02\u5834\uff08\u6ce8\u76ee\u9298\u67c4\uff09": "Standard Market",
    "\u30b0\u30ed\u30fc\u30b9\u5e02\u5834\uff08\u6ce8\u76ee\u9298\u67c4\uff09": "Growth Market",
}

SEGMENT_NAME_JA = {v: k for k, v in SEGMENT_NAME_EN.items()}


@app.on_event("startup")
async def startup_event():
    warmup_cache_extended(DEFAULT_THEMES)
    warmup_cache_extended(EXTRA_THEMES_EN)


@app.get("/")
def root():
    return {"status": "ok", "app": "StockWaveJP API (English)", "version": "1.0.0"}


@app.head("/api/status")
def head_status():
    return Response()


@app.get("/api/status")
def get_status():
    jst = pytz.timezone("Asia/Tokyo")
    est = pytz.timezone("America/New_York")
    now_jst = datetime.now(jst)
    now_est = datetime.now(est)
    h, m = now_jst.hour, now_jst.minute
    is_open = now_jst.weekday() < 5 and (
        (h == 9 and m >= 0) or (10 <= h <= 14) or (h == 15 and m == 0)
    )
    try:
        import yfinance as yf
        rate_df = yf.Ticker("JPY=X").history(period="1d", interval="1m", auto_adjust=True)
        usd_jpy = round(float(rate_df["Close"].iloc[-1]), 2) if len(rate_df) > 0 else None
    except Exception:
        usd_jpy = None
    return {
        "time_jst": now_jst.strftime("%H:%M JST"),
        "time_est": now_est.strftime("%H:%M EST"),
        "date": now_jst.strftime("%Y/%m/%d"),
        "is_open": is_open,
        "label": "Market Open" if is_open else "Market Closed",
        "usd_jpy": usd_jpy,
    }


@app.get("/api/themes")
def get_themes(period: str = Query(default="1mo")):
    results_ja = fetch_theme_results(DEFAULT_THEMES, period)
    results_en = [{**r, "theme": translate_theme(r["theme"])} for r in results_ja]
    extra_results = fetch_theme_results(EXTRA_THEMES_EN, period)
    results_en.extend(extra_results)
    results_en.sort(key=lambda x: x["pct"], reverse=True)
    rise = sum(1 for r in results_en if r["up"])
    fall = len(results_en) - rise
    avg = round(sum(r["pct"] for r in results_en) / len(results_en), 2) if results_en else 0
    return {
        "period": period,
        "themes": results_en,
        "summary": {
            "total": len(results_en), "rise": rise, "fall": fall, "avg": avg,
            "top": results_en[0] if results_en else None,
            "bot": results_en[-1] if results_en else None,
        }
    }


@app.get("/api/theme-names")
def get_theme_names():
    names_en = [translate_theme(t) for t in DEFAULT_THEMES.keys()]
    names_en += list(EXTRA_THEMES_EN.keys())
    return {"themes": names_en}


@app.get("/api/momentum")
def get_momentum(period: str = Query(default="1mo")):
    data = fetch_momentum_data(DEFAULT_THEMES, period)
    data_en = [{**d, "theme": translate_theme(d["theme"])} for d in data]
    return {"period": period, "data": data_en}


@app.get("/api/fund-flow")
def get_fund_flow(period: str = Query(default="1mo")):
    results_ja = fetch_theme_results(DEFAULT_THEMES, period)
    results_en = [{**r, "theme": translate_theme(r["theme"])} for r in results_ja]
    return {
        "period": period,
        "gainers": results_en[:10],
        "losers": list(reversed(results_en[-10:])),
        "all": results_en,
    }


@app.get("/api/trends")
def get_trends(themes: str = Query(default=""), period: str = Query(default="1y")):
    theme_list = [t.strip() for t in themes.split(",") if t.strip()] if themes else []
    if not theme_list:
        theme_list = [translate_theme(t) for t in DEFAULT_THEMES.keys()]
    result = {}
    for theme_en in theme_list:
        ja_name = next((k for k, v in THEME_NAME_EN.items() if v == theme_en), None)
        if ja_name:
            data = fetch_theme_trend(DEFAULT_THEMES, ja_name, period)
        elif theme_en in EXTRA_THEMES_EN:
            data = fetch_theme_trend(EXTRA_THEMES_EN, theme_en, period)
        else:
            data = []
        result[theme_en] = data
    return {"period": period, "trends": result}


@app.get("/api/trend/{theme_name}")
def get_trend(theme_name: str, period: str = Query(default="1y")):
    ja_name = next((k for k, v in THEME_NAME_EN.items() if v == theme_name), theme_name)
    themes_to_use = EXTRA_THEMES_EN if theme_name in EXTRA_THEMES_EN else DEFAULT_THEMES
    name_to_use = theme_name if theme_name in EXTRA_THEMES_EN else ja_name
    data = fetch_theme_trend(themes_to_use, name_to_use, period)
    return {"theme": theme_name, "period": period, "data": data}


@app.get("/api/heatmap")
def get_heatmap():
    data_ja = fetch_heatmap_data(DEFAULT_THEMES)
    data_en = {translate_theme(k): v for k, v in data_ja.items()}
    return {"data": data_en}


@app.get("/api/heatmap/monthly")
def get_monthly_heatmap():
    data_ja, months = fetch_heatmap_monthly(DEFAULT_THEMES)
    data_en = {translate_theme(k): v for k, v in data_ja.items()}
    return {"data": data_en, "months": months}


@app.get("/api/macro")
def get_macro(period: str = Query(default="1y")):
    data_ja = fetch_macro_data(period)
    data_en = {MACRO_NAME_EN.get(k, k): v for k, v in data_ja.items()}
    return {"period": period, "data": data_en}


@app.get("/api/market-rank")
def get_market_rank(period: str = Query(default="1mo")):
    data_ja = fetch_market_segments(period)
    data_en = {SEGMENT_NAME_EN.get(k, k): v for k, v in data_ja.items()}
    groups_en = {
        "Nikkei 225": [SEGMENT_NAME_EN.get(k, k) for k in SEGMENT_GROUPS.get("\u65e5\u7d4c225", [])],
        "TOPIX": [SEGMENT_NAME_EN.get(k, k) for k in SEGMENT_GROUPS.get("TOPIX", [])],
        "Market": [SEGMENT_NAME_EN.get(k, k) for k in SEGMENT_GROUPS.get("\u5e02\u5834\u533a\u5206", [])],
    }
    return {"period": period, "data": data_en, "groups": groups_en}



@app.get("/api/market-rank-list")
def get_market_rank_list_en(period: str = Query(default="1mo")):
    """market-rank-list endpoint for English frontend"""
    data = fetch_market_segments(period)
    # Translate segment names to English
    translated = {}
    for seg_name, seg_data in data.items():
        en_name = SEGMENT_NAME_EN.get(seg_name, seg_name)
        translated[en_name] = seg_data
    return {"period": period, "data": translated, "groups": SEGMENT_GROUPS}

@app.get("/api/market-rank/{seg_name}")
def get_segment_detail(seg_name: str, period: str = Query(default="1mo"), uid: str = Query(default=None)):
    ja_name = SEGMENT_NAME_JA.get(seg_name, seg_name)
    data = fetch_segment_detail(ja_name, period)
    stocks_en = [
        {**s, "name": translate_stock(s.get("name", ""))}
        for s in data.get("stocks", [])
    ]
    stocks_en, locked = _strip_valuation(stocks_en, uid)
    return {"period": period, "segment": seg_name, "data": {**data, "stocks": stocks_en}, "valuation_locked": locked}


@app.get("/api/theme-detail/{theme_name}")
def get_theme_detail(theme_name: str, period: str = Query(default="1mo"), uid: str = Query(default=None)):
    ja_name = next((k for k, v in THEME_NAME_EN.items() if v == theme_name), theme_name)
    themes_to_use = EXTRA_THEMES_EN if theme_name in EXTRA_THEMES_EN else DEFAULT_THEMES
    name_to_use = theme_name if theme_name in EXTRA_THEMES_EN else ja_name
    theme_stocks = themes_to_use.get(name_to_use, {})
    data = fetch_theme_detail(name_to_use, theme_stocks, period)
    stocks_en = [
        {**s, "name": translate_stock(s.get("name", ""))}
        for s in data.get("stocks", [])
    ]
    stocks_en, locked = _strip_valuation(stocks_en, uid)
    return {"period": period, "data": {**data, "theme": theme_name, "stocks": stocks_en}, "valuation_locked": locked}


@app.get("/api/stock-info/{ticker}")
def get_stock_info(ticker: str):
    try:
        import yfinance as yf
        t = yf.Ticker(ticker)
        info = t.info
        hist = t.history(period="2d", interval="1d", auto_adjust=True)
        price_jpy = round(float(hist["Close"].iloc[-1]), 0) if len(hist) > 0 else None
        name = info.get("longName") or info.get("shortName") or ticker
        usd_jpy = None
        price_usd = None
        try:
            rate_df = yf.Ticker("JPY=X").history(period="1d", interval="1m", auto_adjust=True)
            usd_jpy = float(rate_df["Close"].iloc[-1]) if len(rate_df) > 0 else None
            if price_jpy and usd_jpy:
                price_usd = round(price_jpy / usd_jpy, 2)
        except Exception:
            pass
        return {
            "ticker": ticker, "name": translate_stock(name),
            "price_jpy": price_jpy, "price_usd": price_usd, "usd_jpy": usd_jpy,
        }
    except Exception as e:
        return {"ticker": ticker, "name": None, "error": str(e)}


@app.get("/api/stock-search")
def search_stocks(q: str = Query(default="")):
    if not q.strip():
        return {"results": []}
    try:
        import yfinance as yf
        results = []
        q = q.strip()
        if q.isdigit() and len(q) == 4:
            ticker = q + ".T"
            try:
                t = yf.Ticker(ticker)
                info = t.info
                hist = t.history(period="2d", interval="1d", auto_adjust=True)
                price = round(float(hist["Close"].iloc[-1]), 0) if len(hist) > 0 else None
                name = info.get("longName") or info.get("shortName") or ticker
                results.append({"ticker": ticker, "name": translate_stock(name), "price": price})
            except Exception:
                pass
        else:
            try:
                search = yf.Search(q, max_results=8)
                for item in (search.quotes or []):
                    sym = item.get("symbol", "")
                    name = item.get("longname") or item.get("shortname") or sym
                    if sym and name:
                        results.append({"ticker": sym, "name": name, "exchange": item.get("exchange", ""), "price": None})
            except Exception:
                pass
        return {"results": results[:8]}
    except Exception as e:
        return {"results": [], "error": str(e)}

# ── Stripe ──────────────────────────────────────────────
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")

PRICE_MAP = {
    "standard_monthly": os.environ.get("STRIPE_PRICE_STD_MONTHLY", ""),
    "pro_monthly":      os.environ.get("STRIPE_PRICE_PRO_MONTHLY", ""),
}

@app.post("/api/stripe/create-checkout")
async def create_checkout(request: Request):
    body = await request.json()
    price_key = body.get("price_key") or body.get("priceKey", "")
    user_id   = body.get("userId", "")
    email     = body.get("email", "")
    
    price_id = PRICE_MAP.get(price_key, "")
    if not price_id:
        available = list(PRICE_MAP.keys())
        return {"error": f"Invalid price key: '{price_key}'. Available: {available}. PRICE_MAP values: {list(PRICE_MAP.values())}"}
    
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            customer_email=email,
            line_items=[{"price": price_id, "quantity": 1}],
            success_url="https://stockwavejp-en.com/?checkout=success",
            cancel_url="https://stockwavejp-en.com/?checkout=cancel",
            metadata={"user_id": user_id, "plan": price_key},
        )
        return {"url": session.url}
    except stripe.error.StripeError as e:
        return {"error": f"Stripe error: {e.user_message or str(e)}"}
    except Exception as e:
        import traceback
        return {"error": f"Server error: {str(e)}", "detail": traceback.format_exc()}

@app.post("/api/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    
    try:
        event = stripe.Webhook.construct_event(payload, sig, webhook_secret)
    except Exception:
        return {"error": "Invalid signature"}
    
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = session.get("metadata", {}).get("user_id", "")
        plan = session.get("metadata", {}).get("plan", "").replace("_monthly", "")
        
        if user_id and plan:
            from supabase import create_client, Client
            sb_url = os.environ.get("SUPABASE_URL", "")
            sb_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
            sb = create_client(sb_url, sb_key)
            sb.table("subscriptions").upsert({
                "user_id": user_id,
                "plan": plan,
                "status": "active",
                "stripe_subscription_id": session.get("subscription", ""),
                "stripe_customer_id": session.get("customer", ""),
            }, on_conflict="user_id").execute()
    
    return {"received": True}


# ── Authenticated billing and account management ────────────────────────────
def _authenticated_supabase_user(request: Request):
    auth_header = request.headers.get("authorization", "")
    if not auth_header.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Please sign in again and retry.")
    token = auth_header.split(" ", 1)[1].strip()
    sb_url = os.environ.get("SUPABASE_URL", "")
    sb_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not sb_url or not sb_key:
        raise HTTPException(status_code=503, detail="Authentication integration is not configured.")
    sb = _create_client(sb_url, sb_key)
    response = sb.auth.get_user(token)
    user = getattr(response, "user", None)
    if not user:
        raise HTTPException(status_code=401, detail="The sign-in session could not be verified.")
    return sb, user


def _subscription_rows(sb, user_id: str):
    result = sb.table("subscriptions").select(
        "stripe_subscription_id,stripe_customer_id,status,plan,current_period_end"
    ).eq("user_id", user_id).execute()
    return result.data or []


@app.post("/api/stripe/create-portal")
async def create_portal(request: Request):
    try:
        sb, auth_user = _authenticated_supabase_user(request)
        rows = _subscription_rows(sb, auth_user.id)
        customer_id = next((row.get("stripe_customer_id") for row in rows if row.get("stripe_customer_id")), None)
        if not customer_id:
            raise HTTPException(status_code=404, detail="Stripe customer information was not found.")
        session = stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url="https://stockwavejp-en.com",
        )
        return {"url": session.url}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/stripe/cancel-subscription")
async def cancel_subscription(request: Request):
    try:
        sb, auth_user = _authenticated_supabase_user(request)
        rows = _subscription_rows(sb, auth_user.id)
        row = next((r for r in rows if r.get("status") in ("active", "past_due", "trialing", "canceling") and r.get("stripe_subscription_id")), None)
        if not row:
            raise HTTPException(status_code=404, detail="No active subscription was found.")
        if row.get("status") == "canceling":
            return {"ok": True, "message": "Cancellation is already scheduled for the end of the billing period.", "current_period_end": row.get("current_period_end")}
        sub_id = row["stripe_subscription_id"]
        subscription = stripe.Subscription.modify(sub_id, cancel_at_period_end=True)
        period_end = getattr(subscription, "current_period_end", None)
        sb.table("subscriptions").update({"status": "canceling"}).eq("stripe_subscription_id", sub_id).execute()
        return {"ok": True, "message": "Cancellation has been scheduled. Access continues until the billing period ends.", "current_period_end": period_end}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/account/delete")
async def delete_account(request: Request):
    try:
        sb, auth_user = _authenticated_supabase_user(request)
        user_id = auth_user.id
        rows = _subscription_rows(sb, user_id)
        for row in rows:
            sub_id = row.get("stripe_subscription_id")
            if sub_id and row.get("status") in ("active", "canceling", "past_due", "trialing"):
                try:
                    stripe.Subscription.modify(sub_id, cancel_at_period_end=True)
                except Exception as exc:
                    raise HTTPException(status_code=502, detail=f"The account was not deleted because subscription cancellation could not be scheduled: {exc}")
        for table in ("custom_themes", "favorites", "user_settings"):
            try:
                sb.table(table).delete().eq("user_id", user_id).execute()
            except Exception:
                pass
        # Keep subscription records for billing/audit purposes; remove the auth account last.
        sb.auth.admin.delete_user(user_id)
        return {"ok": True}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Account deletion failed: {exc}")
