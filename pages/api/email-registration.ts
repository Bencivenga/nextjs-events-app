import path from "path";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@/src/types/event";
import { EventCategory } from "@/src/types/event-category";

interface ExtractData {
	events_categories: EventCategory[];
	allEvents: Event[];
}

function extractData(filePath: string) {
	const jsonData = fs.readFileSync(filePath);
	const data = JSON.parse(jsonData.toString()) as ExtractData;
	return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<{message: string}>) {
	const { method } = req;
	const filePath = path.join("/tmp", "data.json");
	const { events_categories, allEvents } = extractData(filePath);

	if (!allEvents) {
		return res.status(404).json({ message: "Events data not found" });
	}

	interface ReqBody {
		email: string;
		eventId: string;
	}

	if (method === "POST") {
		const { email, eventId } = req.body as ReqBody;

		if (!email || !email.includes("@")) {
			res.status(422).json({ message: "Invalid email address" });
			return;
		}

		const newAllEvents = allEvents.slice().map((event) => {
			if (event.id === eventId) {
				if (event.emails_registered.includes(email)) {
					res
						.status(409)
						.json({ message: "This email has already been registered." });

					return event;
				}

				return {
					...event,
					emails_registered: [...event.emails_registered, email],
				};
			}

			return event;
		});

		fs.writeFileSync(
			filePath,
			JSON.stringify({ events_categories, allEvents: newAllEvents })
		);

		res.status(200).json({
			message: `You have been successfully registered with the email: b	${email} fore the event ${eventId}`,
		});
	}
}
