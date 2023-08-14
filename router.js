import homepageController from './controllers/homepage-controller.js';
import cardsController from './controllers/cards-controller.js';

const routes = {
    home: {
        hash: '#homepage',
        controller: homepageController
    },
    cards:{
        hash: '#cards',
        controller: cardsController
    },
}

window.onhashchange = function () {
    //Object.values transforms the object into an array
    let route = Object.values(routes).find(route => route.hash === window.location.hash);

    if (!route) {
        window.location.hash = '#homepage';
        return;
    }

    route.controller.init();
}

window.location.hash = 'homepage';