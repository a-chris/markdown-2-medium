import "bulma/css/bulma.css";
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
