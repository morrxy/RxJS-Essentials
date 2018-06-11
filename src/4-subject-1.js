import { Subject } from 'rxjs'

const mySubject = new Subject()

mySubject.subscribe(val => console.log('subscription1', val))
mySubject.subscribe(val => console.log('subscription2', val))

mySubject.next(123)
