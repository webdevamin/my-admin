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
import {
    doc as docTodo, deleteDoc,
    getFirestore, getDocs, collection as firestoreCollection
} from "firebase/firestore";
import config from "../../config/firebase";
import { initializeApp } from "firebase/app";

const DeleteModal = forwardRef(({ }, ref) => {
    const app = initializeApp(config);
    const db = getFirestore(app);

    const [open, setOpen] = useState(false);
    const [documentId, setDocumentId] = useState(null);
    const [collection, setCollection] = useState('');
    const [lang, setLang] = useState(null);

    const cancelButtonRef = useRef(null);

    const destroyModal = () => {
        setOpen(false);
        setDocumentId(null);
    };

    useImperativeHandle(ref, () => ({
        handleOpen(id = null, collection = "reservations", lang) {
            setOpen(true);
            setDocumentId(id);
            setCollection(collection);
            setLang(lang);
        },
    }));

    const handleClose = () => destroyModal();

    const remove = async () => {
        try {
            if (documentId) {
                await deleteDoc(docTodo(db, collection, documentId));
            }
            else {
                const querySnapshot = await getDocs(firestoreCollection(db, collection));

                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(docTodo(db, collection, doc.id));
                });
            }

            destroyModal();
        } catch (err) {
            console.log(err.message);
        }
    };

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
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            {lang ? lang.title : 'Bevestiging'}
                                        </Dialog.Title>
                                        <div className="mt-5">
                                            <p className="text-sm text-gray-500">
                                                {lang ? lang.body : 'Zeker verwijderen?'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse items-end">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md 
                                    border border-transparent shadow-lg px-4 py-2 bg-red 
                                    text-base font-medium text-white hover:bg-dark 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm mt-4
                                    transition-all"
                                    onClick={() => remove()}
                                >
                                    Ja, verwijder maar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center 
                                    rounded-md shadow-lg px-4 py-2 
                                    bg-theme text-base font-medium text-white
                                     hover:bg-dark focus:outline-none focus:ring-2 
                                     focus:ring-offset-2 focus:ring-indigo-500 
                                     sm:ml-3 sm:w-auto sm:text-sm h-fit"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Annuleren
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
});

export default DeleteModal;
