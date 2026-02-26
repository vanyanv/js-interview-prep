/*
Problem: Trading Platform
Difficulty: Hard
Category: Real World - Financial Systems

Build a trading platform with order books, order matching, portfolio tracking, and P&L calculations.

Example 1:
  Input: platform.placeOrder({ userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 10 })
  Output: { orderId: 1, status: 'open', ... }

Example 2:
  Input: platform.getPortfolio('alice')
  Output: { holdings: { AAPL: { quantity: 10, avgCost: 150 } }, cash: 8500, totalValue: 10000 }

Requirements:
  - User accounts with cash balance
  - Place limit orders (buy/sell with price and quantity)
  - Order matching: buy orders match with sell orders when buy price >= sell price
  - Partial fills: orders can be partially matched
  - Order book: display open buy/sell orders per symbol sorted by price
  - Portfolio tracking: holdings, average cost basis, current value
  - Transaction history per user
  - Calculate profit/loss per position and overall
  - Cancel open orders
  - Validate: sufficient cash for buys, sufficient holdings for sells

Time Complexity: O(n log n) for order matching (sorted order book), O(1) for place/cancel
Space Complexity: O(o + t) where o=orders, t=transactions

Hints:
  - Order book per symbol: { bids: [...sorted desc by price], asks: [...sorted asc by price] }
  - Matching: top bid >= top ask triggers a trade at the ask price
  - Average cost basis: (prevQty * prevAvg + newQty * newPrice) / (prevQty + newQty)
  - P&L: (current_price - avg_cost) * quantity for unrealized
  - Use priority: price-time priority (best price first, then earliest order)
*/

export const functionName = 'createTradingPlatform';

export const tests = [
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['createAccount', 'bob', 10000],
        ['getPortfolio', 'alice']
      ]
    ],
    expected: { cash: 10000, holdings: {}, totalValue: 10000 }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['createAccount', 'bob', 10000],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 10 }],
        ['placeOrder', { userId: 'bob', symbol: 'AAPL', side: 'sell', price: 150, quantity: 10 }],
        ['getPortfolio', 'alice']
      ]
    ],
    expected: { cash: 8500, holdings: { AAPL: { quantity: 10, avgCost: 150 } }, totalValue: 10000 }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['createAccount', 'bob', 10000],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 10 }],
        ['placeOrder', { userId: 'bob', symbol: 'AAPL', side: 'sell', price: 145, quantity: 5 }],
        ['getPortfolio', 'alice']
      ]
    ],
    expected: { cash: 9275, holdings: { AAPL: { quantity: 5, avgCost: 145 } }, totalValue: 10000 }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 1000],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 100 }]
      ]
    ],
    expected: { error: 'Insufficient funds' }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'sell', price: 150, quantity: 10 }]
      ]
    ],
    expected: { error: 'Insufficient holdings' }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['createAccount', 'bob', 10000],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 10 }],
        ['getOrderBook', 'AAPL']
      ]
    ],
    expected: {
      bids: [{ price: 150, quantity: 10, userId: 'alice' }],
      asks: []
    }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['createAccount', 'bob', 10000],
        ['createAccount', 'charlie', 10000],
        ['placeOrder', { userId: 'bob', symbol: 'AAPL', side: 'sell', price: 150, quantity: 10 }],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 10 }],
        ['placeOrder', { userId: 'charlie', symbol: 'AAPL', side: 'sell', price: 160, quantity: 10 }],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 160, quantity: 10 }],
        ['getPnL', 'alice', { AAPL: 160 }]
      ]
    ],
    expected: { AAPL: { quantity: 20, avgCost: 155, currentPrice: 160, unrealizedPnL: 100 } }
  },
  {
    input: [
      [
        ['createAccount', 'alice', 10000],
        ['placeOrder', { userId: 'alice', symbol: 'AAPL', side: 'buy', price: 150, quantity: 10 }],
        ['cancelOrder', 1],
        ['getOrderBook', 'AAPL']
      ]
    ],
    expected: { bids: [], asks: [] }
  }
];
