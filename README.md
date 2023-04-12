---
sidebar_label: Node
pagination_next: null
pagination_prev: null
---

# Node SDK

The official Node SDK for the Checkout and ePayment APIs.

https://www.npmjs.com/package/@vippsno/vipps-sdk

## Features

- Serialization/deserialization
- Authentication
- Network retries
- Idempotency

## Usage

We recommend inspecting the types for a detailed description of class constructor- and method arguments. The API guidelines for [Checkout](https://vippsas.github.io/vipps-developer-docs/docs/APIs/checkout-api) and [ePayment](https://vippsas.github.io/vipps-developer-docs/docs/APIs/epayment-api) should also be used as reference, e.g. when in doubt about the meaning of property or its allowed values.

Example showing configuration and calling a method which creates a Checkout session:

```typescript
import Vipps from '@vippsno/vipps-node'

const vipps = new Vipps({
    pluginName: 'My plugin name',
    pluginVersion: '1.0.0',
    clientId: 'client-id-from-vipps-portal',
    clientSecret: 'client-secret-form-vipps-portal',
    subscriptionKey: 'subscription-key-from-vipps-portal',
    merchantSerialNumber: 'merchant-serial-number-from-vipps-portal',
});

const vippsCheckoutSession = await vipps.checkout.createSession({
    merchantInfo: {
        callbackUrl: 'https://exmaple.com/vipps/payment-callback',
        returnUrl: 'https://example.com/vipps',
        callbackAuthorizationToken: 'secret-token-to-verify-callback',
    },
    transaction: {
        amount: {
            currency: 'NOK',
            value: 1000
        },
        reference: 'order-id-123',
    },
    logistics: {
        dynamicOptionsCallback: 'https://exmaple.com/vipps/payment-callback',
        fixedOptions: [
            {
                brand: 'POSTEN',
                amount: {
                    currency: 'NOK',
                    value: 100
                },
                id: 'shipping-option-1',
                description: 'Pakke levert på døren'
            }
        ]
    }
});
```

The SDK exposes the same operations as for the underlying Checkout and ePayment APIs respective.

Checkout exposes the following methods:

- `createSession`
- `getSession`

ePayment exposes the following methods:

- `createPayment`
- `getPayment`
- `getPaymentEventLog`
- `cancelPayment`
- `capturePayment`
- `refundPayment`
- `forceApprovePayment`

## Error handling

All methods have built-in retry mechanisms, however, there is no guarantee that the call will succeed. Errors might arise for various reasons, including network failure, misconfiguration or temporarily unavailable services. It is recommended to handle potential errors thrown by the SDK
