import { test } from "@playwright/test";
import { readFileSync } from "fs";
import assert from "assert/strict";

interface TestEvent {
	ping: string;
	pong: string;
}

test("saves event that can be read later", async function testInitEventStore({ page }) {
	const lib = readFileSync("dist/loglore.browser.js", "utf-8");
	page.on("console", message => console.log(`[PAGE LOG]: ${message.text()}`));

	page.on(
		"pageerror",
		error => console.error(`[PAGE ERROR]: ${error.message}`)
	);

	await page.goto("https://example.org");
	await page.addScriptTag({ type: "module", content: lib });

	const results = await page.evaluate(async function initEventStoreFromPage() {
		// @ts-ignore
		const { saveEvent, replayEvents } = window.loglore;

		const ping = { ping: "Ping !" };
		const pong = { pong: "Pong !" };

		await saveEvent<TestEvent>(ping);
		await saveEvent<TestEvent>(pong);
		await saveEvent<TestEvent>(ping);
		await saveEvent<TestEvent>(pong);
		await saveEvent<TestEvent>(ping);

		const events = [];

		for await (const event of replayEvents()) {
			events.push(event);
		}

		return events;
	});

	assert(results.pop()?.ping === "Ping !");
	assert(results.pop()?.pong === "Pong !");
	assert(results.pop()?.ping === "Ping !");
	assert(results.pop()?.pong === "Pong !");
	assert(results.pop()?.ping === "Ping !");
});
