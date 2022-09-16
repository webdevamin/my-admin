import ReservationInfoModal from "../../components/Modals/ReservationInfoModal";
import { useEffect, useState, useRef } from "react";
import Seo from "../../components/Seo";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import config from "../../config/firebase";
import { initializeApp } from "firebase/app";
import Loader from "../../components/Loader";
import { Top } from "../../components/Layout/Top";
import CardTwo from "../../components/Cards/CardTwo";

const app = initializeApp(config);
const db = getFirestore(app);

const Index = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const reservationInfoModalCompRef = useRef();

    useEffect(() => {
        const currentItems = [];
        let querySnapshot;

        const fetchItems = async () => {
            querySnapshot = await getDocs(collection(db, "items"));

            querySnapshot.forEach((doc) => {
                currentItems.push(doc.data());
            });
        }

        fetchItems().then(() => {
            setItems(currentItems);
            setLoading(false);
        })
    }, []);

    if (loading) return <Loader />

    return (
        <>
            <Seo title={'Items'} description={'Lijst met items.'} />
            <ReservationInfoModal ref={reservationInfoModalCompRef} />
            <Top />
            <main>
                <section className="heading_section">
                    <h1>Items</h1>
                </section>
                {
                    items.length >= 1 && (
                        <section>
                            {
                                items.map((item, index) => {
                                    return (
                                        <CardTwo key={index} item={item} />
                                    )
                                })
                            }
                        </section>
                    )
                }
            </main>
        </>
    )
}

export default Index;