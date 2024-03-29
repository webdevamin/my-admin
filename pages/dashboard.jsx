import { useEffect, useState, useRef } from "react";
import config from "../config/firebase";
import {
    collection, getFirestore, onSnapshot,
    orderBy, query, doc, setDoc, getDoc, updateDoc
} from "firebase/firestore";
import DeleteModal from "../components/Modals/DeleteModal";
import Loader from "../components/Loader";
import Seo from "../components/Seo";
import ReservationInfoModal from "../components/Modals/ReservationInfoModal";
import { getMessaging, getToken } from "firebase/messaging";
import { v4 as uuidv4 } from 'uuid';
import InfoModal from "../components/Modals/InfoModal";
import { initializeApp } from "firebase/app";
import { MAX_ITEMS } from "../config/app";
import { getLocalDateAndTime, interpolate } from "../config/helpers";
import CardOne from "../components/Cards/CardOne";
import { doesBrowserSupportNotificationAPI } from "../config/browser";
import AlertError from "../components/AlertError";
import { Top } from "../components/Layout/Top";
import ServerError from "../components/Errors/ServerError";
import { useRouter } from "next/router";

const lang = require('../lang/nl.json');

const app = initializeApp(config);
const db = getFirestore(app);

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doesAcceptNotifsPermission, setDoesAcceptNotifsPermission] = useState(true);
    const [doesBrowserSupportNotifs, setDoesBrowserSupportNotifs] = useState(true);
    const [error, setError] = useState(false);

    const router = useRouter();

    const deleteModalCompRef = useRef();
    const deleteAllModalCompRef = useRef();
    const reservationInfoModalCompRef = useRef();
    const noNotificationPermissionCompRef = useRef();
    const noNotificationSupportCompRef = useRef();

    useEffect(() => {
        const q = query(collection(db, "reservations"), orderBy("date_submitted", "desc"));

        const unsub = onSnapshot(q, (snapshot) => {
            setReservations(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );

            setLoading(false);
        }, (error) => {
            setLoading(false);
            setError(error.message);
        });

        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        const saveToken = async (uuid, currentToken) => {
            try {
                await setDoc(doc(db, "fcm_tokens", uuid), {
                    uuid: uuid,
                    token_id: currentToken,
                    registered_at: getLocalDateAndTime(),
                    last_logged_in: getLocalDateAndTime()
                });

                localStorage.setItem('fcm_token', JSON.stringify({
                    uuid: uuid,
                    token_id: currentToken
                }));
            } catch (error) {
                console.log(error);
            }
        }

        const syncTokens = async (localToken, currentToken) => {
            const { uuid } = localToken;
            const docRef = doc(db, "fcm_tokens", uuid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { token_id: tokenIdDb } = docSnap.data();

                try {
                    if (currentToken !== tokenIdDb) {
                        await updateDoc(docRef, {
                            uuid: uuid,
                            token_id: currentToken,
                            last_logged_in: getLocalDateAndTime()
                        });

                        localStorage.removeItem("fcm_token");
                        localStorage.setItem('fcm_token', JSON.stringify({
                            uuid: uuid,
                            token_id: currentToken
                        }));
                    }
                    else {
                        if (router.query.logged === "true") {
                            await updateDoc(docRef, {
                                last_logged_in: getLocalDateAndTime()
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                try {
                    await setDoc(doc(db, "fcm_tokens", uuid), {
                        uuid: uuid,
                        token_id: currentToken,
                        registered_at: getLocalDateAndTime(),
                        last_logged_in: getLocalDateAndTime()
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }

        if (process.env.ENABLE_PUSH_NOTIFICATIONS) {
            if (doesBrowserSupportNotificationAPI()) {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        const messaging = getMessaging(app);
                        setDoesAcceptNotifsPermission(true);

                        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FB_WPUSH_CERT })
                            .then((currentToken) => {
                                if (currentToken) {
                                    const localToken = JSON.parse(localStorage.getItem('fcm_token'));

                                    if (!localToken) saveToken(uuidv4(), currentToken);
                                    else syncTokens(localToken, currentToken);
                                } else {
                                    console.log('No registration token available. Request permission to generate one.');
                                }
                            }).catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                            });
                    }
                    else {
                        console.log('Notification permission blocked.');
                        setDoesAcceptNotifsPermission(false);
                    }
                });
            }
            else {
                setDoesBrowserSupportNotifs(false);
            }
        }
    }, [router.query.logged])

    useEffect(() => {
        setTimeout(() => {
            const disablePermissionModal = localStorage.getItem(lang.noNotificationPermission.disableKey);

            if (!doesAcceptNotifsPermission && !disablePermissionModal) {
                noNotificationPermissionCompRef.current.handleOpen(lang.noNotificationPermission);
            }
        }, 3000)
    }, [doesAcceptNotifsPermission])

    useEffect(() => {
        setTimeout(() => {
            const disableSupportModal = localStorage.getItem(lang.noNotificationSupport.disableKey);

            if (!doesBrowserSupportNotifs && !disableSupportModal) {
                noNotificationSupportCompRef.current.handleOpen(lang.noNotificationSupport);
            }
        }, 2000)
    }, [doesBrowserSupportNotifs])

    const handleOpen = (id) => {
        deleteModalCompRef.current.handleOpen(id, 'reservations', lang.deleteReservation);
    };

    const handleOpenDeleteAll = () => {
        deleteAllModalCompRef.current.handleOpen(null, 'reservations', lang.deleteReservations);
    };

    const handleOpenGuide = () => {
        reservationInfoModalCompRef.current.handleOpen();
    }

    if (loading) return <Loader />

    if (error) return (
        <ServerError title={`Dashboard`} description={`Dashboard`} />
    )

    return (
        <>
            <Seo title={'Dashboard'} description={'Dashboard'} />
            <DeleteModal ref={deleteModalCompRef} />
            <DeleteModal ref={deleteAllModalCompRef} />
            <ReservationInfoModal ref={reservationInfoModalCompRef} />
            <InfoModal ref={noNotificationSupportCompRef} />
            <InfoModal ref={noNotificationPermissionCompRef} />
            <Top />
            <main>
                <section className="heading_section mb-5">
                    <h1>Reserveringen</h1>
                    <span onClick={handleOpenGuide} className={'cursor-pointer'}>
                        Help
                    </span>
                </section>
                {
                    reservations.length >= 1 && (
                        <section className="mb-9">
                            <button onClick={handleOpenDeleteAll}
                                className="p-0 -mt-2 bg-transparent 
                                text-sm w-auto block">
                                <span className="text-red opacity-100 
                                font-medium border-b border-b-red
                                pb-1 hover:border-0">
                                    Verwijder alle reserveringen
                                </span>
                            </button>
                        </section>
                    )
                }
                {
                    reservations.length > MAX_ITEMS && (
                        <>
                            <AlertError
                                description={
                                    interpolate(
                                        lang.clearReservationsReminder.body,
                                        { max_items: MAX_ITEMS }
                                    )
                                } classes={'mb-5'} />
                        </>
                    )
                }
                {
                    reservations.length >= 1 && (
                        <>
                            <section>
                                {
                                    reservations.map((reservation) => {
                                        return <CardOne key={reservation.id}
                                            reservation={reservation} handleOpen={handleOpen} />
                                    })
                                }
                            </section>
                        </>
                    )
                }
                {reservations.length < 1 && (
                    <AlertError classes={`mt-10`}
                        description={'Er zijn momenteel geen reserveringen beschikbaar'} />
                )}
            </main>
        </>
    )
}

export default Dashboard;