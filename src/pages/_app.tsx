import "../styles/global.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;