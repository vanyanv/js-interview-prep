/**
 * REFACTORING CHALLENGE — Write Your Clean Version Here
 *
 * Convert the callback-based processOrderCallback to use async/await.
 * Use the promisified helpers provided below.
 */

import { fetchOrder, validateOrder, chargeCustomer, sendConfirmation } from './messy';
import type { Order, OrderResult } from './messy';
import { promisify } from 'util';

// ─── Promisified Wrappers ─────────────────────────────────────────────────────
// util.promisify converts Node-style callbacks to Promises

const fetchOrderAsync = promisify(fetchOrder) as (orderId: string) => Promise<Order>;
const validateOrderAsync = promisify(validateOrder) as (order: Order) => Promise<boolean>;
const chargeCustomerAsync = promisify(chargeCustomer) as (
  customerId: string,
  amount: number
) => Promise<string>;
const sendConfirmationAsync = promisify(sendConfirmation) as (
  customerId: string,
  chargeId: string
) => Promise<void>;

// ─── Your Clean Implementation ────────────────────────────────────────────────

export async function processOrder(orderId: string): Promise<OrderResult> {
  const order = await fetchOrderAsync(orderId);

  const isValid = await validateOrderAsync(order);
  if (!isValid) {
    throw new Error('Order validation failed');
  }

  const chargeId = await chargeCustomerAsync(order.customerId, order.total);

  await sendConfirmationAsync(order.customerId, chargeId);

  return {
    orderId,
    chargeId,
    status: 'completed',
  };
}
