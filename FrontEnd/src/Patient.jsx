import { useEffect, useState } from 'react';
import './Patient.css'; // Assurez-vous d'avoir le bon fichier CSS pour ce composant
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Patient() {
    const [loading, setLoading] = useState(true); // Ajout de l'état pour le chargement
    const [appointments, setAppointments] = useState([]);
    const [, setSelectedPatient] = useState(null); // État pour stocker le patient sélectionné pour la suppression

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/patients');
                const patientsData = await response.json();
                const numberOfPatients = patientsData.length;

                const allAppointments = [];

                for (let i = 1; i <= numberOfPatients; i++) {
                    const response = await fetch(`http://127.0.0.1:8000/api/appointments/patient/${i}`);
                    const appointmentsData = await response.json();

                    const existingAppointments = allAppointments.find(appointments => appointments.patientId === i);
                    if (!existingAppointments) {
                        allAppointments.push({ patientId: i, appointments: appointmentsData });
                    }
                }
                
                setAppointments(allAppointments);
                setLoading(false); // Mettre à jour l'état du chargement une fois les données chargées
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (patientId) => {
        setSelectedPatient(patientId); // Stocker l'ID du patient à supprimer dans l'état
        // Afficher une boîte de dialogue de confirmation ici
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
            // Si l'utilisateur confirme, vous pouvez implémenter la logique de suppression ici
            console.log('Suppression du patient avec ID :', patientId);
        }
    };

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
                        {appointments.map(patient => (
                            <tr key={patient.appointments.patient.id}>
                                <td>{patient.appointments.patient.id}</td>
                                <td>{patient.appointments.patient.name}</td>
                                <td>{patient.appointments.patient.dob}</td>
                                <td>{patient.appointments.patient.gender === 1 ? 'Homme' : 'Femme'}</td>
                                <td>{patient.appointments.patient.phone}</td>
                                <td>{patient.appointments.appointments.date ? `${patient.appointments.appointments.date} à ${patient.appointments.appointments.time}` : 'Pas de RDV'}</td>
                                <td>
                                    <button style={{backgroundColor: 'blue'}}>Modifier</button>&nbsp;&nbsp;
                                    <button style={{backgroundColor: 'red'}} onClick={() => handleDelete(patient.appointments.patient.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/planning">Retour au planning</Link>
                </>
            )}
            <Footer />
        </div>
    );
}

export default Patient;
