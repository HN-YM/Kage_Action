const PREPARED_LANG_SET = new Set(["ja", "en"]);

let translations;
let loadLanguage = (lang) => {
    if (!PREPARED_LANG_SET.has(lang)) lang = "ja";

    fetch(`../../assets/languages/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            translations = data;
            document.querySelectorAll('[localization-key]').forEach((element) => {
                const key = element.getAttribute('localization-key');
                const translated = translations[key];
                element.innerHTML = translated;
            });
        })
        .catch(error => console.error('Error loading language file:', error));
}

window.onload = () => {
    const lang = window.navigator.language.substring(0, 2);
    loadLanguage(lang);
    console.log("loaded "+lang+" file.");
}

function _on_japanese_button_pressed(){
    lang = "ja";
    loadLanguage(lang);
}

function _on_english_button_pressed(){
    lang = "en";
    loadLanguage(lang);
}