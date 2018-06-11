import { Subject } from 'rxjs'
import { flatMap } from 'rxjs/operators'

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

class Trader {
  constructor (traderId, traderName) {
    this.traderId = traderId
    this.traderName = traderName
    this.orders = new Subject()
  }
}

const traders = new Subject()

traders.subscribe(trader => console.log(`Trader ${trader.traderName} arrived`))

traders
  .pipe(
    flatMap(trader => trader.orders)
  )
  .subscribe(order =>
    console.log(`Got order from trader ${order.traderId} to ${order.action} ${order.shares} shares of ${order.stock}`)
  )

const firstTrader = new Trader(1, 'Joe')
const secondTrader = new Trader(2, 'Mary')

traders.next(firstTrader)
traders.next(secondTrader)

const order1 = new Order(1, 1, 'IBM', 100, Action.Buy)
const order2 = new Order(2, 1, 'AAPL', 200, Action.Sell)
const order3 = new Order(3, 2, 'MSFT', 500, Action.Buy)

// Traders place orders
firstTrader.orders.next(order1)
firstTrader.orders.next(order2)
secondTrader.orders.next(order3)
