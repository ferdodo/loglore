import { events$ } from "./events";
import { saveEvent } from "./save-event";
import { replayEvents } from "./replay-events";
import { clearDatabase } from "./clear-database";

// @ts-ignore
if (typeof BROWSER_TARGET !== "undefined" && BROWSER_TARGET) {
	// @ts-ignore
	globalThis.loglore = {
		saveEvent,
		replayEvents,
		events$,
		clearDatabase
	};
}

export { clearDatabase } from "./clear-database";
export { events$ } from "./events";
export { replayEvents } from "./replay-events";
export { saveEvent } from "./save-event";
