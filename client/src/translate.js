const LANG_NAMES = {
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
};

const SPEECH_LANG = {
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
};

export async function translateJoke(joke, lang) {
  const url =
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(joke) +
    "&langpair=en|" +
    encodeURIComponent(lang);

  const response = await fetch(url);
  const data = await response.json();
  const translated = data.responseData?.translatedText;

  if (!translated) {
    throw new Error("Could not translate the joke.");
  }

  return translated;
}

export function speakText(text, langCode = "en-US", onStart, onEnd) {
  if (!text || !window.speechSynthesis) {
    throw new Error("Read-aloud is not supported in this browser.");
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.95;
  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

export { LANG_NAMES, SPEECH_LANG };
