import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import config from "../config/firebase";
import Cookies from 'js-cookie';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const app = initializeApp(config);
const auth = getAuth(app);

const Sidebar = ({ show, toggleMenu }) => {
    const router = useRouter();

    const logout = () => {
        Cookies.remove('fb_admin_uid');
        auth.signOut();
        router.replace('/');
    }

    const closeMenu = () => {
        toggleMenu(!show);
    }

    return (
        <aside>
            <div className={`bg-black h-screen w-screen fixed transition-all 
            ease-in-out top-0 right-0 z-10 opacity-30 block
            ${show ? '' : 'hidden'}`} onClick={closeMenu} />
            <div className={`top-0 left-0 bg-light py-10 md:py-12 fixed h-full 
            z-50 block transition-all ease-in-out rounded-r-3xl shadow-2xl 
            ${show ? 'w-80 md:w-96 px-8 md:px-12' : 'px-0 w-0 md:w-0'}`}>
                <div className={`${show ? 'block' : 'hidden'}`}>
                    <div className={`bg-gray-700 w-10 h-10 flex text-gray-700 
                cursor-pointer justify-center items-center rounded-xl 
                hover:opacity-75 box_shadow`} onClick={closeMenu}>
                        <FontAwesomeIcon icon={`fa-solid fa-xmark`}
                            className={`alert_icon text-white-all`} />
                    </div>
                    <ul className={`mt-12`}>
                        <li className={`pb-2.5 mb-2.5`}>
                            <Link href={'/dashboard'}>
                                <a className={`flex items-center gap-5 transition-all 
                            ease-in-out`}>
                                    <div className="bg-cyan-500 box_shadow
                                text-cyan-500 transition-all ease-in-out 
                                hover:opacity-75 w-10 h-10 flex items-center 
                                justify-center rounded-xl">
                                        <FontAwesomeIcon icon={`fa-solid fa-home`}
                                            className={`alert_icon text-white-all`} />
                                    </div>
                                    <span className={`font-semibold opacity-75`}>
                                        Dashboard
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className={`pb-2.5 mb-2.5`}>
                            <Link href={'/#'}>
                                <a className={`flex items-center gap-5 transition-all 
                            ease-in-out`}>
                                    <div className="bg-fuchsia-500 box_shadow
                                text-fuchsia-500 transition-all ease-in-out 
                                hover:opacity-75 w-10 h-10 flex items-center 
                                justify-center rounded-xl">
                                        <FontAwesomeIcon icon={`fa-solid fa-bookmark`}
                                            className={`alert_icon text-white-all`} />
                                    </div>
                                    <span className={`font-semibold opacity-75`}>
                                        Categoriëen
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className={`pb-2.5 mb-2.5`}>
                            <Link href={'/items'}>
                                <a className={`flex items-center gap-5 transition-all 
                            ease-in-out`}>
                                    <div className="bg-theme box_shadow
                                text-theme transition-all ease-in-out hover:opacity-75
                                w-10 h-10 flex items-center justify-center rounded-xl">
                                        <FontAwesomeIcon icon={`fa-solid fa-shirt`}
                                            className={`alert_icon text-white-all`} />
                                    </div>
                                    <span className={`font-semibold opacity-75`}>
                                        Items
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className={`pb-2.5 mb-2.5`}>
                            <Link href={'/#'}>
                                <a className={`flex items-center gap-5 transition-all 
                            ease-in-out`}>
                                    <div className="bg-emerald-500 box_shadow
                                text-emerald-500 transition-all ease-in-out 
                                hover:opacity-75 w-10 h-10 flex items-center 
                                justify-center rounded-xl">
                                        <FontAwesomeIcon icon={`fa-solid fa-screwdriver-wrench`}
                                            className={`alert_icon text-white-all`} />
                                    </div>
                                    <span className={`font-semibold opacity-75`}>
                                        Instellingen
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className="list_item">
                            <button onClick={logout} className={`bg-transparent p-0 
                        flex items-center gap-5 transition-all ease-in-out mt-0`}>
                                <div className="bg-red w-10 h-10 flex items-center 
                            justify-center rounded-xl text-red transition-all 
                            ease-in-out hover:opacity-75 box_shadow">
                                    <FontAwesomeIcon icon={`fa-solid fa-power-off`}
                                        className={`alert_icon text-white-all`} />
                                </div>
                                <span className={`text-dark font-semibold opacity-75`}>
                                    Afmelden
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar