import { Subject } from "rxjs";

const _events$: Subject<any> = new Subject();

export function broadcastEvent<T>(event: T) {
	_events$.next(event);
}

/**
 * Events observable.
 *
 * @includeExample ./src/events.example.ts
 */
export const events$ = _events$.asObservable();
