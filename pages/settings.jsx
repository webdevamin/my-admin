import Seo from "../components/Seo";
import Header from "../components/Header";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Settings = () => {
    return (
        <>
            <Seo title={'Instellingen'} description={'Instellingen'} />
            <Header />
            <main className="relative">
                <section className="heading_section">
                    <h1>Instellingen</h1>
                </section>
                <section className="items">
                    <article className="item">
                        <div className="item_content">
                            <div className="item_heading">
                                <FontAwesomeIcon icon="fa-solid fa-database"
                                    className="item_icon" />
                                <h2>Wis sleutelgegevens</h2>
                            </div>
                            <p>
                                Het is belangrijk om deze wekelijks uit te
                                voeren wanneer u en uw collega&apos;s gedaan
                                zijn met werken. Vergeet niet om de
                                app <strong>opnieuw op te starten</strong>!
                            </p>
                        </div>
                    </article>
                    <article className="item">
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