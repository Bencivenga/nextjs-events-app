import Events from '@/src/components/events/events';
import { EventCategory } from "@/src/types/event-category";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
	const { events_categories } = await import("data/tmp/data.json");

	return {
		props: {
			data: events_categories,
		},
	};
}

interface EventsPageProps {
	data: EventCategory[];
}

function EventsPage({ data }: EventsPageProps) {
	return 	<Events data={data} />;
}

export default EventsPage;
