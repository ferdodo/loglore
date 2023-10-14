import { replayEvents } from "loglore";

async function demoReplayEvents() {
	for await (const event of replayEvents()) {
		console.log(event);
	}
}

demoReplayEvents()
	.catch(console.error);
