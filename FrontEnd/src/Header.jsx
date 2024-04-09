import { Link } from 'react-router-dom';
import Routing from './Routing.jsx';
import './Header.css'

function Header() {
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        {/* <Link to="/patient">Patient</Link> */}
                        Patient
                    </li>
                    <li>
                        <Link to="/planning">Planning</Link>
                    </li>
                    <li>
                        Profil
                        {/* <Link to="/profil">Profil</Link> */}
                    </li>
                    <li>
                        Connexion
                        {/* <Link to="/profil">Profil</Link> */}
                    </li>
                </ul>
            </nav>
        </header>
        <Routing />
        </>
    )
}

export default Header