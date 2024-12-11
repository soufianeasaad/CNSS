

function logout() {
    localStorage.removeItem("admin"); // Supprimer les infos de l'admin
    window.location.href = "../login/login.html"; // Redirection vers la page de connexion
}

// Appeler la fonction pour afficher les infos au chargement de la page
displayAdminInfo();