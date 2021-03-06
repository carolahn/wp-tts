const btn = document.getElementById("tts-button");
const wrapper = btn.parentElement;
const synth = window.speechSynthesis;
let voices = [];

//

var myTimeout;
function myTimer() {
  window.speechSynthesis.pause();
  window.speechSynthesis.resume();
  myTimeout = setTimeout(myTimer, 10000);
}
//

populateVoices();

if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

btn.addEventListener("click", () => {
  let content = post_object.content;
  let toSpeak = new SpeechSynthesisUtterance(content);

  toSpeak.addEventListener("cancel", () => {});

  if (!speechSynthesis.speaking) {
    speechUtteranceChunker(
      toSpeak,
      {
        chunkLength: 160,
      },
      function () {
        // callback to execute when finishes speaking
        btn.className = "tts-button";
        wrapper.className = "tts-wrapper";
        console.log("done");
      }
    );

    btn.className = "tts-button tts-button__on-speak";
    wrapper.className = "tts-wrapper tts-wrapper__on-speak";
  } else {
    btn.className = "tts-button";
    wrapper.className = "tts-wrapper";
    speechUtteranceChunker.cancel = true;
    speechSynthesis.cancel();
  }
});

function populateVoices() {
  voices = synth.getVoices();
}

var speechUtteranceChunker = function (utt, settings, callback) {
  settings = settings || {};
  var newUtt;
  var txt =
    settings && settings.offset !== undefined
      ? utt.text.substring(settings.offset)
      : utt.text;

  if (utt.voice && utt.voice.voiceURI === "native") {
    // Not part of the spec
    newUtt = utt;
    newUtt.text = txt;
    newUtt.addEventListener("end", function () {
      if (speechUtteranceChunker.cancel) {
        speechUtteranceChunker.cancel = false;
      }
      if (callback !== undefined) {
        callback();
      }
    });
  } else {
    var chunkLength = (settings && settings.chunkLength) || 160;
    var pattRegex = new RegExp(
      "^[\\s\\S]{" +
        Math.floor(chunkLength / 2) +
        "," +
        chunkLength +
        "}[.!?,]{1}|^[\\s\\S]{1," +
        chunkLength +
        "}$|^[\\s\\S]{1," +
        chunkLength +
        "} "
    );
    var chunkArr = txt.match(pattRegex);

    if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
      // called if all text has been spoken...
      if (callback !== undefined) {
        callback();
      }
      return;
    }
    var chunk = chunkArr[0];
    newUtt = new SpeechSynthesisUtterance(chunk);
    var x;
    for (x in utt) {
      if (utt.hasOwnProperty(x) && x !== "text") {
        newUtt[x] = utt[x];
      }
    }
    newUtt.addEventListener("end", function () {
      if (speechUtteranceChunker.cancel) {
        speechUtteranceChunker.cancel = false;
        return;
      }
      settings.offset = settings.offset || 0;
      settings.offset += chunk.length - 1;
      speechUtteranceChunker(utt, settings, callback);
    });
  }

  if (settings.modifier) {
    settings.modifier(newUtt);
  }
  // console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
  //placing the speak invocation inside a callback fixes ordering and onend issues.
  setTimeout(function () {
    newUtt.voice = voices[14];

    myTimeout = setTimeout(myTimer, 10000);
    newUtt.onend = function () {
      clearTimeout(myTimeout);
    };
    speechSynthesis.speak(newUtt);
  }, 0);
};
