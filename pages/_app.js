import "../styles/globals.css";
import { AppProps } from "next/app";

// Using TypeScript style type annotations with JSDoc for JavaScript support
/**
 * @param {Object} props
 * @param {import('next/app').AppProps["Component"]} props.Component
 * @param {import('next/app').AppProps["pageProps"]} props.pageProps
 */
function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
