import './Home.css';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>    

        <Header />

      <section className="hero">
        <div className="hero-content">
          <h1>Prenez soin de vos patients avec MedecinInfo</h1>
          <p>Une solution complète pour la gestion de vos patients, rendez-vous et traitements.</p>
          <Link to="#" className="btn">Commencer</Link>
        </div>
      </section>
      <footer>
        <p>&copy; 2024 MedecinInfo. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
