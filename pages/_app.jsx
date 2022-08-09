import Layout from "../components/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash, faTriangleExclamation,
  faPowerOff, faClock, faCircleCheck,
  faUtensils, faPhone, faBell, faBellSlash,
  faScrewdriverWrench, faDatabase, faXmark, faShirt,
  faBookmark, faBars, faHome, faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import "../styles/app.scss";

config.autoAddCss = false;

library.add(faTrash, faTriangleExclamation, faPowerOff,
  faClock, faUtensils, faPhone, faBell, faCircleCheck,
  faBellSlash, faScrewdriverWrench, faDatabase, faXmark,
  faShirt, faBookmark, faBars, faHome, faAngleRight);

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
