import { Subject } from 'rxjs'

const mySubject = new Subject()

mySubject.subscribe(val => console.log('subscription1', val))

const sub2 = mySubject.subscribe(val => console.log('subscription2', val))

mySubject.next(123)

sub2.unsubscribe()

mySubject.next(567)
