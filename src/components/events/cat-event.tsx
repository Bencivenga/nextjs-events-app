import Link from "next/link";
import Image from "next/image";
import { Event } from "@/src/types/event";

interface CatEventProps {
	data: Event[];
	pageName: string;
}

function CatEvent({ data, pageName }: CatEventProps) {
	return (
		<div className="cat_events">
			<h1>Events in {pageName}</h1>
			<div className="content">
				{data.map(({ city, id, image, title, description }) => (
					<Link key={id} href={`/events/${city}/${id}`} className="card">
						<Image src={image} alt={title} width={200} height={200} />
						<h2>{title}</h2>
						<p>{description}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default CatEvent;
