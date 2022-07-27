import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import config from "../config/firebase";
import {
    collection, getFirestore, onSnapshot,
    orderBy, query, doc, setDoc, getDoc, updateDoc
} from "firebase/firestore";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import Seo from "../components/Seo";
import ReservationInfoModal from "../components/ReservationInfoModal";
import { getMessaging, getToken } from "firebase/messaging";
import { v4 as uuidv4 } from 'uuid';
import Alert from "../components/Alert";
import InfoModal from "../components/InfoModal";
import { initializeApp } from "firebase/app";

const lang = require('../lang/nl.json');

const doesBrowserSupportNotificationAPI = () => {
    return (
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window
    )
}

const app = initializeApp(config);
const db = getFirestore(app);

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doesAcceptNotifsPermission, setDoesAcceptNotifsPermission] = useState(true);
    const [doesBrowserSupportNotifs, setDoesBrowserSupportNotifs] = useState(true);

    const deleteModalCompRef = useRef();
    const reservationInfoModalCompRef = useRef();
    const noNotificationPermissionCompRef = useRef();
    const noNotificationSupportCompRef = useRef();
    const clearReservationsReminderCompRef = useRef();

    useEffect(() => {
        const q = query(collection(db, "reservations"), orderBy("time_submitted", "desc"));

        const unsub = onSnapshot(q, (snapshot) => {
            setReservations(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );

            setLoading(false);
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
                    token_id: currentToken
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

                if (currentToken !== tokenIdDb) {
                    try {
                        await updateDoc(docRef, {
                            uuid: uuid,
                            token_id: currentToken
                        });

                        localStorage.removeItem("fcm_token");
                        localStorage.setItem('fcm_token', JSON.stringify({
                            uuid: uuid,
                            token_id: currentToken
                        }));
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            else {
                try {
                    await setDoc(doc(db, "fcm_tokens", uuid), {
                        uuid: uuid,
                        token_id: currentToken
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }

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
    }, [])

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

    useEffect(() => {
        if (reservations.length > 5) {
            clearReservationsReminderCompRef.current.handleOpen(lang.clearReservationsReminder);
        }
    }, [reservations])

    const handleOpen = (id) => {
        deleteModalCompRef.current.handleOpen(id);
    };

    const handleOpenGuide = () => {
        reservationInfoModalCompRef.current.handleOpen();
    }

    if (loading) return <Loader />

    return (
        <>
            <Seo title={'Dashboard'} description={'Dashboard'} />
            <DeleteModal ref={deleteModalCompRef} />
            <ReservationInfoModal ref={reservationInfoModalCompRef} />
            <InfoModal ref={noNotificationSupportCompRef} />
            <InfoModal ref={noNotificationPermissionCompRef} />
            <InfoModal ref={clearReservationsReminderCompRef} />
            <Header />
            <main>
                <section className="heading_section">
                    <h1>Reserveringen</h1>
                    <span onClick={handleOpenGuide} className={'cursor-pointer'}>
                        Help
                    </span>
                </section>
                {
                    reservations.length >= 1 && (
                        <section>
                            {
                                reservations.map((reservation) => {
                                    const { id, data } = reservation;
                                    const { name, phone, reservation_time, time_submitted, units } = data;

                                    return (
                                        <article className="card" key={id}>
                                            <div className="card_left">
                                                <div className="circle">
                                                    <span>{units}</span>
                                                </div>
                                                <div className="info">
                                                    <h2>{name}</h2>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <FontAwesomeIcon icon="fa-solid fa-phone"
                                                            className="text-xs" />
                                                        <a href={`tel:${phone}`}>{phone}</a>
                                                    </div>
                                                    <div className="info_bottom">
                                                        <div>
                                                            <FontAwesomeIcon icon="fa-solid fa-clock"
                                                                className="text-xs" />
                                                            <span>{time_submitted}</span>
                                                        </div>
                                                        <div>
                                                            <FontAwesomeIcon icon="fa-solid fa-utensils"
                                                                className="text-xs" />
                                                            <span>{reservation_time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <FontAwesomeIcon icon="fa-solid fa-trash"
                                                className="icon delete_btn" data-id={id} onClick={() => handleOpen(id)} />
                                        </article>
                                    )
                                })
                            }
                        </section>
                    )
                }
                {reservations.length < 1 && (
                    <Alert classname={'warning'}
                        description={'Er zijn momenteel geen reserveringen beschikbaar'} />
                )}
            </main>
        </>
    )
}

export default Dashboard;

export async function getServerSideProps(context) {
    const { fb_admin_uid } = context.req.cookies;
    const isTokenValid = fb_admin_uid === process.env.FB_ADMIN_UID;

    if (!isTokenValid) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            },
            props: {},
        }
    }

    return {
        props: {},
    }
}