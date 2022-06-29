import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";

const Dashboard = () => {
    return (
        <>
            <Header />
            <main>
                <h1>Reserveringen</h1>
                <section>
                    <article className="card">
                        <div className="info">
                            <h2>Mark Hunter</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash"
                            className="icon bg-red" />
                    </article>
                    <article className="card">
                        <div className="info">
                            <h2>Dane Garring</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash"
                            className="icon bg-red" />
                    </article>
                    <article className="card">
                        <div className="info">
                            <h2>Matson Mendberg</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash"
                            className="icon bg-red" size="xs" />
                    </article>
                </section>
            </main>
        </>
    )
}


export default Dashboard;

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