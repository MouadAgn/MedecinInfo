// Profile.jsx

import { useEffect, useState } from 'react';
import Header from './Header.jsx';

function Profil() {
    const [data, setUserData] = useState(null);
    // localStorage.setItem('id', 1);
    // Retrieve ID from local storage
    const storedId = localStorage.getItem('id');
    const initialId = storedId ? parseInt(storedId) : null; // Convert to number

    // useEffect to fetch user data based on ID
    useEffect(() => {
        const fetchUserData = async () => {
            if (!initialId) {
                console.error('ID utilisateur manquant dans le local storage');
                return;
            }
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${initialId}`);
                const data = await response.json();
                setUserData(data)
                // console.log(data.patient.Nom);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchUserData();
    }, [initialId]); 


    return (
        <div>
            <Header />
            <h2>Profil Utilisateur</h2>
            {data ? (
                <div>
                    <p>Nom : {data.patient.Nom}</p>
                    <p>Email : {data.patient.Email}</p>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Profil;