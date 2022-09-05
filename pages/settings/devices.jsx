import Seo from "../../components/Seo"
import { Top } from "../../components/Layout/Top"
import { useRef } from "react";
import ReservationInfoModal from "../../components/Modals/ReservationInfoModal";

const Devices = () => {
    const reservationInfoModalCompRef = useRef();

    const handleOpenGuide = () => {
        reservationInfoModalCompRef.current.handleOpen();
    }

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
                    <h2>Under construction</h2>
                </section>
            </main>
        </>
    )
}

export default Devices