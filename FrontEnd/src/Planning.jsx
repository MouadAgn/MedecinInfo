import { useEffect, useState } from 'react';
import './Planning.css';
import { Link } from 'react-router-dom';

import Header from './Header.jsx';

function Planning() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8000/api/appointments');
              const data = await response.json();
              setData(data), console.log(data);
            } catch (error) {
              console.error('Erreur lors de la récupération des données', error);
              // <Link to="/error" />
            }
          };
      
          fetchAppointments();
        }, []);

  return (
    <div>
        <Header />
    <table>
        <caption>Liste des rendez-vous</caption>
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
                <tr key={appointment['@id']}>
                    <td>{appointment.patient}</td>
                    <td>{appointment.Date}</td>
                    <td>{appointment.Time}</td>
                    <td>{appointment.Comment}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

export default Planning;