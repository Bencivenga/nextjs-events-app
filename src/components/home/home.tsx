import Link from "next/link";
import Image from "next/image";
import React from "react";
import { EventCategory } from "@/src/types/event-category";

interface HomeProps {
	data: EventCategory[];
}

function Home({ data }: HomeProps) {
	return (
		<div className="home_body">
			{data.map(({ id, title, description, image }) => (
				<Link className="card" href={`/events/${id}`} key={id} passHref>
					<div className="image">
						<Image src={image} alt={title} width={500} height={500} />
					</div>
					<div className="content">
						<h2>{title}</h2>
						<p>{description}</p>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Home;
