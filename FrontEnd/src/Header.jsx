import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
const [userRole, setUserRole] = useState(null);
const navigate = useNavigate();

useEffect(() => {
    const checkUserAuthentication = async () => {
    const userId = localStorage.getItem('id');

        // Appel API uniquement si un id est présent dans le localStorage
        if (userId)  {
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
                setUserRole(null);
                navigate('/');
            }
        } else {
                setUserRole(null);
        }
    };

        checkUserAuthentication();
    }, [navigate]);

    return (
        <div>
        <header>
            <div className="logo">
            <Link to="/">MedecinInfo</Link>
            </div>
            <nav>
            <ul>
                {userRole === 1 && (
                <>
                    <li><Link to="/patients">Patients</Link></li>
                    <li><Link to="/planning">Planning</Link></li>
                    <li><Link to="/profil">Profil</Link></li>
                </>
                )}
                {userRole === 2 && (
                <>
                    <li><Link to="/profil">Profil</Link></li>
                </>
                )}
                {userRole === null && (
                <li><Link to="/login">Login</Link></li>
                )}
            </ul>
            </nav>
        </header>
        </div>
    );
}