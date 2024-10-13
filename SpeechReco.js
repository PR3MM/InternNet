document.addEventListener('DOMContentLoaded', function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        console.log('Your browser supports speech recognition.');

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        const startBtn = document.getElementById('startBtn');
        const micIcon = startBtn.querySelector('img');
        const output = document.getElementById('output');
        let isRecognitionActive = false;

        // Font size control
        let currentFontSize = 100; // 100% is the default font size

        function updateFontSize(increase) {
            console.log("updateFontSize called with increase:", increase);
            currentFontSize += increase ? 1 : -1;
            currentFontSize = Math.max(60, Math.min(currentFontSize, 200));
            console.log("New font size:", currentFontSize + "%");

            // Apply font size change to all elements
            document.querySelectorAll('*').forEach(element => {
                element.style.fontSize = `${currentFontSize}%`;
            });
        }



        startBtn.addEventListener('click', () => {
            if (isRecognitionActive) {
                recognition.stop();
                isRecognitionActive = false;
                console.log('Voice recognition stopped.');
                micIcon.src = "https://cdn-icons-png.freepik.com/256/3288/3288805.png?ga=GA1.1.1187748767.1708226618&semt=ais_hybrid";
            } else {
                recognition.start();
                isRecognitionActive = true;
                console.log('Voice recognition started. Speak into the microphone.');
                micIcon.src = "https://cdn-icons-png.freepik.com/256/12359/12359157.png?ga=GA1.1.1187748767.1708226618&semt=ais_hybrid";
            }
        });

        recognition.addEventListener('result', (event) => {
            const transcript = event.results[event.resultIndex][0].transcript;
            output.textContent = transcript;
            console.log('Recognized Text:', transcript);

            if (transcript.toLowerCase().includes('bigger text')) {
                console.log("'bigger text' command recognized");
                updateFontSize(true);
                // applyFontSize();
                output.textContent += ' - Text size increased!';
            } else if (transcript.toLowerCase().includes('smaller text')) {
                console.log("'smaller text' command recognized");
                updateFontSize(false);
                // applyFontSize();
                output.textContent += ' - Text size decreased!';
            }
            //Navigation to other pages

            else if
                (transcript.toLowerCase().includes('find')) {
                console.log("'find' command recognized");
                window.location.href = "find.html";
                output.textContent += ' - Navigating to Find Page!';

            }
            else if
                (transcript.toLowerCase().includes('home')) {
                console.log("'home' command recognized");
                window.location.href = "home.html";
                output.textContent += ' - Navigating to Home Page!';

            }
            // Scroll Up and Down
            else if
                (transcript.toLowerCase().includes('scroll up')) {
                console.log("'scroll up' command recognized");
                window.scrollBy(0, -200);
                output.textContent += ' - Scrolling Up!';
            }
            else if
                (transcript.toLowerCase().includes('scroll down')) {
                console.log("'scroll down' command recognized");
                window.scrollBy(0, 200);
                output.textContent += ' - Scrolling Down!';
            }
        });

        recognition.addEventListener('error', (event) => {
            console.error('Speech recognition error:', event.error);
        });

        recognition.addEventListener('end', () => {
            isRecognitionActive = false;
            micIcon.src = "https://cdn-icons-png.freepik.com/256/3288/3288805.png?ga=GA1.1.1187748767.1708226618&semt=ais_hybrid";
        });

        function testVoiceCommand(command) {
            console.log("Testing voice command:", command);
            const fakeEvent = {
                results: [[{ transcript: command }]]
            };
            const customEvent = new CustomEvent('result', { detail: fakeEvent });
            Object.defineProperty(customEvent, 'results', {
                get: () => fakeEvent.results
            });
            recognition.dispatchEvent(customEvent);
        }

        // Uncomment to test:
        // testVoiceCommand("bigger text");






    } else {
        console.log('Speech recognition is not supported in this browser.');
    }
});