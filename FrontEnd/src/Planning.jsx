import { useEffect, useState } from 'react';
import './Planning.css';

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
                    <td>Nom</td>
                    <td>{appointment.Date}</td>
                    <td>{appointment.Time}</td>
                    <td>{appointment.Comment}</td>
                </tr>
            ))}
        </tbody>
    </table>
/*         <h1>Liste des rendez-vous</h1>
        <ul>
            {data && data.map(appointment => (
                <li key={appointment['@id']}>
                    <p>{appointment.Comment}</p>
                </li>
            ))}
        </ul>
    </div> */


  );
}

export default Planning;