import { getDatabase } from "./get-database";
import { broadcastEvent } from "./events";

/**
 * Save an event.
 *
 * @includeExample ./src/save-event.example.ts
 */
export async function saveEvent<T>(event: T): Promise<void> {
	const db: IDBDatabase = await getDatabase();

	return new Promise<void>((resolve, reject) => {
		const transaction = db.transaction(["events"], "readwrite");
		const store = transaction.objectStore("events");
		const request = store.add(event);

		request.onerror = function(e) {
			console.debug(e);
			reject(new Error("Failed to save event !"));
		};

		request.onsuccess = function() {
			broadcastEvent(event);
			resolve();
		};
	});
}
