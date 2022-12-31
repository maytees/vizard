import '../styles/globals.css'
import {ChakraProvider} from "@chakra-ui/react";

import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

import {store} from '../config/store'
import {Provider} from "react-redux";

export default function App({Component, pageProps}: AppProps) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => setIsLoading(false), 800);
    }, []);

    return (
        <Provider store={store}>
            <ChakraProvider>
                <Navbar/>
                {!isLoading ? (
                    <Component {...pageProps} />
                ) : (
                    <Loading/>
                )}
            </ChakraProvider>
        </Provider>
    )
}
