import Seo from "../../components/Seo"
import { Top } from "../../components/Layout/Top"
import { useState, useEffect, useRef } from "react";
import ReservationInfoModal from "../../components/Modals/ReservationInfoModal";
import Accordion from "../../components/Accordion";
import { initializeApp } from "firebase/app";
import config from "../../config/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Loader from "../../components/Loader";

const app = initializeApp(config);
const db = getFirestore(app);

const Devices = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    const reservationInfoModalCompRef = useRef();

    const handleOpenGuide = () => {
        reservationInfoModalCompRef.current.handleOpen();
    }

    useEffect(() => {
        const currentDevices = [];
        let querySnapshot;

        const fetchDevices = async () => {
            querySnapshot = await getDocs(collection(db, "fcm_tokens"));

            querySnapshot.forEach((doc) => {
                currentDevices.push(doc.data());
            });
        }

        fetchDevices().then(() => {
            setDevices(currentDevices);
            setLoading(false);
        })
    }, []);

    if (loading) return <Loader />

    return (
        <>
            <Seo title={'Ingelogde apparaten'} description={"Ingelogde apparaten"} />
            <ReservationInfoModal ref={reservationInfoModalCompRef} />
            <Top />
            <main>
                <section className="heading_section">
                    <h1>Ingelogde apparaten</h1>
                    <span onClick={handleOpenGuide} className={'cursor-pointer'}>
                        Help
                    </span>
                </section>
                <section>
                    {
                        devices.map((device, index) => {
                            return (
                                <Accordion key={index} device={device}/>
                            )
                        })
                    }
                </section>
            </main>
        </>
    )
}

export default Devices