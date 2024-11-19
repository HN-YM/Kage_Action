//用意している言語のリスト(今回は日本語(ja)と英語(en))
const PREPARED_LANG_SET = new Set(["ja", "en"]);

let translations;
const loadLanguage = (lang) => {
    //Webページを見た人の言語が用意している言語リストに無かったら、「デフォルト言語」に変更。
    //今は機械翻訳もあるので「デフォルト」を原語(日本語)にした方が良いこともあるかもしれません。
    if (!PREPARED_LANG_SET.has(lang)) lang = "ja";

    //例えば英語(en)ならen.jsonファイルを取得
    fetch(`${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            translations = data;
            //`localization-key`属性を持つタグを取得
            document.querySelectorAll('[localization-key]').forEach((element) => {
                //key、例えば"final_exam"などを取得
                const key = element.getAttribute('localization-key');
                //jsonデータからキー(e.x."final_exam")を元に"Final exam"(en)や"最終試験"(ja)を取得
                const translated = translations[key];
                element.innerHTML = translated;
            });
        })
        .catch(error => console.error('Error loading language file:', error));
}

//実際の「翻訳処理」はページのロードが終わってタグが存在してから
window.onload = () => {
    const lang = window.navigator.language.substring(0, 2);
    loadLanguage(lang);
}