let speechSynthesis = window.speechSynthesis;
let speaking = false;
let lastSpokenWord = '';

function speakWord(word) {
  if (!speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }

  if (word === lastSpokenWord) {
    return;
  }

  if (speaking) {
    speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US'; 
  utterance.rate = 1; 
  utterance.pitch = 1; 

  utterance.onstart = () => {
    speaking = true;
  };

  utterance.onend = () => {
    speaking = false;
    lastSpokenWord = word;
  };

  speechSynthesis.speak(utterance);
}

function handleMouseMove(event) {
  const element = document.elementFromPoint(event.clientX, event.clientY);
  if (element && element.textContent) {
    const word = element.textContent.trim();
    if (word) {
      speakWord(word);
    }
  }
}

let speakOnHoverEnabled = false;

function toggleSpeakOnHover() {
  speakOnHoverEnabled = !speakOnHoverEnabled;
  const button = document.getElementById('speak-on-hover-btn');
  
  if (speakOnHoverEnabled) {
    document.addEventListener('mousemove', handleMouseMove);
    button.textContent = 'Disable Speak on Hover';
    button.classList.add('active');
  } else {
    document.removeEventListener('mousemove', handleMouseMove);
    button.textContent = 'Enable Speak on Hover';
    button.classList.remove('active');
    if (speaking) {
      speechSynthesis.cancel();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('speak-on-hover-btn');
  button.textContent = 'Enable Speak on Hover';
});