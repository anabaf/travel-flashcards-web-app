const API_KEY = process.env.API_KEY;
const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`

let sourceLanguage = {
    lang: '',
    flag: '',
};
let targetLanguage = {
    lang: '',
    flag: '',
};

const languages = [
    {
        lang: 'en',
        flag: '🇬🇧'
    },
    {
        lang: 'es',
        flag: '🇪🇸'
    },
    {
        lang: 'pt',
        flag: '🇵🇹'
    },
    {
        lang: 'fr',
        flag: '🇫🇷'
    }
]
const phrasesDB = [
    {
        category: 'Greetings',
        phrases: ['Hello!', 'How are you?', 'Goodbye']
    },
    {
        category: 'Common Phrases',
        phrases: ['Yes', 'No', 'Thank you', 'Sorry', "I don't understand"]
    },
    {
        category: 'Getting Around',
        phrases: ['Where is...?', 'How much does it cost?']
    },
    {
        category: 'Eating and Drinking',
        phrases: ['Water', 'Food', 'Menu', 'Bill, please']
    },
    {
        category: 'Emergency Situations',
        phrases: ['Help', 'Police', 'Hospital', "I'm lost"]
    }
]

let sourcePhrases = [];

let translatedPhrases = [];


async function translatePhrase(phrase, sourceLanguage, targetLanguage) {
    const requestTranslation = {
        q: phrase,
        source: sourceLanguage,
        target: targetLanguage,
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestTranslation),
    });

    const translatedData = await response.json();
    return translatedData.data.translations[0].translatedText;
}

async function initiateTranslation(sourceLang, targetLang) {
    sourceLanguage.lang = sourceLang;
    sourceLanguage.flag = languages.find(language => language.lang === sourceLang).flag;

    targetLanguage.lang = targetLang;
    targetLanguage.flag = languages.find(language => language.lang === targetLang).flag;

    sourcePhrases = [];
    translatedPhrases = [];

    for (let i = 0; i < phrasesDB.length; i++) {
        if (sourceLang === 'en') {
            sourcePhrases.push({
                category: phrasesDB[i].category,
                phrases: phrasesDB[i].phrases
            });
        } else {
            const translatedSourcePhrases = await Promise.all(phrasesDB[i].phrases.map(phrase => translatePhrase(phrase, 'en', sourceLang)));
            sourcePhrases.push({
                category: await translatePhrase(phrasesDB[i].category, 'en', sourceLang),
                phrases: translatedSourcePhrases
            });
        }

        if (targetLang === 'en') {
            translatedPhrases.push({
                category: phrasesDB[i].category,
                phrases: phrasesDB[i].phrases
            });
        } else {
            const translatedTargetPhrases = await Promise.all(phrasesDB[i].phrases.map(phrase => translatePhrase(phrase, 'en', targetLang)));
            translatedPhrases.push({
                category: phrasesDB[i].category,
                phrases: translatedTargetPhrases
            });
        }
    }
}


export {
    sourcePhrases,
    translatedPhrases,
    sourceLanguage,
    targetLanguage,
    initiateTranslation
}
