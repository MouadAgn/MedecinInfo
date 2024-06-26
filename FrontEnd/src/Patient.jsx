import { useEffect, useState } from 'react';
import './Patient.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Patient() {
    const [loading, setLoading] = useState(true);
    const [allAppointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const user = await response.json();
                        setUserRole(user.patient.Role);
                    } else {
                        setUserRole(null);
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification de l\'utilisateur :', error);
                    setUserRole(null);
                    navigate('/');
                }
            } else {
                setUserRole(null);
                navigate('/');
            }
        };

        checkUserAuthentication();

        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/patients');
                const patientsData = await response.json();
                
                const allAppointments = [];

                for (const patient of patientsData) {
                    const patientId = patient.id;
                    const appointmentResponse = await fetch(`http://127.0.0.1:8000/api/patient/appointments/${patientId}`);
                    const appointmentsData = await appointmentResponse.json();

                    allAppointments.push({ patient: patient, appointments: appointmentsData });
                }
                
                setAppointments(allAppointments);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, [navigate]);

    const filteredAppointments = allAppointments.filter(patient => {
        return patient.appointments.patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="patient-container">
            <Header />
            {userRole === 1 ? (
                <>
                    {loading ? (
                        <div className="loading-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <>
                            <br /><br />
                            <h1>Liste des patients</h1>
                            <input className="search-bar"
                                type="text" placeholder="Rechercher par nom" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
                            />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Date de Naissance</th>
                            <th>Genre</th>
                            <th>Téléphone</th>
                            <th>Prochain Rendez-Vous</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map(patient => (
                            <tr key={patient.appointments.patient.id}>
                                <td>{patient.appointments.patient.id}</td>
                                <td>{patient.appointments.patient.name}</td>
                                <td>{patient.appointments.patient.dob}</td>
                                <td>{patient.appointments.patient.gender === 1 ? 'Homme' : 'Femme'}</td>
                                <td>+33{patient.appointments.patient.phone}</td>
                                <td>{patient.appointments.appointments.date ? `${patient.appointments.appointments.date} à ${patient.appointments.appointments.time}` : 'Pas de RDV'}</td>
                                <td>
                                    <button style={{backgroundColor: 'blue'}}><Link to={`/patient/treatments/${patient.appointments.patient.id}`}>Traitements</Link></button>&nbsp;&nbsp;
                                    <button style={{backgroundColor: 'red'}}><Link to={`/patient/appointments/${patient.appointments.patient.id}`}>Rendez-vous</Link></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Les boutons doivent être situés en dehors de la balise <table> */}
                <Link to="/patients/add" className="add-patient-button">Ajouter un patient</Link>&nbsp;
                <Link to="/planning" className="patient-link">Retour au planning</Link>
                        </>
                    )}
                </>
            ) : ( // Si l'utilisateur n'a pas le rôle 1 (patient)
                <div className="unauthorized-container">
                    <h1>Accès non autorisé</h1>
                    <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
                    <Link to="/" className="back-link">Retour à la page d'accueil</Link>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Patient;