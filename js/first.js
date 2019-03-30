var joueurs = [];

function initialisation() {
    joueurs = [];
    var nombre = Number(document.getElementById('joueurs').value);
    for (var i = 0; i < nombre; i++) {
        joueurs[i] = [];
    }
    var cartes = construction();
    melange(cartes);
    distribution(cartes);
}

function construction() {
    var cartes = [];
    var enseignes = ["spades", "hearts", "clubs", "diams"]; // Spades|Piques; Hearts|Coeurs; Clubs|Trègles; Diams|Carreaux.
    var valeurs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
    for (e in enseignes) {
        var couleurCarte = (enseignes[e] == "hearts" || enseignes[e] == "diams") ? "red" : "black";
        for (v in valeurs) {
            var carte = {
                enseignes: enseignes[e],
                nombre: valeurs[v],
                couleurCarte: couleurCarte
            };
        cartes.push(carte);
        }
    }
    return cartes;
}

function melange(cartes) {
    for (var k = cartes.length - 1; k > 0; k--) {
        var valeurTemporaire = Math.floor(Math.random() * (k + 1));
        var temporaire = cartes[k];
        cartes[k] = cartes[valeurTemporaire];
        cartes[valeurTemporaire] = temporaire;
    }
    return cartes;
}

function distribution(cartes) {
    var nombreJoueur = joueurs.length;
    var chaqueJoueur = 0;
    cartes.forEach(function(cartes){
        joueurs[chaqueJoueur].push(cartes);
        chaqueJoueur++;
        if (chaqueJoueur >= nombreJoueur) {
            chaqueJoueur = 0;
        }
    });
    
    var sortie = document.getElementById('sortie');
    
    for (var i = 0; i < nombreJoueur; i++) {
        sortie.innerHTML += "<div id='ensembleJoueurEtCartes'>";
        sortie.innerHTML += "<span class='joueur'>Joueur (" + (i + 1) + ")</span>";
        for (var x = 0; x < joueurs[i].length; x++) {
            sortie.innerHTML += "<div id='ensembleCartes'>";
            var h = joueurs[i][x];
            sortie.innerHTML += "<span class='cartes' style='color:" + h.couleurCarte + "'>" + h.nombre + "&" + h.enseignes + "; </span>";
        }
        sortie.innerHTML += "</div>";
        sortie.innerHTML += "</div>";
        sortie.innerHTML += "<br>";
    }
}