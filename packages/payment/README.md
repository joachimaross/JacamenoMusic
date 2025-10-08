# @jacameno/payment

Payment Processing SDK for JACAMENO Platform

## Overview

This package provides payment processing interfaces for Stripe, PayPal, and subscription management in the JACAMENO platform.

## Features

- Customer management
- Payment method handling
- One-time payments
- Subscription management
- Refund processing
- Multiple payment providers (Stripe, PayPal)
- Predefined subscription plans

## Installation

```bash
yarn add @jacameno/payment
```

## Usage

### Initialize Payment Processor

```typescript
import { createPaymentProcessor, PaymentProvider } from '@jacameno/payment';

const processor = createPaymentProcessor(PaymentProvider.Stripe);
```

### Customer Management

```typescript
// Create customer
const customer = await processor.createCustomer({
  email: 'user@example.com',
  name: 'John Doe',
});

// Update customer
await processor.updateCustomer(customer.id, {
  name: 'Jane Doe',
});
```

### Payment Methods

```typescript
// Attach payment method
const paymentMethod = await processor.attachPaymentMethod(
  customer.id,
  'pm_card_visa'
);

// Set as default
await processor.setDefaultPaymentMethod(customer.id, paymentMethod.id);

// List payment methods
const methods = await processor.listPaymentMethods(customer.id);
```

### One-time Payments

```typescript
// Create payment intent
const intent = await processor.createPaymentIntent(
  1999, // amount in cents
  'usd',
  customer.id,
  { orderId: 'order_123' }
);

// Confirm payment
await processor.confirmPaymentIntent(intent.id);

// Refund
await processor.refundPayment(intent.id);
```

### Subscriptions

```typescript
import { SUBSCRIPTION_PLANS } from '@jacameno/payment';

// Create subscription
const subscription = await processor.createSubscription(
  customer.id,
  SUBSCRIPTION_PLANS.PRO.id
);

// Cancel subscription
await processor.cancelSubscription(subscription.id, true); // cancel at period end
```

### Predefined Plans

```typescript
import { SUBSCRIPTION_PLANS } from '@jacameno/payment';

console.log(SUBSCRIPTION_PLANS.FREE);
console.log(SUBSCRIPTION_PLANS.PRO);
console.log(SUBSCRIPTION_PLANS.STUDIO);
```

## API

### PaymentProcessor

**Customer Management**
- `createCustomer(data)` - Create new customer
- `getCustomer(customerId)` - Get customer details
- `updateCustomer(customerId, data)` - Update customer
- `deleteCustomer(customerId)` - Delete customer

**Payment Methods**
- `attachPaymentMethod(customerId, paymentMethodId)` - Attach payment method
- `detachPaymentMethod(paymentMethodId)` - Remove payment method
- `listPaymentMethods(customerId)` - List customer's payment methods
- `setDefaultPaymentMethod(customerId, paymentMethodId)` - Set default method

**Payments**
- `createPaymentIntent(amount, currency, customerId, metadata)` - Create payment
- `confirmPaymentIntent(paymentIntentId)` - Confirm payment
- `cancelPaymentIntent(paymentIntentId)` - Cancel payment
- `refundPayment(paymentIntentId, amount)` - Refund payment

**Subscriptions**
- `createSubscription(customerId, planId)` - Create subscription
- `getSubscription(subscriptionId)` - Get subscription details
- `updateSubscription(subscriptionId, data)` - Update subscription
- `cancelSubscription(subscriptionId, cancelAtPeriodEnd)` - Cancel subscription
- `listSubscriptions(customerId)` - List customer subscriptions

## Subscription Plans

### Free
- 3 projects
- 10 tracks per project
- Basic mixing
- Community support

### Pro ($19.99/month)
- Unlimited projects and tracks
- Advanced AI mixing
- VST plugin support
- Priority support
- 14-day trial

### Studio ($99.99/month)
- Everything in Pro
- Team collaboration
- Custom branding
- API access
- 30-day trial

## Development

This is currently a stub implementation. Production implementation should:

1. Integrate with actual Stripe SDK
2. Integrate with PayPal SDK
3. Add webhook handlers
4. Implement proper error handling
5. Add payment receipt generation
6. Implement invoice management
7. Add usage-based billing
8. Support multiple currencies
9. Add tax calculation
10. Implement dunning management

## License

MIT
