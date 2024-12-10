// Fonction pour récupérer les données de l'API et les afficher dans le tableau
async function fetchSuiviPaiement(matricule) {
    try {
        const response = await fetch(`http://localhost:9091/api/portail-cnss/paiement/all/${matricule}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        viderTable();
        populateTable(data);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de récupérer les données. Veuillez vérifier le matricule.');
    }
}

async function fetchSuiviPaiementByNumDos(numDos) {
    try {
        const response = await fetch(`http://localhost:9091/api/portail-cnss/paiement/all/numDos/${numDos}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        viderTable();
        populateTable(data);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de récupérer les données. Veuillez vérifier le matricule.');
    }
}

// Fonction pour remplir le tableau avec les données
function populateTable(data) {
    const tableBody = document.getElementById('paiementTable');
    tableBody.innerHTML = ''; // Vider le tableau avant d'ajouter les nouvelles données

    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.suiviDossier.assure.matricule}</td>
            <td>${item.suiviDossier.assure.nom}</td>
            <td>${item.suiviDossier.numero}</td>
            <td>${item.montantPaye}</td>
            <td>${item.suiviPEC.numeroPEC}</td>
            <td>${item.dateSoin || '-'}</td>
            <td>${item.suiviDossier.dateDepot || '-'}</td>
            <td>${item.datePaiement || '-'}</td>
            <td>${item.situation}</td>
        `;
        tableBody.appendChild(row);
    });
}

function viderTable() {
    const tableBody = document.getElementById('paiementTable');
    tableBody.innerHTML = ''; // Vider le contenu du tableau
}


// Ajout d'un écouteur d'événement pour le bouton "Rechercher"
document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const matricule = document.getElementById('matricule').value;
    const situation = document.querySelector('select[name="situation"]').value; // Récupérer la valeur du filtre
    const numDos = document.getElementById('numDos').value; // Récupérer la valeur du filtre
    

    if (matricule) {
        fetchSuiviPaiement(matricule);
    }  else if (numDos) {
        document.getElementById('matricule').innerHTML="";
        viderTable();
        fetchSuiviPaiementByNumDos(numDos);
        
    }
    else {
        alert('Veuillez entrer un matricule ou un numDos.');
    }

    
});
