import SingleEvent from "@/src/components/events/single-event";
import { Event } from "@/src/types/event";

export async function getStaticPaths() {
	const { allEvents } = await import("data/tmp/data.json");

	const paths = allEvents.map(({ id, city }) => {
		return {
			params: {
				cat: city,
				id,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

interface Context {
	params: {
		id: string;
	};
}

export async function getStaticProps(context: Context) {
	const { allEvents } = await import("data/tmp/data.json");
	const id = context?.params.id;
	const eventData = allEvents.find((ev) => ev.id === id);

	return {
		props: {
			data: eventData,
		},
	};
}

interface EventPageProps {
	data: Event;
}

function EventPage({ data }: EventPageProps) {
	return <SingleEvent data={data} />;
}

export default EventPage;
