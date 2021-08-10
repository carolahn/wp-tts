const btn = document.getElementById("btn-speak");
// const txtin = document.getElementById("text-input");
// const voiceList = document.getElementById("voiceList");
const synth = window.speechSynthesis;
let voices = [];

populateVoices();

if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

btn.addEventListener("click", () => {
  console.log("clicou");
  let content = post_object.content;
  console.log(content);
  let toSpeak = new SpeechSynthesisUtterance(content);
  //   let toSpeak = new SpeechSynthesisUtterance(content);
  //   let selectedVoiceName = voiceList.selectedOptions[0].getAttribute(
  //     "data-name"
  //   );
  //   voices.forEach((voice) => {
  //     if (voice.name === selectedVoiceName) {
  //       toSpeak.voice = voice;
  //     }
  //   });
  toSpeak.voice = voices[14];
  toSpeak.lang = "pt-BR";
  synth.speak(toSpeak);
});

function populateVoices() {
  voices = synth.getVoices();
  //   voiceList.innerHTML = "";
  //   voices.forEach((voice) => {
  //     let listItem = document.createElement("option");
  //     listItem.textContent = voice.name;
  //     listItem.setAttribute("data-lang", voice.lang);
  //     listItem.setAttribute("data-name", voice.name);
  //     voiceList.appendChild(listItem);
  //   });
}
