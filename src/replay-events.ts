import { getDatabase } from "./get-database";

/**
 * Iterate over previous events.
 *
 * @includeExample ./src/replay-events.example.ts
 */
export async function* replayEvents<T>(): AsyncGenerator<T> {
	const db: IDBDatabase = await getDatabase();
	const transaction = db.transaction("events", "readonly");
	const eventsStore = transaction.objectStore("events");
	const cursorRequest = eventsStore.openCursor();

	let cursorCompletion = new Promise<IDBCursorWithValue | null>(resolve => {
		cursorRequest.onsuccess = (event: Event) => {
			const cursor: IDBCursorWithValue = (event.target as IDBRequest).result;
			resolve(cursor);
		};
	});

	while (true) {
		const cursor = await cursorCompletion;
		if (cursor) {
			yield cursor.value as T;
			cursor.continue();

			cursorCompletion = new Promise<IDBCursorWithValue | null>(resolve => {
				cursorRequest.onsuccess = (event: Event) => {
					const cursor: IDBCursorWithValue = (event.target as IDBRequest).result;
					resolve(cursor);
				};
			});
		} else {
			return;
		}
	}
}
