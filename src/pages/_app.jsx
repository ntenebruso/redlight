import Layout from "../components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

import "../styles/global.css";
import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/public-sans/800.css";
import "@fontsource/public-sans/900.css";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // useEffect(() => {
    //     router.beforePopState((state) => {
    //         state.options.scroll = false;
    //         return true;
    //     });
    // }, []);

    return (
        <SessionProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;
