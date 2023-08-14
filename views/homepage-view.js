import homepageController from "../controllers/homepage-controller.js";

const mainContent = document.getElementById("main-content");
const cardHTML = `<h2 class="card-title">Roam Phrase</h2>
<h5>Pocket phrases on the go!</h5>
<div class="card-fields">
    <div class="group">
        <h6 class="group-label">Origin Language:</h6>
        <div class="dropdown" >
            <select class="dropdown-select" id="source-lang">
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
        </div>
    </div>
    <div class="group">
        <h6 class="group-label">Target Language:</h6>
        <div class="dropdown" >
            <select class="dropdown-select" id="target-lang">
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
        </div>
    </div>`;

let sourceLang = '';
let targetLang = '';

function showStartPage() {


    mainContent.innerHTML = "";
    mainContent.innerHTML = cardHTML;


    createStartButton();
}

function createStartButton() {
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'card-button');
    startButton.innerText = 'Start';

    startButton.onclick = function () {
        sourceLang = document.getElementById('source-lang').value;
        targetLang = document.getElementById('target-lang').value;

        if (sourceLang === targetLang) {
            return window.location.hash = '#homepage';
        }
        homepageController.loadTranslations(sourceLang, targetLang);
    }

    mainContent.appendChild(startButton);
}

export {
    showStartPage,
    sourceLang,
    targetLang
}