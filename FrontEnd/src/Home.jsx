import './Home.css';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import Footer from './Footer.jsx';

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
      <Footer />
    </div>
  );
}
