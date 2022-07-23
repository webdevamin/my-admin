import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import app from "../config/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";

const Header = () => {
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

    const handleReservationClick = async (disableBtn) => {
        const docRef = doc(db, "disable_reservations", "I1YLivWVqQhsDqR9a7rd");
        const docSnap = await getDoc(docRef);
        const disable = docSnap.data().disable ?? false;

        await updateDoc(docRef, {
            disable: !disable
        });

        if (disableBtn) {
            toast('Reserveringen uitgeschakeld');
        }
        else {
            toast('Reserveringen ingeschakeld');
        }

        setRenderDisableReservationsBtn(disable);
    }

    return (
        <header>
            <div>
                <div className={`${!loading && doesReservationSwitchExist ? 'block' : 'hidden'}`}>
                    <FontAwesomeIcon icon="fa-solid fa-bell"
                        className={`cursor-pointer ${!renderDisableReservationsBtn ? 'hidden' : 'block'}`}
                        size="xl" onClick={() => handleReservationClick(true)} />

                    <FontAwesomeIcon icon="fa-solid fa-bell-slash"
                        className={`cursor-pointer ${renderDisableReservationsBtn ? 'hidden' : 'block'}`}
                        size="xl" onClick={() => handleReservationClick(false)} />
                </div>
            </div>
            <Link href={'/settings'}>
                <a className="pl-6">
                    <FontAwesomeIcon icon="fa-solid fa-screwdriver-wrench" size="xl"
                        className="cursor-pointer" />
                </a>
            </Link>
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