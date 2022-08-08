import ReservationInfoModal from "../../components/ReservationInfoModal";
import { useEffect, useState, useRef } from "react";
import Seo from "../../components/Seo";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
    collection, getFirestore, onSnapshot,
    orderBy, query, doc, setDoc, getDocs, updateDoc
} from "firebase/firestore";
import config from "../../config/firebase";
import { initializeApp } from "firebase/app";
import Loader from "../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const app = initializeApp(config);
const db = getFirestore(app);

const Index = () => {
    const [items, setItems] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
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

    const handleOpenGuide = () => {
        reservationInfoModalCompRef.current.handleOpen();
    }

    const toggleMenu = (toggle) => {
        setShowMenu(toggle);
    }

    if (loading) return <Loader />

    return (
        <>
            <Seo title={'Items'} description={'Lijst met items.'} />
            <ReservationInfoModal ref={reservationInfoModalCompRef} />
            <Header toggleMenu={toggleMenu} showMenu={showMenu} />
            <Sidebar show={showMenu} toggleMenu={toggleMenu} />
            <main>
                <section className="heading_section">
                    <h1>Items</h1>
                    <span onClick={handleOpenGuide} className={'cursor-pointer'}>
                        Help
                    </span>
                </section>
                {
                    items.length >= 1 && (
                        <>
                            <section>
                                {
                                    items.map((item, index) => {
                                        const { title, description, price, image_url } = item;

                                        return (
                                            <article className="card gap-3" key={index}>
                                                <div className="card_left">
                                                    <div className="circle">
                                                        <span>{1}</span>
                                                    </div>
                                                    <div className="info">
                                                        <h2>{title}</h2>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span>{description}</span>
                                                        </div>
                                                        <div className="font-semibold mt-2 text-emerald-600">
                                                            {price}
                                                        </div>
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon icon="fa-solid fa-trash"
                                                    className="icon delete_btn" data-id={index} />
                                            </article>
                                        )
                                    })
                                }
                            </section>
                        </>
                    )
                }
            </main>
        </>
    )
}

export default Index;