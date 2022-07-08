import Layout from "../components/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash, faTriangleExclamation,
  faPowerOff, faUserGroup, faClock,
  faUtensils, faPhone
} from '@fortawesome/free-solid-svg-icons';
import "../styles/app.scss";

config.autoAddCss = false;

library.add(faTrash, faTriangleExclamation, faPowerOff,
  faUserGroup, faClock, faUtensils, faPhone);

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
