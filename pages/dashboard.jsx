import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import app from "../config/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import Seo from "../components/Seo";
import ReservationInfoModal from "../components/ReservationInfoModal";

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);

    const deleteModalCompRef = useRef();
    const reservationInfoModalCompRef = useRef();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "reservations"), (snapshot) => {
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