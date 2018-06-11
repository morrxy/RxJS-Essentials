import { from, Observable } from 'rxjs'
import { flatMap } from 'rxjs/operators'

function getDrinks () {
  const beers = from([
    {name: 'Stella', country: 'Belgium', price: 9.50},
    {name: 'Sam Adams', country: 'USA', price: 8.50},
    {name: 'Bud Light', country: 'USA', price: 6.50}
  ])

  const softDrinks = from([
    {name: 'Coca Cola', country: 'USA', price: 1.50},
    {name: 'Fanta', country: 'USA', price: 1.50},
    {name: 'Lemonade', country: 'France', price: 2.50}
  ])

  return Observable.create(observer => {
    observer.next(beers)
    observer.next(softDrinks)
    observer.complete()
  })
}

getDrinks()
  .pipe(
    flatMap(drinks => {
      console.log('deubg: ', drinks)
      return drinks
    })
  )
  .subscribe(
    drink => console.log('Subscriber got ' + drink.name + ': ' + drink.price),
    error => console.err(error),
    () => console.log('The stream of drinks is over')
  )
