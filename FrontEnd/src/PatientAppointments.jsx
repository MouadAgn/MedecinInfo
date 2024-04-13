import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './PatientAppointment.css';

function PatientAppointments() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/apiRoute/patient/appointments/${id}`);
                const data = await response.json();
                setData(data);
                // console.log(data[0].name);
            }
            catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };
        fetchPatientData();
    }, [id]);

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }
      else{
        return (
            <div className="patient-container">
                
                <Header />
                <br></br><br></br><br></br>
                <h2 className="tit">Informations du patient</h2><br></br>
                <p className="patient-info"><b>Nom : </b> {data[0].name}</p>
                <table className="appointments-table">
                    <caption>Rendez-vous du patient</caption>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Commentaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.comment}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                    <button><Link to={`/patient/appointment/add/${id}`}>Ajouter un rendez-vous</Link></button>
                    <br />
                    <br />
                <button><Link to="/planning " className="back-link">Retour au planning</Link></button>&nbsp;
                <button><Link to="/patients" className="back-link">Retour au patients</Link></button>
                <Footer />
            </div>
        );

      }
}

export default PatientAppointments;
