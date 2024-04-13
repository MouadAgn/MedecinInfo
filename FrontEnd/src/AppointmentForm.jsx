import Header from "./Header";
import Footer from "./Footer";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const AppointmentForm = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/appointments/add/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    date,
                    time,
                    comment
                })
            });

            if(response.ok) {
                navigate(`/patient/appointments/${id}`)
            } else {
                console.error('Erreur lors de l\'ajout du rendez-vous:', await response.json());
            }
        } catch {
            console.error(error);
        }


        
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date :</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Heure :</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment">Commentaire :</label>
                    <input
                        type="text"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
            <Footer />
        </div>
    )
}

export default AppointmentForm