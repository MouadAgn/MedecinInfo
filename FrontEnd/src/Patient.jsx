import { useEffect, useState } from 'react';
import './Patient.css'; // Assurez-vous d'avoir le bon fichier CSS pour ce composant
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Patient() {
    const [loading, setLoading] = useState(true); // Ajout de l'état pour le chargement
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données des patients
                const response = await fetch('http://127.0.0.1:8000/api/patients');
                const patientsData = await response.json();
                
                // Création d'un tableau de promesses pour récupérer les rendez-vous de chaque patient
                const appointmentPromises = patientsData.map(async (patient) => {
                    const patientId = patient.id;
                    const appointmentResponse = await fetch(`http://127.0.0.1:8000/api/appointments/patient/${patientId}`);
                    return appointmentResponse.json();
                });

                // Attente de la résolution de toutes les promesses
                const appointmentsData = await Promise.all(appointmentPromises);

                // Combiner les données des patients et les rendez-vous correspondants
                const combinedData = patientsData.map((patient, index) => {
                    return { patient: patient, appointments: appointmentsData[index] };
                });

                setAppointments(combinedData);
                setLoading(false); // Mettre à jour l'état du chargement une fois les données chargées
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="patient-container">
            <Header />
            {loading ? ( // Condition pour afficher l'icône de chargement
                <div className="loading-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                <br /><br />
                <h1>Liste des patients</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Date de Naissance</th>
                            <th>Genre</th>
                            <th>Téléphone</th>
                            <th>Prochain Rendez-Vous</th>
                            <th>Actions</th> {/* Ajout de la colonne pour les actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((data, index) => (
                            <tr key={index}>
                                <td>{data.patient.id}</td>
                                <td>{data.patient.name}</td>
                                <td>{data.patient.dob}</td>
                                <td>{data.patient.gender === 1 ? 'Homme' : 'Femme'}</td>
                                <td>{data.patient.phone}</td>
                                <td>{data.appointments.date ? `${data.appointments.date} à ${data.appointments.time}` : 'Pas de RDV'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/patients/add" className="add-patient-button">Ajouter un patient</Link>
                &nbsp;<Link to="/planning" className="add-patient-button">Retour au planning</Link>
                </>
            )}
            <Footer />
        </div>
    );
}

export default Patient;
