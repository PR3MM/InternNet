document.addEventListener('DOMContentLoaded', function () {

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

    const plus  = document.getElementById('font-size-increase');
    const minus = document.getElementById('font-size-decrease');

    plus.addEventListener('click', () => {
        updateFontSize(true);
    });
    
    minus.addEventListener('click', () => {
        updateFontSize(false);
    });

    

});