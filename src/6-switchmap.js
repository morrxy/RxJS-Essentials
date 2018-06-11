import { interval } from 'rxjs'
import { take, map, switchMap, flatMap } from 'rxjs/operators'

let outer$ = interval(1000)
  .pipe(take(2))

let combined$ = outer$.pipe(
  switchMap(x => interval(400)
    .pipe(
      take(3),
      map(y => `switchMap: outer ${x}: inner ${y}`)
    )
  )
)

let combined4$ = outer$.pipe(
  map(x => interval(400)
    .pipe(
      take(3),
      map(y => `map: outer ${x}: inner ${y}`)
    )
  ),
  switchMap(x => {
    console.log(x)
    return x
  })
)

let combined2$ = outer$.pipe(
  flatMap(x => interval(400)
    .pipe(
      take(3),
      map(y => `flatMap: outer ${x}: inner ${y}`)
    )
  )
)

let combined3$ = outer$.pipe(
  map(x => interval(400)
    .pipe(
      take(3),
      map(y => `map: outer ${x}: inner ${y}`)
    )
  ),

  flatMap(x => {
    console.log('flatMap x:', x)
    return x
  })
)

combined4$.subscribe(val => console.log(val))
