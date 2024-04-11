import Header from './Header.jsx';
import './Login.css';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const CheckSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            console.error('Unauthorized');
        }
    }
    catch (error) {
        console.error('Unauthorized');
    }
    
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

}
