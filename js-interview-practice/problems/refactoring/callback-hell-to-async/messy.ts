/**
 * REFACTORING CHALLENGE — Callback Hell → Async/Await
 *
 * Study the messy callback-based implementation.
 * Then rewrite it using async/await in refactored.ts.
 *
 * Do NOT modify this file or the test file.
 */

export interface Order {
  id: string;
  customerId: string;
  total: number;
  items: { productId: string; quantity: number }[];
}

export interface OrderResult {
  orderId: string;
  chargeId: string;
  status: 'completed';
}

type Cb<T> = (err: Error | null, result?: T) => void;

// Simulated async operations using Node-style callbacks
export function fetchOrder(orderId: string, cb: Cb<Order>): void {
  setTimeout(() => {
    if (orderId === 'bad-order') {
      cb(new Error(`Order ${orderId} not found`));
    } else {
      cb(null, {
        id: orderId,
        customerId: 'cust-123',
        total: 99.99,
        items: [{ productId: 'prod-1', quantity: 2 }],
      });
    }
  }, 0);
}

export function validateOrder(order: Order, cb: Cb<boolean>): void {
  setTimeout(() => {
    if (order.total <= 0) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  }, 0);
}

export function chargeCustomer(customerId: string, amount: number, cb: Cb<string>): void {
  setTimeout(() => {
    if (customerId === 'bad-customer') {
      cb(new Error('Payment failed'));
    } else {
      cb(null, `charge-${customerId}-${amount}`);
    }
  }, 0);
}

export function sendConfirmation(customerId: string, chargeId: string, cb: Cb<void>): void {
  setTimeout(() => {
    if (chargeId.includes('fail')) {
      cb(new Error('Email failed'));
    } else {
      cb(null);
    }
  }, 0);
}

// ─── MESSY IMPLEMENTATION ────────────────────────────────────────────────────

type OrderCb = (err: Error | null, result?: OrderResult) => void;

export function processOrderCallback(orderId: string, callback: OrderCb): void {
  fetchOrder(orderId, (err, order) => {
    if (err) {
      callback(err);
      return;
    }

    validateOrder(order!, (err, isValid) => {
      if (err) {
        callback(err);
        return;
      }

      if (!isValid) {
        callback(new Error('Order validation failed'));
        return;
      }

      chargeCustomer(order!.customerId, order!.total, (err, chargeId) => {
        if (err) {
          callback(err);
          return;
        }

        sendConfirmation(order!.customerId, chargeId!, (err) => {
          if (err) {
            callback(err);
            return;
          }

          callback(null, {
            orderId,
            chargeId: chargeId!,
            status: 'completed',
          });
        });
      });
    });
  });
}
