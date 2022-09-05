import LinkItem from "../../components/LinkItem";
import Seo from "../../components/Seo";
import { Top } from "../../components/Layout/Top";

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
                    <LinkItem title={`Ingelogde apparaten`}
                        href={`/settings/devices`}
                        iconClasses={`fa-solid fa-display`} />
                </section>
            </main>
        </>
    )
}

export default Settings;