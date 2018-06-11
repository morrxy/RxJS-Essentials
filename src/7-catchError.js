import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

function getData () {
  var beers = [
    {name: 'Sam Adams', country: 'USA', price: 8.50},
    {name: 'Bud Light', country: 'USA', price: 6.50},
    {name: 'Brooklyn Lager', country: 'USA', price: 8.00},
    {name: 'Sapporo', country: 'Japan', price: 7.50}
  ]

  return Observable.create(observer => {
    let counter = 0
    beers.forEach(beer => {
      observer.next(beer)
      counter++

      if (counter > Math.random() * 5) {
        observer.error({
          status: 500,
          description: 'Beer stream error'
        })
      }
    })

    observer.complete()
  })
}

// Subscribing to data from the primary source
getData()
  .pipe(
    catchError(err => {
      console.error('Got ' + err.status + ': ' + err.description)
      if (err.status === 500) {
        console.error('>>> Retrieving cached data')
        return getCachedData()
      } else {
        return Observable.empty()
      }
    }),
    map(beer => beer.name + ', ' + beer.country)
  )
  .subscribe(
    beer => console.log('Subscriber got ' + beer),
    err => console.error(err),
    () => console.log('The stream is over')
  )

function getCachedData () {
  var beers = [
    {name: 'Leffe Blonde', country: 'Belgium', price: 9.50},
    {name: 'Miller Lite', country: 'USA', price: 8.50},
    {name: 'Corona', country: 'Mexico', price: 8.00},
    {name: 'Asahi', country: 'Japan', price: 7.50}
  ]

  return Observable.create(observer => {
    beers.forEach(beer => {
      observer.next(beer)
    })

    observer.complete()
  })
}
