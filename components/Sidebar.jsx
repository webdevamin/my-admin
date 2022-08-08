import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import config from "../config/firebase";
import Cookies from 'js-cookie';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const app = initializeApp(config);
const auth = getAuth(app);

const Sidebar = () => {
    const router = useRouter();

    const [showSidebar, setShowSidebar] = useState(false);

    const logout = () => {
        Cookies.remove('fb_admin_uid');
        auth.signOut();
        router.replace('/');
    }

    return (
        <aside className="aside">
            <div className="overlay" />
            <div className="sidebar">
                <div className="close">
                    <FontAwesomeIcon icon={`fa-solid fa-xmark`}
                        className={`alert_icon`} />
                </div>
                <ul className="sidebar_list">
                    {/* <li className="list_item">
                        <Link href={'/categories'}>
                            <a>
                                <div className="list_item_icon bg-theme text-theme">
                                    <FontAwesomeIcon icon={`fa-solid fa-bookmark`}
                                        className={`alert_icon`} />
                                </div>
                                <span>Categoriëen</span>
                            </a>
                        </Link>
                    </li> */}
                    <li className="list_item">
                        <Link href={'/items'}>
                            <a>
                                <div className="list_item_icon bg-theme
                                text-theme">
                                    <FontAwesomeIcon icon={`fa-solid fa-shirt`}
                                        className={`alert_icon`} />
                                </div>
                                <span>Items</span>
                            </a>
                        </Link>
                    </li>
                    <li className="list_item">
                        <button onClick={logout}>
                            <div className="list_item_icon bg-red
                                text-red">
                                <FontAwesomeIcon icon={`fa-solid fa-power-off`}
                                    className={`alert_icon`} />
                            </div>
                            <span>Afmelden</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar