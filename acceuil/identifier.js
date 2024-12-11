function displayAdminInfo() {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
        const tableBody = document.querySelector("table tbody");
        tableBody.innerHTML = "";
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${admin.nom}</td>
                <td>${admin.inpe}</td>
                <td>${admin.telephone}</td>
                <td>${admin.ville}</td>
                <td>${admin.adresse}</td>
            `;
        tableBody.appendChild(row);
    } else {
        window.location.href = "index.html"; // Rediriger si aucune info n'est trouvée
    }
}

function logout() {
    localStorage.removeItem("admin"); // Supprimer les infos de l'admin
    window.location.href = "index.html"; // Redirection vers la page de connexion
}

// Appeler la fonction pour afficher les infos au chargement de la page
displayAdminInfo();
