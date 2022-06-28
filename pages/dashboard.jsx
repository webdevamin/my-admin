import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
    return (
        <>
            <section>
                <h1>Reserveringen</h1>
                <section>
                    <article className="card">
                        <div className="info">
                            <h2>Mark Hunter</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash" className="icon bg-red" />
                    </article>
                    <article className="card">
                        <div className="info">
                            <h2>Dane Garring</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash" className="icon bg-red" />
                    </article>
                    <article className="card">
                        <div className="info">
                            <h2>Matson Mendberg</h2>
                            <span>On Medication</span>
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-trash" className="icon bg-red" size="xs" />
                    </article>
                </section>
            </section>
        </>
    )
}

export default Dashboard;