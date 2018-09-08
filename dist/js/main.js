const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
const img = document.querySelector('.main-img');

let voices = [];

function getVoices() {
    voices = synth.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    })
}


getVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


function speak() {
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }

    if (textInput.value !== '') {

        img.src = 'img/equaliser-clipart.gif';
        img.style.width = '150px';
        img.style.height = '100px';

        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e => {
            console.log('Done speaking...')
            img.src = 'img/speech-1.png';
            img.style.width = '';
            img.style.height = '';
        }

        speakText.onerror = e => {
            console.error('Something went wrong...')
        }

        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);

    }
}

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
})

rate.addEventListener('change', e => rateValue.textContent = rate.value);
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

voiceSelect.addEventListener('change', e => speak());
