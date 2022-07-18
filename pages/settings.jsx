import Seo from "../components/Seo";
import Header from "../components/Header";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';
import app from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import Alert from "../components/Alert";
import { useState } from "react";

const Settings = () => {
    const [error, setError] = useState('');

    const auth = getAuth(app);
    const router = useRouter();
    const db = getFirestore(app);

    const logout = () => {
        Cookies.remove('fb_admin_uid');
        auth.signOut();
        router.replace('/');
    }

    const removeFcmTokens = async () => {
        try {
            await deleteDoc(doc(db, "fcm_tokens"));
            logout();
        } catch (error) {
            console.log(error);
            setError(error.toString());
        }
    }

    return (
        <>
            <Seo title={'Instellingen'} description={'Instellingen'} />
            <Header />
            <main className="relative">
                <section className="heading_section">
                    <h1>Instellingen</h1>
                </section>
                {error && <Alert classname={'error'} description={error} />}
                <section className="items">
                    <article className="item" onClick={removeFcmTokens}>
                        <div className="item_content">
                            <div className="item_heading">
                                <FontAwesomeIcon icon="fa-solid fa-database"
                                    className="item_icon" />
                                <h2>Wis sleutelgegevens</h2>
                            </div>
                            <p>
                                Het is belangrijk om deze <strong>wekelijks</strong> uit te
                                voeren wanneer u en uw collega&apos;s gedaan
                                zijn met werken. Nadat u op deze knop klikt, wordt u uitgelogd.
                            </p>
                        </div>
                    </article>
                    <article className="item" onClick={logout}>
                        <div className="item_content">
                            <div className="item_heading">
                                <FontAwesomeIcon icon="fa-solid fa-power-off"
                                    className="item_icon" />
                                <h2>Uitloggen</h2>
                            </div>
                        </div>
                    </article>
                </section>
                <section className="mt-10">
                    <Link href={'/dashboard'}>
                        <a className="button btn_shadow block text-center">
                            <span>Naar Reserveringen</span>
                        </a>
                    </Link>
                </section>
            </main>
        </>
    )
}

export default Settings;

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