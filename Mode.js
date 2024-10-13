document.addEventListener('DOMContentLoaded', function () {

    function switchToDarkMode() {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    }
    
    function switchToLightMode() {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  
    // Access the first button element with the class 'mode-btn'
    const modeBtn = document.getElementsByClassName('mode-btn')[0];
  
    modeBtn.addEventListener("click", () => {
      // Access the first image element with the class 'mode-img'
      const image = document.getElementsByClassName('mode-img')[0];
  
      // Check if the document body has 'light-mode' class
      if (document.body.classList.contains('light-mode')) {
        switchToDarkMode();
        image.src = "/logo/switch-on_14440428.png";  // Path to dark mode icon
      } else {
        switchToLightMode();
        image.src = "/logo/switch-off_14440433.png"; // Path to light mode icon
      }
    });
  
  });
  