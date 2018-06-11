import { Observable } from 'rxjs'

function getObservableBeer () {
  return Observable.create(observer => { // 1
    const beers = [
      {name: 'Stella', country: 'Belgium', price: 9.50},
      {name: 'Sam Adams', country: 'USA', price: 8.50},
      {name: 'Bud Light', country: 'USA', price: 6.50},
      {name: 'Brooklyn Lager', country: 'USA', price: 8.00},
      {name: 'Sapporo', country: 'Japan', price: 7.50}
    ]

    beers.forEach(beer => observer.next(beer)) // 2

    observer.complete() // 3
  }
  )
}

getObservableBeer()
  .subscribe( // 4
    beer => console.log('Subscriber got ' + beer.name),
    error => console.err(error),
    () => console.log('The stream is over')
  )
