// Fonction pour récupérer les données de l'API et les afficher dans le tableau
async function fetchSuiviPEC(matricule) {
    try {
        const response = await fetch(`http://localhost:9091/api/portail-cnss/suivi-pec/all/${matricule}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de récupérer les données. Veuillez vérifier le matricule.');
    }
}

// Fonction pour remplir le tableau avec les données
function populateTable(data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données

    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.assure.matricule}</td>
            <td>${item.assure.nom}</td>
            <td>${item.numeroPec}</td>
            <td>${item.dateReception}</td>
            <td>${item.montantDemende}</td>
            <td>${item.montantAccorde || '-'}</td>
            <td>${item.situationPEC}</td>
            <td>${item.dateSituattion || '/'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Ajout d'un écouteur d'événement pour le bouton "Rechercher"
document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const matricule = document.getElementById('matricule').value;
    if (matricule) {
        fetchSuiviPEC(matricule);
    } else {
        alert('Veuillez entrer un matricule.');
    }
});
