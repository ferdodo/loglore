import { getDatabase } from "./get-database";

export async function clearDatabase() {
	const db = await getDatabase();
	const transaction = db.transaction(["events"], "readwrite");
	const store = transaction.objectStore("events");
	store.clear();
}
