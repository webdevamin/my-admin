import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import app from "../config/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "reservations"), (snapshot) => {
            setReservations(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return () => {
            unsub();
        };
    }, [db]);
    console.log(reservations);
    return (
        <>
            <Header />
            <main>
                <h1>Reserveringen</h1>
                <section>
                    {
                        reservations.map((reservation) => {
                            const { id, data } = reservation;
                            const { name, phone, reservation_time, time_submitted, units } = data;

                            return (
                                <article className="card" key={id}>
                                    <div className="card_left">
                                        <div className="circle">{units}</div>
                                        <div className="info">
                                            <h2>{name}</h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <FontAwesomeIcon icon="fa-solid fa-phone"
                                                    className="text-xs" />
                                                <span>{phone}</span>
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
                                        className="icon bg-red" />
                                </article>
                            )
                        })
                    }
                </section>
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