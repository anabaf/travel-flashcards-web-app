const mainContent = document.getElementById("main-content");
const descriptionHTML = `<h2 class="card-title">Roam Phrase</h2>
<div class="scrollable-box">
<h5>Your Survival Language Buddy</h5>
<p>Tired of tedious language translation apps? Meet Roam Phrase, your fun and easy travel flashcards app for quick survival phrases on the go!</p>
<h5>Why Roam Phrase?</h5>
<p>Effortlessly master essential survival phrases in different languages, from greetings to directions, with interactive flashcards featuring translations.</p>
<h5>How to use:</h5>
<p>1. Pick your source and target languages.</p>
    <p>2. Explore survival categories.</p>
    <p>3. Flip through flashcards for an engaging learning experience.</p>
    <p>4. Improve pronunciation using our built-in Speech API.</p>

    <p>Roam Phrase - Your key to surviving and thriving in a foreign land! Try now for quick survival language skills on the go.</p>
</div>`;

function showAboutMePage() {
    mainContent.innerHTML = "";
    mainContent.innerHTML = descriptionHTML;
}

export{
    showAboutMePage
}