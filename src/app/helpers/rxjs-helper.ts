import { BehaviorSubject, Observable } from 'rxjs';
import { skip, take, takeUntil } from 'rxjs/operators';

export function closeWhen<T, U>(subject: BehaviorSubject<U>): ((x: Observable<T>) => Observable<T>) {
  if (subject) { return takeUntil(subject.pipe(skip(1))); }
  return (x: Observable<T>) => x;
}

export function one<T>(): ((x: Observable<T>) => Observable<T>) {
  return take(1);
}
