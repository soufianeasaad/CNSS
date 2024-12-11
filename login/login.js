async function login() {
    console.log("#######ddddd###")
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //const messageDiv = document.getElementById("message");

    //messageDiv.textContent = ""; // Réinitialiser le message

    try {
        const response = await fetch("http://localhost:9091/api/portail-cnss/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const admin = await response.json();
            localStorage.setItem("admin", JSON.stringify(admin)); // Sauvegarde de l'admin dans localStorage
            
           setTimeout(() => {
                window.location.href="../acceuil/Identifier.html"; // Redirection vers la page d'accueil
            }, 500);
        } else {
            const errorMessage = await response.text();
            alert(errorMessage)
        }
    } catch (error) {
        alert("Erreur de connexion au serveur.")
    }
}

const validerBtn = document.getElementById('validerBtn');
validerBtn.addEventListener('click', function(event) {
    event.preventDefault();
    login()
}) ;


