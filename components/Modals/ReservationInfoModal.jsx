/* eslint-disable react/display-name */
/* This example requires Tailwind CSS v2.0+ */
import {
    Fragment,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReservationInfoModal = forwardRef(({ }, ref) => {
    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);
    const destroyModal = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));

    const handleClose = () => destroyModal();

    return (
        <Transition.Root show={open || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={handleClose}
            >
                <div className="flex items-end justify-center min-h-screen 
                pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 
                        bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white 
                        rounded-lg text-left overflow-hidden shadow-xl transform transition-all 
                        sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-xl leading-6 
                                        font-medium text-gray-900 text-center">
                                            Gebruik
                                        </Dialog.Title>
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-500 mb-8">
                                                Dit is uw dashboard: een overzicht met reservaties.
                                                Onderaan wordt uitgelegd wat de verschillende delen van een reservatie betekenen.
                                            </p>
                                            <article className={`bg-light rounded-2xl flex 
                                            justify-between p-4 mb-3 shadow-sm items-center`}>
                                                <div className={`flex justify-center items-center gap-5`}>
                                                    <div className={`bg-dark h-10 w-10 p-6 rounded-full 
                                                    flex items-center justify-center font-semibold 
                                                    text-2xl text-dark shadow-alpha`}>
                                                        <span className={`text-white`}>
                                                            3
                                                        </span>
                                                    </div>
                                                    <div className="info">
                                                        <h2 className="text-left">Kevin Boo</h2>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <FontAwesomeIcon icon="fa-solid fa-phone"
                                                                className="text-xs" />
                                                            <span>0470542112</span>
                                                        </div>
                                                        <div className={`flex gap-8 mt-2 pt-2 border-t
                                                        border-t-theme border-opacity-20`}>
                                                            <div className={`flex items-center gap-2`}>
                                                                <FontAwesomeIcon icon="fa-solid fa-clock"
                                                                    className={`text-sm`} />
                                                                <span className={`text-sm font-bold`}>
                                                                    00:02:45
                                                                </span>
                                                            </div>
                                                            <div className={`flex items-center gap-2`}>
                                                                <FontAwesomeIcon icon="fa-solid fa-utensils"
                                                                    className="text-xs" />
                                                                <span className={`text-sm font-bold`}>
                                                                    12:30
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon icon="fa-solid fa-trash"
                                                    className={`icon cursor-pointer text-red bg-red 
                                                    transition hover:bg-opacity-80 shadow-alpha`} />
                                            </article>
                                        </div>
                                        <section className="text-left mt-7 ml-1">
                                            <article className="flex items-center gap-3 mb-3">
                                                <div className="bg-dark h-5 w-5 p-4 
                                            rounded-full flex items-center justify-center 
                                            font-semibold text-sm text-dark">
                                                    <span className="text-white">3</span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Dit cijfer staat voor met hoeveel personen
                                                    er gereserveerd wordt.
                                                </p>
                                            </article>
                                            <article className="flex items-center gap-3 mb-3">
                                                <div className="p-2">
                                                    <FontAwesomeIcon icon="fa-solid fa-phone"
                                                        className="text-base" />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Wat er na volgt is de telefoonnummer. Klik er op
                                                    om direct met dat contactpersoon op te bellen.
                                                </p>
                                            </article>
                                            <article className="flex items-center gap-3 mb-3">
                                                <div className="p-2">
                                                    <FontAwesomeIcon icon="fa-solid fa-clock"
                                                        className="text-base" />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Wat er na volgt is de tijdstip waarop een
                                                    gebruiker op de knop &apos;Reserveer&apos; geklikt heeft.
                                                </p>
                                            </article>
                                            <article className="flex items-center gap-3 mb-3">
                                                <div className="p-2">
                                                    <FontAwesomeIcon icon="fa-solid fa-utensils"
                                                        className="text-base" />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Wat er na volgt is de tijdstip als keuze dat een
                                                    gebruiker gekozen heeft om te eten.
                                                </p>
                                            </article>
                                            <article className="flex items-center gap-3 flex-row-reverse">
                                                <div className="p-2">
                                                    <FontAwesomeIcon icon="fa-solid fa-trash"
                                                        className="icon delete_btn bg-red" />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Dient om een reservering te verwijderen. Doe dit voor
                                                    elk die niet meer nodig is.
                                                </p>
                                            </article>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse items-end">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md 
                                    border border-transparent shadow-lg px-4 py-2 bg-theme 
                                    text-base font-medium text-white hover:bg-dark 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm 
                                    transition-all"
                                    onClick={() => setOpen(false)}
                                >
                                    Begrepen
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});

export default ReservationInfoModal;
