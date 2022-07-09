import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import app from "../config/firebase";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
    const router = useRouter();
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [loading, setLoading] = useState(true);
    const [renderDisableReservationsBtn, setRenderDisableReservationsBtn] = useState(true);
    const [doesReservationSwitchExist, setDoesReservationSwitchExist] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "disable_reservations", "I1YLivWVqQhsDqR9a7rd");
            const docSnap = await getDoc(docRef);

            setLoading(false);

            if (docSnap.exists()) setRenderDisableReservationsBtn(!docSnap.data().disable);
            else setDoesReservationSwitchExist(false);
        }

        fetchData();
    }, [db])

    const handleClick = () => {
        Cookies.remove('fb_admin_uid');
        auth.signOut();
        router.replace('/');
    }

    const handleReservationClick = async (disableBtn) => {
        const docRef = doc(db, "disable_reservations", "I1YLivWVqQhsDqR9a7rd");
        const docSnap = await getDoc(docRef);
        const disable = docSnap.data().disable;

        await updateDoc(docRef, {
            disable: !disable
        });

        if (disableBtn) {
            toast('Reservaties uitgeschakeld');
        }
        else {
            toast('Reservaties ingeschakeld');
        }

        setRenderDisableReservationsBtn(disable);
    }

    return (
        <header>
            <div className={`${!loading && doesReservationSwitchExist ? 'block' : 'hidden'}`}>
                <FontAwesomeIcon icon="fa-solid fa-bell"
                    className={`cursor-pointer ${!renderDisableReservationsBtn ? 'hidden' : 'block'}`}
                    size="xl" onClick={() => handleReservationClick(true)} />

                <FontAwesomeIcon icon="fa-solid fa-bell-slash"
                    className={`cursor-pointer ${renderDisableReservationsBtn ? 'hidden' : 'block'}`}
                    size="xl" onClick={() => handleReservationClick(false)} />
            </div>
            <FontAwesomeIcon icon="fa-solid fa-power-off" size="xl"
                onClick={handleClick} className="cursor-pointer" />
            <Toaster toastOptions={
                {
                    className: 'bg-light text-dark font-semibold',
                }
            } containerStyle={{
                top: 20,
            }} />
        </header>
    );
}

export default Header;