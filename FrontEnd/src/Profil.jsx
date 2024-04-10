import React, { Component } from "react";
import Header from "./Header";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      newPassword: "",
      isEditingPassword: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    // Récupérer les données utilisateur (ex : depuis une API)
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      // Exemple de requête pour récupérer les données utilisateur
      const response = await fetch("http://127.0.0.1:8000/api/users/${id}");
      const userData = await response.json();
      this.setState({ userData });
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditPassword = () => {
    this.setState((prevState) => ({
      isEditingPassword: !prevState.isEditingPassword,
      newPassword: "",
      errorMessage: "",
    }));
  };

  handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      // Exemple de requête pour mettre à jour le mot de passe
      await fetch("http://example.com/api/users/${id}", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: this.state.newPassword }),
      });
      // Mise à jour réussie, réinitialiser le champ du mot de passe et les messages d'erreur
      this.setState({
        newPassword: "",
        errorMessage: "",
        isEditingPassword: false,
      });
    } catch (error) {
      // Gérer les erreurs
      this.setState({ errorMessage: "Erreur lors de la mise à jour du mot de passe" });
    }
  };

  render() {
    const { userData, newPassword, isEditingPassword, errorMessage } = this.state;

    return (
      <div>
        <Header />
        <h2>Profil Utilisateur</h2>
        {userData ? (
          <div>
            <p>Nom : {userData.name}</p>
            <p>Email : {userData.email}</p>
            {isEditingPassword ? (
              <form onSubmit={this.handleSubmitPassword}>
                <label htmlFor="newPassword">Nouveau mot de passe :</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={this.handleChange}
                  required
                />
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={this.handleEditPassword}>
                  Annuler
                </button>
                {errorMessage && <p>{errorMessage}</p>}
              </form>
            ) : (
              <button onClick={this.handleEditPassword}>Modifier le mot de passe</button>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Profile;
