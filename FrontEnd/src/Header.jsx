import './Home.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <header>
        <div className="logo">
        <Link to="/">MedecinInfo</Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/rendez-vous">Rendez-vous</Link></li>
            <li><Link to="/traitements">Traitements</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
     </div> 
      )
    }
      