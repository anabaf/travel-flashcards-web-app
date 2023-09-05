const mainContent = document.getElementById("main-content");

let sourceLang;
let targetLang;
let sourcePhrases;
let targetPhrases;
let currentCategoryIndex = 0;
let currentPhraseIndex = 0;

function initializeView(srcLang, tgtLang, srcPhrases, tgtPhrases) {
    sourceLang = srcLang;
    targetLang = tgtLang;
    sourcePhrases = srcPhrases;
    targetPhrases = tgtPhrases;
    

    showCard();
}

function showCard() {
    mainContent.innerHTML = "";
    mainContent.innerHTML = ` <h2 class="card-title">Roam Phrase</h2>
     <h5>${sourcePhrases[currentCategoryIndex].category}</h5>
    <div class="card-fields">
<div class="group">
<div class="flag">
      <div class="group-label flag-icon" id="flag">${sourceLang.flag}</div>
    </div>
      <div class="info-box">
        <p class="info-text">${sourcePhrases[currentCategoryIndex].phrases[currentPhraseIndex]}</p>
        </div>
  </div>
  <div class="group">
    <div class="flag">
    <div class="group-label flag-icon" id="flag">${targetLang.flag}</div>
    </div>
    <div class="info-box">
      <p class="info-text">${targetPhrases[currentCategoryIndex].phrases[currentPhraseIndex]}</p>
    </div>
  </div>
</div>
<div class="audio-button" id="play-button"> </div>
<div class="card-buttons" id="nav-buttons">
</div>`;

    createAudioButton();

    if (hasPrevious()) {
        createPreviousButton();
    }

    if (hasNext()) {
        createNextButton();
    }
}

function hasNext() {
    return currentCategoryIndex < sourcePhrases.length - 1 || currentPhraseIndex < sourcePhrases[currentCategoryIndex].phrases.length - 1;
}

function next() {
    if (currentPhraseIndex < sourcePhrases[currentCategoryIndex].phrases.length - 1) {
        currentPhraseIndex++;
    } else if (currentCategoryIndex < sourcePhrases.length - 1) {
        currentCategoryIndex++;
        currentPhraseIndex = 0;
    }
}

function hasPrevious() {
    return currentCategoryIndex > 0 || currentPhraseIndex > 0;
}

function previous() {
    if (currentPhraseIndex > 0) {
        currentPhraseIndex--;
    } else if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        currentPhraseIndex = sourcePhrases[currentCategoryIndex].phrases.length - 1;
    }
}

function resetIndex() {
    currentCategoryIndex = 0;
    currentPhraseIndex = 0;
}

function playAudioPhrase(language) {
    const phrase = targetPhrases[currentCategoryIndex].phrases[currentPhraseIndex];
    const voice = language;
    
    const utterance = new SpeechSynthesisUtterance(phrase);
    if (voice) {
      utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  }

function selectVoiceLang(lang) {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(voice => voice.lang.includes(lang));  
}

function createAudioButton() {
    const audioButton = document.createElement('button');
    audioButton.setAttribute('id', 'audio-button');
    audioButton.innerHTML = '<img src="./resources/audio.png" alt="Image" id="audio-img">';

    audioButton.onclick = function () {
        playAudioPhrase(selectVoiceLang(targetLang.lang));
    }

    document.getElementById('play-button').appendChild(audioButton);

}

function createNextButton() {
    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.innerText = ('Next');

    nextButton.onclick = function () {
        next();
        showCard();
    }

    document.getElementById('nav-buttons').appendChild(nextButton);
}

function createPreviousButton() {
    const previousButton = document.createElement('button');
    previousButton.classList.add('previous-button');
    previousButton.innerText = ('Previous');

    previousButton.onclick = function () {
        previous();
        showCard();
    }

    document.getElementById('nav-buttons').appendChild(previousButton);
}



export {
    initializeView,
    resetIndex
};