import { useEffect, useState } from 'react';
import './Planning.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ProtectedRoute from './Authentification';



    function Planning() {
        const [data, setData] = useState([]);
        const navigate = useNavigate();
      
        useEffect(() => {
          const fetchAppointments = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/api/appointments');
              const data = await response.json();
              setData(data);
            } catch (error) {
              console.error('Erreur lors de la récupération des données', error);
            }
          };
      
          fetchAppointments();
        }, []);
        return (
            <div className="planning-container">
                <Header />
                <ProtectedRoute allowedRoles={[1]}>
                <br />
                <br />
                <br />
                <h1 className='titre'>Table des rendez-vous</h1>
                <table>
                    <thead>
                        <tr>
                        <th>Nom du patient</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Commentaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(appointment => (
                        <tr key={appointment.id}>
                            <td>
                            <Link to={`/patient/appointments/${appointment.id}`} className="patient-link">
                                <b>{appointment.patient_name}</b>
                            </Link>
                            </td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.comment}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </ProtectedRoute>
                <Footer />
            </div>
        );
    }

export default Planning;