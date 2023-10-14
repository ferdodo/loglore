import { saveEvent } from "loglore";

interface UserRegisteredEvent {
	type: "user-registered";
	timestamp: number;
	userId: string;
	name: string;
	email: string;
}

saveEvent<UserRegisteredEvent>({
	type: "user-registered",
	timestamp: Date.now(),
	userId: "12345",
	name: "John Doe",
	email: "johndoe@example.com"
}).catch(console.error);
