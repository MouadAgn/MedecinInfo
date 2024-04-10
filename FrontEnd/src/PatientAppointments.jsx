import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";

function PatientAppointments() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/patient/${id}/appointments`);
                const data = await response.json();
                setData(data);
            }
            catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };
        fetchPatientData();
    }, [id]);

    if (!data || !data.patient || !data.appointments) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            <Header />
            <h2>Informations du patient</h2>
            <p>Nom : {data.patient.name}</p>
            <table>
                <caption>Rendez-vous</caption>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Commentaire</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={data.appointments.id}>
                        <td>{data.appointments.date}</td>
                        <td>{data.appointments.time}</td>
                        <td>{data.appointments.comment}</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/planning">Retour au planning</Link>
        </div>
    );
}

export default PatientAppointments;