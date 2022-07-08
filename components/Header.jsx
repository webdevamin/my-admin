import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import app from "../config/firebase";
import Cookies from 'js-cookie';

const Header = () => {
    const router = useRouter();
    const auth = getAuth(app);

    const handleClick = () => {
        Cookies.remove('fb_admin_uid');
        auth.signOut();
        router.replace('/');
    }

    return (
        <header>
            <button className='btn_shadow'>
                <span>
                    Reserveringen stoppen
                </span>
            </button>
            <FontAwesomeIcon icon="fa-solid fa-power-off" size="xl" onClick={handleClick} />
        </header>
    );
}

export default Header;