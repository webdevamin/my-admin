import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { app, messaging } from "../config/firebase";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import Seo from "../components/Seo";
import ReservationInfoModal from "../components/ReservationInfoModal";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import NoNotificationPermissionModal from "../components/NoNotificationPermissionModal";

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doesAcceptNotifsPermission, setDoesAcceptNotifsPermission] = useState(true);
    const db = getFirestore(app);

    const deleteModalCompRef = useRef();
    const reservationInfoModalCompRef = useRef();
    const noNotificationPermissionModalCompRef = useRef();

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
    }, [db]);

    useEffect(() => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const messaging = getMessaging();
                setDoesAcceptNotifsPermission(true);
                navigator.serviceWorker.getRegistration('/sw.js').then((swRegistration) => {
                    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FB_WPUSH_CERT, serviceWorkerRegistration: swRegistration })
                        .then((currentToken) => {
                            if (currentToken) {
                                console.log(currentToken);
                            } else {
                                // Show permission request UI
                                console.log('No registration token available. Request permission to generate one.');
                                // ...
                            }
                        }).catch((err) => {
                            console.log('An error occurred while retrieving token. ', err);
                        });
                });
            }
            else {
                console.log('Notification permission blocked.');
                setDoesAcceptNotifsPermission(false);
            }
        });
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const disablePermissionModal = localStorage.getItem('disable_permission_modal');

            if (!doesAcceptNotifsPermission && !disablePermissionModal) {
                noNotificationPermissionModalCompRef.current.handleOpen();
            }
        }, 2000)
    }, [doesAcceptNotifsPermission])

    const handleOpen = (id) => {
        deleteModalCompRef.current.handleOpen(id);
    };

    const handleOpenGuide = () => {
        reservationInfoModalCompRef.current.handleOpen();
    }

    const handleMsg = () => {
        // fetch('https://b73c-87-66-180-140.eu.ngrok.io/dashboard')
        // .then((res)=>)
    }

    if (loading) return <Loader />

    return (
        <>
            <Seo title={'Dashboard'} description={'Dashboard'} />
            <DeleteModal ref={deleteModalCompRef} />
            <ReservationInfoModal ref={reservationInfoModalCompRef} />
            <NoNotificationPermissionModal ref={noNotificationPermissionModalCompRef} />
            <Header />
            <main>
                <section className="heading_section">
                    <h1>Reserveringen</h1>
                    {/* <span onClick={handleOpenGuide} className={'cursor-pointer'}> */}
                    <span onClick={handleMsg} className={'cursor-pointer'}>
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
                {
                    reservations.length < 1 && (
                        <div className='warning'>
                            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation"
                                className='warning_icon' />
                            <p className="warning_text" role="alert">
                                Er zijn momenteel geen reserveringen.
                            </p>
                        </div>
                    )
                }
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