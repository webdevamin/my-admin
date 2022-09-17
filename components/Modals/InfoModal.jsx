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

const InfoModal = forwardRef(({ }, ref) => {
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState(null);

    const cancelButtonRef = useRef(null);
    const destroyModal = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        handleOpen(lang) {
            setOpen(true);
            setLang(lang);
        },
    }));

    const handleClick = (disableModal) => {
        if (disableModal) localStorage.setItem(lang.disableKey, '1');

        setOpen(false);
    }

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
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="flex justify-center sm:justify-start 
                                        items-center gap-4">
                                            {
                                                (lang && !lang.noIcon) && (
                                                    <FontAwesomeIcon icon="fa-solid 
                                                    fa-triangle-exclamation" size="lg" />
                                                )
                                            }
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                                {lang ? lang.title : 'Titel'}
                                            </Dialog.Title>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 leading-6">
                                                {lang ? lang.body : 'Beschrijving'}
                                            </p>
                                        </div>
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
                                    // onClick={() => setOpen(false)}
                                    onClick={() => handleClick(false)}
                                >
                                    Begrepen
                                </button>
                                {
                                    (lang && lang.disableKey) && (
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md 
                                        border border-transparent shadow-lg px-4 py-2 bg-red 
                                        text-base font-medium text-white hover:bg-dark 
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 
                                        focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm 
                                        transition-all mt-3"
                                            // onClick={() => setOpen(false)}
                                            onClick={() => handleClick(true)}
                                        >
                                            Deze melding niet meer tonen
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});

export default InfoModal;
