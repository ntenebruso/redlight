import Layout from "../components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/global.css";
import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/800.css";
import "@fontsource/rubik/900.css";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        router.beforePopState((state) => {
            state.options.scroll = false;
            return true;
        });
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
