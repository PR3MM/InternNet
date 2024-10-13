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
            recognizeText(transcript);
            console.log('Recognized Text:', transcript);

            if (transcript.toLowerCase().includes('increase')) {
                console.log("'bigger text' command recognized");
                updateFontSize(true);
                // applyFontSize();
                output.textContent += ' - Text size increased!';
            } else if (transcript.toLowerCase().includes('decrease')) {
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
                window.location.href = "index.html";
                output.textContent += ' - Navigating to Home Page!';

            }
            else if
                (transcript.toLowerCase().includes('about')) {
                console.log("'about' command recognized");
                window.location.href = "about.html";
                output.textContent += ' - Navigating to about Page!';

            }
            // Scroll Up and Down
            else if
                (transcript.toLowerCase().includes('scroll up')) {
                console.log("'scroll up' command recognized");
                window.scrollBy(0, -200);
                output.textContent += ' - Scrolling Up!';
            }
            else if
                (transcript.toLowerCase().includes('up')) {
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
            else if
                (transcript.toLowerCase().includes('down')) {
                console.log("'scroll down' command recognized");
                window.scrollBy(0, 200);
                output.textContent += ' - Scrolling Down!';
            }
            else if
                (transcript.toLowerCase().includes('enable')) {
                console.log("'enable' command recognized");
                output.textContent += ' - Enabling Speak on Hover!';
                const hover = document.getElementById('speak-on-hover-btn');
                hover.click();

                console.log("hover")
                console.log(hover)
            }
            else if
                (transcript.toLowerCase().includes('disable')) {
                console.log("'disable' command recognized");
                output.textContent += ' - Disabling Speak on Hover!';
                const hover = document.getElementById('speak-on-hover-btn');
                hover.click();
            }
            else if
                (transcript.toLowerCase().includes('stop')) {
                console.log("'stop' command recognized");
                recognition.stop();
                // original output text which gave suggestions
                output.textContent = 'Try speaking: Scroll Up/Down, Increase/Decrease Font Size, Go to Find Work Page, Reset Zoom, Zoom In/Out, Switch to Light/Dark Mode, Enable/Disable Speech on Hover, Stop.';


            }
            else if
                (transcript.toLowerCase().includes('zoom in')) {
                console.log("'zoom in' command recognized");
                zoomIn();
                output.textContent += ' - Zooming In!';

            }
            else if
                (transcript.toLowerCase().includes('zoom out')) {
                console.log("'zoom out' command recognized");
                zoomOut();
                output.textContent += ' - Zooming Out!';
            }
            else if
                (transcript.toLowerCase().includes('reset zoom')) {
                console.log("'reset zoom' command recognized");
                resetZoom();
                output.textContent += ' - Resetting Zoom!';
            }
            else if
                (transcript.toLowerCase().includes('dark')) {
                console.log("'dark mode' command recognized");
                switchToDarkMode();
                output.textContent += ' - Switching to Dark Mode!';
            }
            else if
                (transcript.toLowerCase().includes('light')) {
                console.log("'light mode' command recognized");
                switchToLightMode();
                output.textContent += ' - Switching to Light Mode!';
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

    // ZOOM

    // Initialize a variable to keep track of zoom level
let zoomLevel = 1; // Default zoom level

// Function to zoom in
function zoomIn() {
  zoomLevel += 0.1;
  document.body.style.zoom = zoomLevel;
}

// Function to zoom out
function zoomOut() {
  zoomLevel -= 0.1;
  document.body.style.zoom = zoomLevel;
}

// Function to reset zoom
function resetZoom() {
  zoomLevel = 1;
  document.body.style.zoom = zoomLevel;
}

// Example of how to listen for commands
function handleVoiceCommand(command) {
  if (command.includes('zoom in')) {
    zoomIn();
  } else if (command.includes('zoom out')) {
    zoomOut();
  } else if (command.includes('reset zoom')) {
    resetZoom();
  }
}


// Light mode Dark mode

// Function to toggle dark mode
function switchToDarkMode() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }
  
  // Function to toggle light mode
  function switchToLightMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }


// reset suggestions after 2 seconds after text is recognized
let resetTimeout; 
    function recognizeText(text) {
        const output = document.getElementById('output');
        output.textContent = text; // Display recognized text

        // Clear any previous timeout to prevent overlapping resets
        clearTimeout(resetTimeout);

        // Reset suggestions after 2 seconds
        resetTimeout = setTimeout(() => {
            output.textContent = "Try speaking: Scroll Up/Down, Increase/Decrease Font Size, Go to Find Work Page, Reset Zoom, Zoom In/Out, Switch to Light/Dark Mode, Enable/Disable Speech on Hover, Stop.";
        }, 3000);
    }



});