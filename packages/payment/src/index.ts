// Payment Processing SDK for JACAMENO Platform
// This module provides payment processing interfaces for Stripe, PayPal, and subscriptions

/**
 * Payment Provider Types
 */
export enum PaymentProvider {
  Stripe = 'stripe',
  PayPal = 'paypal',
}

/**
 * Payment Method Types
 */
export enum PaymentMethodType {
  Card = 'card',
  BankAccount = 'bank_account',
  PayPal = 'paypal',
  ApplePay = 'apple_pay',
  GooglePay = 'google_pay',
}

/**
 * Payment Status
 */
export enum PaymentStatus {
  Pending = 'pending',
  Processing = 'processing',
  Succeeded = 'succeeded',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Refunded = 'refunded',
}

/**
 * Subscription Status
 */
export enum SubscriptionStatus {
  Active = 'active',
  PastDue = 'past_due',
  Cancelled = 'cancelled',
  Unpaid = 'unpaid',
  Trialing = 'trialing',
}

/**
 * Payment Intent
 */
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

/**
 * Payment Method
 */
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  customerId: string;
  isDefault: boolean;
  details: PaymentMethodDetails;
}

/**
 * Payment Method Details
 */
export interface PaymentMethodDetails {
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
}

/**
 * Subscription Plan
 */
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
  trialPeriodDays?: number;
  features: string[];
}

/**
 * Subscription
 */
export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  metadata?: Record<string, any>;
}

/**
 * Customer
 */
export interface Customer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
  defaultPaymentMethodId?: string;
}

/**
 * Payment Processor Interface
 */
export interface PaymentProcessor {
  // Customer Management
  createCustomer(data: Omit<Customer, 'id'>): Promise<Customer>;
  getCustomer(customerId: string): Promise<Customer>;
  updateCustomer(customerId: string, data: Partial<Customer>): Promise<Customer>;
  deleteCustomer(customerId: string): Promise<void>;

  // Payment Methods
  attachPaymentMethod(customerId: string, paymentMethodId: string): Promise<PaymentMethod>;
  detachPaymentMethod(paymentMethodId: string): Promise<void>;
  listPaymentMethods(customerId: string): Promise<PaymentMethod[]>;
  setDefaultPaymentMethod(customerId: string, paymentMethodId: string): Promise<void>;

  // Payments
  createPaymentIntent(
    amount: number,
    currency: string,
    customerId: string,
    metadata?: Record<string, any>
  ): Promise<PaymentIntent>;
  confirmPaymentIntent(paymentIntentId: string): Promise<PaymentIntent>;
  cancelPaymentIntent(paymentIntentId: string): Promise<PaymentIntent>;
  refundPayment(paymentIntentId: string, amount?: number): Promise<PaymentIntent>;

  // Subscriptions
  createSubscription(customerId: string, planId: string): Promise<Subscription>;
  getSubscription(subscriptionId: string): Promise<Subscription>;
  updateSubscription(subscriptionId: string, data: Partial<Subscription>): Promise<Subscription>;
  cancelSubscription(subscriptionId: string, cancelAtPeriodEnd?: boolean): Promise<Subscription>;
  listSubscriptions(customerId: string): Promise<Subscription[]>;
}

/**
 * Stub Payment Processor Implementation
 */
export class StubPaymentProcessor implements PaymentProcessor {
  private customers: Map<string, Customer> = new Map();
  private paymentMethods: Map<string, PaymentMethod> = new Map();
  private paymentIntents: Map<string, PaymentIntent> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();

