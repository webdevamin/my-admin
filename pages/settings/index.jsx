import Seo from "../../components/Seo";
import { Top } from "../../components/Top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Settings = () => {
    return (
        <>
            <Seo title={'Instellingen'} description={"Instellingen"} />
            <Top />
            <main>
                <section className="heading_section">
                    <h1>Instellingen</h1>
                </section>
                <section>
                    <Link href={'/settings/devices'}>
                        <a className="link_item">
                            <FontAwesomeIcon icon="fa-solid fa-display" size="xl" />
                            <span>Ingelogde apparaten</span>
                        </a>
                    </Link>
                </section>
            </main>
        </>
    )
}

export default Settings;