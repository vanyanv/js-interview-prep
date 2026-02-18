import { describe, it, expect, vi } from 'vitest';
import { processOrder } from './refactored';

// Mock the underlying functions to control behavior in tests
vi.mock('./messy', () => {
  return {
    fetchOrder: vi.fn((orderId: string, cb: (err: Error | null, result?: unknown) => void) => {
      if (orderId === 'bad-order') {
        cb(new Error(`Order ${orderId} not found`));
      } else {
        cb(null, { id: orderId, customerId: 'cust-123', total: 99.99, items: [] });
      }
    }),
    validateOrder: vi.fn((_order: unknown, cb: (err: Error | null, result?: boolean) => void) => {
      cb(null, true);
    }),
    chargeCustomer: vi.fn(
      (customerId: string, amount: number, cb: (err: Error | null, result?: string) => void) => {
        if (customerId === 'bad-customer') {
          cb(new Error('Payment failed'));
        } else {
          cb(null, `charge-${customerId}-${amount}`);
        }
      }
    ),
    sendConfirmation: vi.fn(
      (_customerId: string, _chargeId: string, cb: (err: Error | null) => void) => {
        cb(null);
      }
    ),
  };
});

describe('processOrder (refactored from callback hell)', () => {
  it('resolves with OrderResult for a valid order', async () => {
    const result = await processOrder('order-1');

    expect(result.orderId).toBe('order-1');
    expect(result.status).toBe('completed');
    expect(result.chargeId).toBeDefined();
    expect(typeof result.chargeId).toBe('string');
  });

  it('returns a Promise (not a callback)', () => {
    const result = processOrder('order-1');
    expect(result).toBeInstanceOf(Promise);
  });

  it('rejects when order is not found', async () => {
    await expect(processOrder('bad-order')).rejects.toThrow('not found');
  });

  it('rejects when validation fails', async () => {
    const { validateOrder } = await import('./messy');
    vi.mocked(validateOrder).mockImplementationOnce(
      (_order: unknown, cb: (err: Error | null, result?: boolean) => void) => {
        cb(null, false);
      }
    );

    await expect(processOrder('order-1')).rejects.toThrow('validation failed');
  });

  it('rejects when charge fails', async () => {
    const { chargeCustomer } = await import('./messy');
    vi.mocked(chargeCustomer).mockImplementationOnce(
      (_cid: string, _amt: number, cb: (err: Error | null, result?: string) => void) => {
        cb(new Error('Payment declined'));
      }
    );

    await expect(processOrder('order-1')).rejects.toThrow('Payment declined');
  });

  it('rejects when confirmation email fails', async () => {
    const { sendConfirmation } = await import('./messy');
    vi.mocked(sendConfirmation).mockImplementationOnce(
      (_cid: string, _chargeId: string, cb: (err: Error | null) => void) => {
        cb(new Error('SMTP error'));
      }
    );

    await expect(processOrder('order-1')).rejects.toThrow('SMTP error');
  });

  it('operations occur in correct order', async () => {
    const { fetchOrder, validateOrder, chargeCustomer, sendConfirmation } = await import('./messy');
    const callOrder: string[] = [];

    vi.mocked(fetchOrder).mockImplementationOnce(
      (orderId: string, cb: (err: Error | null, result?: unknown) => void) => {
        callOrder.push('fetch');
        cb(null, { id: orderId, customerId: 'cust-1', total: 10, items: [] });
      }
    );
    vi.mocked(validateOrder).mockImplementationOnce(
      (_order: unknown, cb: (err: Error | null, result?: boolean) => void) => {
        callOrder.push('validate');
        cb(null, true);
      }
    );
    vi.mocked(chargeCustomer).mockImplementationOnce(
      (cid: string, amt: number, cb: (err: Error | null, result?: string) => void) => {
        callOrder.push('charge');
        cb(null, `charge-${cid}-${amt}`);
      }
    );
    vi.mocked(sendConfirmation).mockImplementationOnce(
      (_cid: string, _chargeId: string, cb: (err: Error | null) => void) => {
        callOrder.push('confirm');
        cb(null);
      }
    );

    await processOrder('order-1');
    expect(callOrder).toEqual(['fetch', 'validate', 'charge', 'confirm']);
  });
});
