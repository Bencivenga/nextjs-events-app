import { PropsWithChildren } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}

export default Layout;
