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
                    <article className="card">
                        <div className="info">
                            <h2>Mark Hunter</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash"
                            className="icon bg-red" />
                    </article>
                    <article className="card">
                        <div className="info">
                            <h2>Dane Garring</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash"
                            className="icon bg-red" />
                    </article>
                    <article className="card">
                        <div className="info">
                            <h2>Matson Mendberg</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash"
                            className="icon bg-red" size="xs" />
                    </article>
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