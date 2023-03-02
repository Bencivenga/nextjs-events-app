import CatEvent from "@/src/components/events/cat-event";
import { Event } from "@/src/types/event";
import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
	const { events_categories } = await import("data/tmp/data.json");
	const allPaths = events_categories.map(({ id }) => {
		return {
			params: {
				cat: id.toString(),
			},
		};
	});

	return {
		paths: allPaths,
		fallback: false,
	};
}

interface Context {
	params: {
		cat: string;
	};
}

export async function getStaticProps(context: Context) {
	const { allEvents } = await import("data/tmp/data.json");
	const id = context?.params.cat;
	const data = allEvents.filter((ev) => ev.city === id);

	return {
		props: {
			data,
			pageName: id,
		},
	};
}

interface EventCatPageProps {
	data: Event[];
	pageName: string;
}

function EventCatPage({ data, pageName }: EventCatPageProps) {
	return <CatEvent data={data} pageName={pageName} />;
}

export default EventCatPage;
