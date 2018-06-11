import { Subject } from 'rxjs'

const Action = {
  Buy: 'BUY',
  Sell: 'SELL'
}

class Order {
  constructor (orderId, traderId, stock, shares, action) {
    this.orderId = orderId
    this.traderId = traderId
    this.stock = stock
    this.shares = shares
    this.action = action
  }
}

const orders = new Subject()

class Trader {
  constructor (traderId, traderName) {
    this.traderId = traderId
    this.traderName = traderName
  }

  placeOrder (order) {
    orders.next(order)
  }
}

const stockExchange = orders.subscribe(
  order => console.log(`Sending to stock exchange the order to ${order.action} ${order.shares} shares of ${order.stock}`)
)

const tradeCommission = orders.subscribe(
  order => console.log(`Reporting to trade commission the order to ${order.action} ${order.shares} shares of ${order.stock}`)
)

const trader = new Trader(1, 'Joe')
const order1 = new Order(1, 1, 'IBM', 100, Action.Buy)
const order2 = new Order(2, 1, 'AAPL', 100, Action.Sell)

trader.placeOrder(order1)
trader.placeOrder(order2)
