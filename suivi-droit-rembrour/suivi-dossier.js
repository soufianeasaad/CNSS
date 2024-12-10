// Fonction pour récupérer les données de l'API et les afficher dans le tableau
async function fetchSuiviDossier(matricule) {
    try {
        const response = await fetch(`http://localhost:9091/api/portail-cnss/suivi-dossier/all/${matricule}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        // Appliquer le filtre de situation
        /*const filteredData = situation
            ? data.filter(item => item.situation.toLowerCase() === situation.toLowerCase())
            : data;
        console.log("-------------", filteredData)*/
        populateTable(data);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de récupérer les données. Veuillez vérifier le matricule.');
    }
}

// Fonction pour remplir le tableau avec les données
function populateTable(data) {
    const tableBody = document.getElementById('dossierTable');
    tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données

    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.assure.matricule}</td>
            <td>${item.assure.nom}</td>
            <td>${item.numero}</td>
            <td>${item.dateDepot}</td>
            <td>${item.numeroPec}</td>
            <td>${item.montantFacture || '-'}</td>
            <td>${item.dateSoin}</td>
            <td>${item.situation || '/'}</td>
            <td>${item.dateSituation}</td>
            <td>${item.commentaires}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Ajout d'un écouteur d'événement pour le bouton "Rechercher"
document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const matricule = document.getElementById('matricule').value;
    //const situation = document.querySelector('select[name="situation"]').value; 
    if (matricule) {
        fetchSuiviDossier(matricule);
    } else {
        alert('Veuillez entrer un matricule.');
    }
});
