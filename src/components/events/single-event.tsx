import Image from "next/image";
import { Event } from "@/src/types/event";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";

interface SingleEventProps {
	data: Event;
}

function SingleEvent({
	data: { image, title, description },
}: SingleEventProps) {
	const [emailValue, setEmailValue] = useState("");
	const [message, setMessage] = useState("");

	const router = useRouter();

	interface Data {
		email: string;
		eventId: string;
	}

	const onEmailValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;

		setEmailValue(target.value);
		if (target.value === "") {
			setMessage("");
		}
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const eventId = router?.query.id;

		const validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!emailValue.match(validRegex)) {
			setMessage("Please introduce a correct email address");
			return;
		}

		try {
			const response = await fetch("/api/email-registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: emailValue, eventId } as Data),
			});

			if (response.status === 409) {
				setMessage("This email has already been registered");
			} else if (response.status === 200) {
				setEmailValue("");
				setMessage("You have been successfully registered!");
			} else {
				throw new Error(`Error: ${response.status}`);
			}
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			}
		}
	};

	return (
		<div className="event_single_page">
			<h1>{title}</h1>
			<Image src={image} width={1000} height={500} alt={title} />
			<p>{description}</p>

			<form onSubmit={onSubmit} className="email_registration">
				<label htmlFor="event-email">Get registered for this event!</label>
				<input
					id="event-email"
					placeholder="Please insert your email"
					value={emailValue}
					onChange={onEmailValueChange}
					onBlur={() => setMessage("")}
				/>
				<button type="submit" disabled={!emailValue}>
					Submit
				</button>
			</form>
			<p>{message}</p>
		</div>
	);
}

export default SingleEvent;
