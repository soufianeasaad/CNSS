function displayAdminInfo() {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
        document.getElementById("adminInfo").innerHTML = `
            <p><strong>ID:</strong> ${admin.id}</p>
            <p><strong>Email:</strong> ${admin.email}</p>
        `;
    } else {
        window.location.href = "index.html"; // Rediriger si aucune info n'est trouvée
    }
}

function logout() {
    localStorage.removeItem("admin"); // Supprimer les infos de l'admin
    window.location.href = "../login/login.html"; // Redirection vers la page de connexion
}

// Appeler la fonction pour afficher les infos au chargement de la page
displayAdminInfo();