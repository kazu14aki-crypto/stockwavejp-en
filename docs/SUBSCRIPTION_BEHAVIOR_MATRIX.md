# Subscription behavior review

## Expected behavior

| State | Action | Behavior |
|---|---|---|
| No paid subscription | Subscribe | Record legal consent, then create one Stripe Checkout session |
| Active, same plan | View plan | Do not create a duplicate Checkout or subscription |
| Active, different plan | Change plan | Open Stripe Customer Portal |
| Cancellation scheduled, same plan | Resume | Set `cancel_at_period_end=false`; keep the existing subscription and create no immediate charge |
| Cancellation scheduled, different plan | Change plan | Use Customer Portal; do not create a second subscription |
| Subscription already ended | Subscribe again | Create a new Checkout and subscription |
| `past_due` | Try to subscribe | Prevent duplication and use Customer Portal to fix payment |
| Checkout abandoned | Try again | A new Checkout may be created if no completed subscription exists |
| Duplicate webhooks | Process event | Upsert the user subscription record |

## Stripe test-mode checks before launch

1. Successful Checkout and webhook synchronization
2. Access remains active until period end after scheduled cancellation
3. Resuming keeps the same Stripe subscription ID
4. Resuming creates no immediate or duplicate charge
5. Portal plan changes follow the configured proration behavior
6. Failed payment, Smart Retry, `past_due` and `unpaid` access rules
7. Delayed, out-of-order and duplicate webhooks
8. Refunds, disputes and account deletion

Static code review is complete. End-to-end billing tests with Stripe test clocks are still required.
