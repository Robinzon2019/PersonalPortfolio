import { Observable, catchError, map, of, startWith } from 'rxjs';

export type LoadState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'error' }
  | { readonly status: 'ready'; readonly data: T };

export const LOADING: LoadState<never> = { status: 'loading' };

export function toLoadState<T>(source$: Observable<T>): Observable<LoadState<T>> {
  return source$.pipe(
    map((data): LoadState<T> => ({ status: 'ready', data })),
    startWith<LoadState<T>>(LOADING),
    catchError(() => of<LoadState<T>>({ status: 'error' })),
  );
}
