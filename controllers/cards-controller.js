
import { sourceLanguage } from '../services/homepage-services.js'
import { targetLanguage } from '../services/homepage-services.js'
import { sourcePhrases } from '../services/homepage-services.js'
import { translatedPhrases } from '../services/homepage-services.js'
import { initializeView } from '../views/cards-view.js'
import {resetIndex} from '../views/cards-view.js'


function init() {
    resetIndex();
    initializeView(sourceLanguage, targetLanguage, sourcePhrases, translatedPhrases);
    }

export default {
    init
}
