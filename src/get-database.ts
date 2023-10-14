const waitDatabase: Promise<IDBDatabase> = openDatabase("loglore");

export function getDatabase(): Promise<IDBDatabase> {
	return waitDatabase;
}

function openDatabase(name: string): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(name);

		request.onsuccess = function(event: Event) {
			resolve((event.target as IDBOpenDBRequest).result);
		};

		request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains("events")) {
				db.createObjectStore("events", { autoIncrement: true });
			}
		};

		request.onblocked = function() {
			reject(new Error("Failed to open database !"));
		};

		request.onerror = function(event: Event) {
			reject((event.target as IDBOpenDBRequest).error);
		};
	});
}
