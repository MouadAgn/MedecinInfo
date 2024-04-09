import Header from './Header.jsx';
import './Login.css';

export default function Login() {
  return (

    <div>
    <Header />
    <div className="login-container">
      <form className="login-form">
        <h2>Connexion</h2>
        <div className="input-group">
          <label htmlFor="email">Adresse e-mail :</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      </div>
    </div>

    
  );
}


