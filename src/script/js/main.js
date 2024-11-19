const PREPARED_LANG_SET = new Set(["ja_JP", "en_US"]);

let translations;
const loadLanguage = (lang) => {
    if (!PREPARED_LANG_SET.has(lang)) lang = "ja_JP";

    fetch(`${lang}.json`)
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
    console.log("loaded "+lang+" file.")
}