  // Customer Management
  async createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
    const customer: Customer = {
      id: `cus_${Date.now()}`,
      ...data,
    };
    this.customers.set(customer.id, customer);
    return customer;
  }

  async getCustomer(customerId: string): Promise<Customer> {
    const customer = this.customers.get(customerId);
    if (!customer) throw new Error('Customer not found');
    return customer;
  }

  async updateCustomer(customerId: string, data: Partial<Customer>): Promise<Customer> {
    const customer = await this.getCustomer(customerId);
    const updated = { ...customer, ...data };
    this.customers.set(customerId, updated);
    return updated;
  }

  async deleteCustomer(customerId: string): Promise<void> {
    this.customers.delete(customerId);
  }

  // Payment Methods
  async attachPaymentMethod(customerId: string, paymentMethodId: string): Promise<PaymentMethod> {
    const method: PaymentMethod = {
      id: paymentMethodId,
      type: PaymentMethodType.Card,
      customerId,
      isDefault: false,
      details: { last4: '4242', brand: 'visa' },
    };
    this.paymentMethods.set(paymentMethodId, method);
    return method;
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<void> {
    this.paymentMethods.delete(paymentMethodId);
  }

  async listPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    return Array.from(this.paymentMethods.values()).filter(
      pm => pm.customerId === customerId
    );
  }

  async setDefaultPaymentMethod(customerId: string, paymentMethodId: string): Promise<void> {
    const methods = await this.listPaymentMethods(customerId);
    methods.forEach(method => {
      method.isDefault = method.id === paymentMethodId;
      this.paymentMethods.set(method.id, method);
    });
  }

  // Payments
  async createPaymentIntent(
    amount: number,
    currency: string,
    customerId: string,
    metadata?: Record<string, any>
  ): Promise<PaymentIntent> {
    const intent: PaymentIntent = {
      id: `pi_${Date.now()}`,
      amount,
      currency,
      status: PaymentStatus.Pending,
      customerId,
      metadata,
      createdAt: new Date(),
    };
    this.paymentIntents.set(intent.id, intent);
    return intent;
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    const intent = this.paymentIntents.get(paymentIntentId);
    if (!intent) throw new Error('Payment intent not found');
    intent.status = PaymentStatus.Succeeded;
    this.paymentIntents.set(paymentIntentId, intent);
    return intent;
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    const intent = this.paymentIntents.get(paymentIntentId);
    if (!intent) throw new Error('Payment intent not found');
    intent.status = PaymentStatus.Cancelled;
    this.paymentIntents.set(paymentIntentId, intent);
    return intent;
  }

  async refundPayment(paymentIntentId: string, amount?: number): Promise<PaymentIntent> {
    const intent = this.paymentIntents.get(paymentIntentId);
    if (!intent) throw new Error('Payment intent not found');
    intent.status = PaymentStatus.Refunded;
    this.paymentIntents.set(paymentIntentId, intent);
    return intent;
  }

  // Subscriptions
  async createSubscription(customerId: string, planId: string): Promise<Subscription> {
    const subscription: Subscription = {
      id: `sub_${Date.now()}`,
      customerId,
      planId,
      status: SubscriptionStatus.Active,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    };
    this.subscriptions.set(subscription.id, subscription);
    return subscription;
  }

  async getSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) throw new Error('Subscription not found');
    return subscription;
  }

  async updateSubscription(
    subscriptionId: string,
    data: Partial<Subscription>
  ): Promise<Subscription> {
    const subscription = await this.getSubscription(subscriptionId);
    const updated = { ...subscription, ...data };
    this.subscriptions.set(subscriptionId, updated);
    return updated;
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = false
  ): Promise<Subscription> {
    const subscription = await this.getSubscription(subscriptionId);
    subscription.cancelAtPeriodEnd = cancelAtPeriodEnd;
    if (!cancelAtPeriodEnd) {
      subscription.status = SubscriptionStatus.Cancelled;
    }
    this.subscriptions.set(subscriptionId, subscription);
    return subscription;
  }

  async listSubscriptions(customerId: string): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(
      sub => sub.customerId === customerId
    );
  }
}

/**
 * Create a payment processor instance
 */
export function createPaymentProcessor(provider: PaymentProvider): PaymentProcessor {
  // In production, return actual Stripe or PayPal processor
  return new StubPaymentProcessor();
}

/**
 * Predefined subscription plans
 */
export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  FREE: {
    id: 'plan_free',
    name: 'Free',
    description: 'Basic features for hobbyists',
    amount: 0,
    currency: 'usd',
    interval: 'month',
    intervalCount: 1,
    features: [
      '3 projects',
      '10 tracks per project',
      'Basic mixing',
      'Community support',
    ],
  },
  PRO: {
    id: 'plan_pro',
    name: 'Pro',
    description: 'Professional features for serious musicians',
    amount: 1999,
    currency: 'usd',
    interval: 'month',
    intervalCount: 1,
    trialPeriodDays: 14,
    features: [
      'Unlimited projects',
      'Unlimited tracks',
      'Advanced AI mixing',
      'VST plugin support',
      'Priority support',
      'Collaboration tools',
    ],
  },
  STUDIO: {
    id: 'plan_studio',
    name: 'Studio',
    description: 'Enterprise features for studios',
    amount: 9999,
    currency: 'usd',
    interval: 'month',
    intervalCount: 1,
    trialPeriodDays: 30,
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Advanced analytics',
      'White-label options',
    ],
  },
};

export default {
  createPaymentProcessor,
  SUBSCRIPTION_PLANS,
  PaymentProvider,
  PaymentMethodType,
  PaymentStatus,
  SubscriptionStatus,
};
