import { test } from "@playwright/test";
import { readFileSync } from "fs";
import assert from "assert/strict";

test("should remove all events from the store", async function testDestroyStore({ page }) {
	const lib = readFileSync("dist/loglore.browser.js", "utf-8");
	await page.goto("https://example.org");
	await page.addScriptTag({ type: "module", content: lib });

	const results = await page.evaluate(async function initEventStoreFromPage() {
		// @ts-ignore
		const { saveEvent, replayEvents } = window.loglore;
		const ping = { ping: "Ping !" };
		const pong = { pong: "Pong !" };
		await saveEvent(ping);
		await saveEvent(pong);
		await saveEvent(ping);
		await saveEvent(pong);
		await saveEvent(ping);
		const previousEvents = [];

		for await (const event of replayEvents()) {
			previousEvents.push(event);
		}

		return previousEvents;
	});

	assert(results.length === 5);

	const resultsAfterDestroy = await page.evaluate(async function initEventStoreFromPage() {
		// @ts-ignore
		const { saveEvent, replayEvents, clearDatabase } = window.loglore;
		const previousEvents = [];
		const ping = { ping: "Ping !" };
		const pong = { pong: "Pong !" };
		await saveEvent(ping);
		await saveEvent(pong);
		await saveEvent(ping);
		await saveEvent(pong);
		await saveEvent(ping);
		await clearDatabase();

		for await (const event of replayEvents()) {
			previousEvents.push(event);
		}

		return previousEvents;
	});

	assert(resultsAfterDestroy.length === 0);
});
