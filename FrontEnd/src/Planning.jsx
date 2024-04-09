import { useEffect, useState } from 'react';
import './Planning.css';

import Header from './Header.jsx';

function Planning() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/appointments')
            .then(response => response.json())
            .then(data => {
                const formattedAppointments = data['hydra:member'].map(appointment => {
                    const date = new Date(appointment.Date);
                    const time = new Date(appointment.Time);
                    return {
                        ...appointment,
                        Date: date.toISOString().slice(0, 10),
                        Time: time.toISOString().slice(11, 19)
                    };
                });
                setData(formattedAppointments);
            });
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