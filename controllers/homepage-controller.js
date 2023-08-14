import { showStartPage } from "../views/homepage-view.js";
import { initiateTranslation} from "../services/homepage-services.js";

function init() {
    showStartPage();
}

async function loadTranslations(sourceLang, targetLang) {
  await initiateTranslation(sourceLang, targetLang);
    window.location.hash = '#cards';

}

export default {
    init,
    loadTranslations
}