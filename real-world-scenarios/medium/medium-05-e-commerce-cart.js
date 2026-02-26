/*
Problem: E-Commerce Shopping Cart
Difficulty: Medium
Category: Real World - E-Commerce

Build a shopping cart system with inventory management, discounts, and checkout.

Example 1:
  Input: cart.addItem('laptop', 2) → cart.getCart()
  Output: [{ productId: 'laptop', quantity: 2, price: 999, subtotal: 1998 }]

Example 2:
  Input: cart.applyDiscount('SAVE10') → cart.getTotal()
  Output: { subtotal: 1998, discount: 199.8, total: 1798.2 }

Requirements:
  - Add items to cart (check inventory availability)
  - Remove items from cart
  - Update item quantity
  - Apply percentage or fixed-amount discount codes
  - Calculate subtotal, discount, and total
  - Checkout: validate inventory, deduct stock, clear cart
  - Prevent adding more items than available in inventory
  - Handle invalid product IDs and discount codes

Time Complexity: O(n) for total calculation, O(1) for add/remove
Space Complexity: O(n) for cart items

Hints:
  - Separate inventory and cart data structures
  - Discount codes: { code: string, type: 'percentage' | 'fixed', value: number }
  - Validate stock on add AND on checkout (stock may change)
  - Use Map for cart items keyed by product ID
*/

export const functionName = 'createShoppingCart';

const inventory = [
  { id: 'laptop', name: 'Gaming Laptop', price: 999, stock: 5 },
  { id: 'mouse', name: 'Wireless Mouse', price: 29, stock: 50 },
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 149, stock: 20 },
  { id: 'monitor', name: '4K Monitor', price: 449, stock: 8 },
  { id: 'headset', name: 'Gaming Headset', price: 79, stock: 30 }
];

const discounts = [
  { code: 'SAVE10', type: 'percentage', value: 10 },
  { code: 'FLAT50', type: 'fixed', value: 50 }
];

export const tests = [
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'laptop', 1],
        ['addItem', 'mouse', 2],
        ['getCart']
      ]
    ],
    expected: [
      { productId: 'laptop', name: 'Gaming Laptop', quantity: 1, price: 999, subtotal: 999 },
      { productId: 'mouse', name: 'Wireless Mouse', quantity: 2, price: 29, subtotal: 58 }
    ]
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'laptop', 1],
        ['addItem', 'mouse', 2],
        ['getTotal']
      ]
    ],
    expected: { subtotal: 1057, discount: 0, total: 1057 }
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'laptop', 1],
        ['applyDiscount', 'SAVE10'],
        ['getTotal']
      ]
    ],
    expected: { subtotal: 999, discount: 99.9, total: 899.1 }
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'mouse', 3],
        ['applyDiscount', 'FLAT50'],
        ['getTotal']
      ]
    ],
    expected: { subtotal: 87, discount: 50, total: 37 }
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'laptop', 10]
      ]
    ],
    expected: { error: 'Insufficient stock' }
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'nonexistent', 1]
      ]
    ],
    expected: { error: 'Product not found' }
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'laptop', 2],
        ['updateQuantity', 'laptop', 1],
        ['getCart']
      ]
    ],
    expected: [
      { productId: 'laptop', name: 'Gaming Laptop', quantity: 1, price: 999, subtotal: 999 }
    ]
  },
  {
    input: [
      inventory, discounts,
      [
        ['addItem', 'mouse', 2],
        ['removeItem', 'mouse'],
        ['getCart']
      ]
    ],
    expected: []
  },
  {
    input: [
      inventory, discounts,
      [
        ['applyDiscount', 'INVALID']
      ]
    ],
    expected: { error: 'Invalid discount code' }
  }
];
