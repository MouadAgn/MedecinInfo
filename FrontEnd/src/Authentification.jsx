import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const userId = localStorage.getItem('id');
      if (userId) {
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
          console.error('Erreur lors de la vérification de l\'utilisateur :', error);
          setUserRole(null);
          navigate('/');
        }
      } else {
        setUserRole(null);
        navigate('/');
      }
    };

    checkUserAuthentication();
  }, [navigate]);

  if (userRole === null) {
    return (
      <div className="unauthorized-container">
        <h1>Chargement...</h1>
      </div>
    );
  }

  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="unauthorized-container">
        <h1>Accès non autorisé</h1>
        <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;