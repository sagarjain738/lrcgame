import { theme } from "@/Chakra/theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import TruckContextProvider from "@/context/truckContext";
import GlobalContextProvider from "@/context/globalContext";

import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <TruckContextProvider>
          <ChakraProvider theme={theme}>
            <ToastContainer />
            <Component {...pageProps} />
          </ChakraProvider>
        </TruckContextProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}
