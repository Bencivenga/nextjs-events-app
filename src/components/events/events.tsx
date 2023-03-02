import Link from "next/link";
import Image from "next/image";
import { EventCategory } from "@/src/types/event-category";

interface EventsProps {
	data: EventCategory[];
}

function Events({ data }: EventsProps) {
	return (
		<div className="events_page">
			{data.map(({ image, title, id }) => (
				<Link href={`/events/${id}`} key={id} className="card">
					<Image src={image} alt={title} width={200} height={200} />
					<h2>{title}</h2>
				</Link>
			))}
		</div>
	);
}

export default Events;
