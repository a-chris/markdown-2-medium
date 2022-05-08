import "bulma/css/bulma.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/custom.scss";
import "../styles/globals.css";
import "../styles/utilities.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        hideProgressBar
        closeOnClick
        pauseOnHover
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        rtl={false}
        draggable={false}
        pauseOnFocusLoss={false}
      />
      <Script
        defer
        data-domain="markdown-2-medium.vercel.app"
        src="https://faenz.onrender.com/faenz.js"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
