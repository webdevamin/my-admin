import Seo from "../../components/Seo"
import { Top } from "../../components/Layout/Top"
import { useState, useEffect, useRef } from "react";
import CardThree from "../../components/Cards/CardThree";
import { initializeApp } from "firebase/app";
import config from "../../config/firebase";
import { collection, getFirestore, query, onSnapshot } from "firebase/firestore";
import Loader from "../../components/Loader";
import InfoModal from "../../components/Modals/InfoModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import ServerError from "../../components/Errors/ServerError";
import AlertError from "../../components/AlertError";

const lang = require('../../lang/nl.json');

const app = initializeApp(config);
const db = getFirestore(app);

const Devices = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const devicesInfoModalRef = useRef();
    const deleteModalCompRef = useRef();

    const handleOpenInfoModal = () => {
        devicesInfoModalRef.current.handleOpen(lang.devicesInfo);
    }

    const handleOpenDeleteModal = (id) => {
        deleteModalCompRef.current.handleOpen(id, 'fcm_tokens', lang.deleteDevice);
    };

    useEffect(() => {
        const q = query(collection(db, "fcm_tokens"));

        const unsub = onSnapshot(q, (snapshot) => {
            setDevices(
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

    if (loading) return <Loader />

    if (error) return (
        <ServerError title={`Ingelogde apparaten`} description={`Ingelogde apparaten`} />
    )

    return (
        <>
            <Seo title={'Ingelogde apparaten'} description={"Ingelogde apparaten"} />
            <InfoModal ref={devicesInfoModalRef} />
            <DeleteModal ref={deleteModalCompRef} />
            <Top />
            <main>
                <section className="heading_section">
                    <h1>Ingelogde apparaten</h1>
                    <span onClick={handleOpenInfoModal} className={'cursor-pointer'}>
                        Help
                    </span>
                </section>
                <section>
                    {devices.length < 1 && (
                        <AlertError classes={`mt-10`}
                            description={'Geen ingelogde apparaten te zien'} />
                    )}
                    {
                        devices.map((device) => {
                            return (
                                <CardThree key={device.id} device={device}
                                    handleOpenDeleteModal={handleOpenDeleteModal} />
                            )
                        })
                    }
                </section>
            </main>
        </>
    )
}

export default Devices