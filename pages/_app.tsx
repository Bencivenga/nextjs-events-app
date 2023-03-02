import Layout from "@/src/components/layout/layout";
import "@/styles/globals.css";
import "@/styles/general.sass";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
