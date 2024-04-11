// Profile.jsx

import { useEffect, useState } from 'react';
import Header from './Header.jsx';

function Profil() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users');
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };
      
        fetchUserData();
    }, []);

    return (
        <div>
            <Header />
            <h2>Profil Utilisateur</h2>
            {userData ? (
                <div>
                    <p>Nom : {userData.Nom}</p>
                    <p>Email : {userData.Email}</p>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Profil;

// import { useEffect, useState } from 'react';
// import './Planning.css';
// import { Link } from 'react-router-dom';

// import Header from './Header.jsx';

// function Profil() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//               const response = await fetch('http://127.0.0.1:8000/api/users/${id}');
//               const data = await response.json();
//               setData(data), console.log(data);
//             } catch (error) {
//               console.error('Erreur lors de la récupération des données', error);
//               // <Link to="/error" />
//             }
//           };
      
//           fetchUserData();
//         }, []);


//         return (
//           <div>
//             <Header />
//             <h2>Profil Utilisateur</h2>
//             {userData ? (
//               <div>
//                 <p>Nom : {userData.name}</p>
//                 <p>Email : {userData.email}</p>
//                 {isEditingPassword ? (
//                   <form onSubmit={this.handleSubmitPassword}>
//                     <label htmlFor="newPassword">Nouveau mot de passe :</label>
//                     <input
//                       type="password"
//                       id="newPassword"
//                       name="newPassword"
//                       value={newPassword}
//                       onChange={this.handleChange}
//                       required
//                     />
//                     <button type="submit">Enregistrer</button>
//                     <button type="button" onClick={this.handleEditPassword}>
//                       Annuler
//                     </button>
//                     {errorMessage && <p>{errorMessage}</p>}
//                   </form>
//                 ) : (
//                   <button onClick={this.handleEditPassword}>Modifier le mot de passe</button>
//                 )}
//               </div>
//             ) : (
//               <div>Loading...</div>
//             )}
//           </div>
//         );

//   // return (
//   //   <div>
//   //       <Header />
//   //   <table>
//   //       <caption>Liste des rendez-vous</caption>
//   //       <thead>
//   //           <tr>
//   //               <th>Nom du patient</th>
//   //               <th>Date</th>
//   //               <th>Heure</th>
//   //               <th>Commentaire</th>
//   //           </tr>
//   //       </thead>
//   //       <tbody>
//   //           {data && data.map(appointment => (
//   //               <tr key={appointment.id}>
//   //                   <td><Link to={`/appointments/patient/${appointment.id}`}> {appointment.patient_name} </Link></td>
//   //                   <td>{appointment.date}</td>
//   //                   <td>{appointment.time}</td>
//   //                   <td>{appointment.comment}</td>
//   //               </tr>
//   //           ))}
//   //       </tbody>
//   //   </table>
//   //   </div>
//   // );
// }

// export default Profil;

// // import React, { Component } from "react";
// // import Header from "./Header";

// // class Profil  {
  

// //   componentDidMount() {
// //     this.fetchUserData();
// //   }

// //   fetchUserData = async () => {
// //     try {
// //       // Exemple de requête pour récupérer les données utilisateur
// //       const { id } = this.props;
// //       const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
// //       const userData = await response.json();
// //       this.setState({ userData }),console.log(userData);
// //     } catch (error) {
// //       console.error("Erreur lors de la récupération des données", error);
// //     }
// //   };

// //   handleChange = (e) => {
// //     this.setState({ [e.target.name]: e.target.value });
// //   };

// //   handleEditPassword = () => {
// //     this.setState((prevState) => ({
// //       isEditingPassword: !prevState.isEditingPassword,
// //       newPassword: "",
// //       errorMessage: "",
// //     }));
// //   };

// //   handleSubmitPassword = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Exemple de requête pour mettre à jour le mot de passe
// //       await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ newPassword: this.state.newPassword }),
// //       });
// //       // Mise à jour réussie, réinitialiser le champ du mot de passe et les messages d'erreur
// //       this.setState({
// //         newPassword: "",
// //         errorMessage: "",
// //         isEditingPassword: false,
// //       });
// //     } catch (error) {
// //       // Gérer les erreurs
// //       this.setState({ errorMessage: "Erreur lors de la mise à jour du mot de passe" });
// //     }
// //   };

// //   render() {
// //     const { userData, newPassword, isEditingPassword, errorMessage } = this.state;

  
// // export default Profil;
