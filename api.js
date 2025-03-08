//---------- LIEN ET CLE API DU SITE----------(2)
const CLE_API = 'AIzaSyDULRvr2TN_D6MzRy_dTxg4W8rUz9UoPPY';
const URL_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CLE_API}`;
//---------- DECLARATION DES VARIABLES----------(1)
const entrerUtilisateur = document.querySelector('#message');
const discussion = document.querySelector('.discussion');
const bouttonEnvoie = document.querySelector('#btn i');
//---------- RECUPERATIONS ET ENVOIES ( METHODE FETCH)----------(6)
const generationDeReponseVenantDeIA = async (questionPrompt) => {
        try {
                const reponse = await fetch(URL_API, {
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                                "contents": [{
                                        parts: [{
                                                "text": `
                                                        - termine toutes par un emoji de l'animal rechercher
                                                        - reponds toujours en francais
                                                        - explore tous les sujets sur les animaux de compagnies et domestiques
                                                        - reformule la question avant de repondre en sauant une ligne
                                                        - tu ne reponds uniquement aux questionx liees aux animaux de compagnies,
                                                        - soit pas trop long dans tes reponses ,
                                                        - tu envoies ce message lorsque la question n'est pas en rapport avec les animaux : Mon domaine de competences tourne autour des animaux de compagnies, Merci,
                                                ${questionPrompt}`,
                                        }]
                                }]
                        })
                });
                if (!reponse.ok) {
                        throw new Error('Echec lors de la generation de la reponse');
                }
                const donnees = await reponse.json();
                let resultat = donnees.candidates[0].content.parts[0].text.trim();
                // Utilisation d'expressions régulières pour formater la réponse
                const formattedResult = resultat
                        .replaceAll(/\*\*(.*?)\*\*/g, '<strong class="formatter">$1</strong>') // Mettre en gras le texte entre **
                        .replaceAll(/\n/g, '<br>'); // Remplacer les sauts de ligne par des balises <br>
                resultatIa(formattedResult); 
        }
        catch (error) {
                console.log(error);
        }
};
//---------- REPONSE IA AFFICHER----------(7)
const resultatIa = (anwser) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'iaInfo');
        const iaOutput = document.createElement('p');
        const iaIcons = document.createElement('span');
        const fragmentIA = new DocumentFragment();
        anwser = anwser.replaceAll(/\*(.*?)\*/g, '-$1-') // Remplacer le texte entre * par des tirets
        iaOutput.innerHTML = anwser; // Utiliser innerHTML pour interpréter les balises HTML
        iaIcons.innerHTML = '<i class="fas fa-robot"></i>';
        fragmentIA.append(iaIcons, iaOutput);
        div.appendChild(fragmentIA);
        discussion.appendChild(div);
};
//---------- QUESTION  UTILISATEUR AFFICHER---------(5)
const obtenirLaQuestion = (inputMessage) => {
        const userDiv = document.createElement('div');
        userDiv.setAttribute('class', 'userInfo');
        const userInput = document.createElement('p');
        const userIcons = document.createElement('span');
        const fragmentUserMessage = new DocumentFragment();
        userInput.textContent = inputMessage;
        userIcons.innerHTML = '<i class="fas fa-user"></i>';
        fragmentUserMessage.append(userInput, userIcons);
        userDiv.appendChild(fragmentUserMessage);
        discussion.appendChild(userDiv);
}
//---------- VALIDATION ENTREE----------(4)
message.addEventListener('keydown', (e) => {
        const inputMessage = e.target.value.trim();
        if (e.key === 'Enter' && inputMessage) {
                obtenirLaQuestion(inputMessage)
                message.value = "";
                generationDeReponseVenantDeIA(inputMessage);
        }
})
//---------- VALIDATION PAR BOUTTON---------- (3)
bouttonEnvoie.addEventListener('click', () => {
        const inputMessage = message.value;
        if (inputMessage) {
                obtenirLaQuestion(inputMessage)
                message.value = "";
                generationDeReponseVenantDeIA(inputMessage);
        }

})
