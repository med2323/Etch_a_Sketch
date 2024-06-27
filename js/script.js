document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container'); // Grid container
    const newGridButton = document.getElementById('new-grid-button'); // New grid button
    const repeatButton = document.getElementById('repeat-button'); // Repeat button
    const saveButton = document.getElementById('save-button'); // Save button
    const colorPicker = document.getElementById('color-picker'); // Color picker input
    
    let color = '#000000'; // Default color

    // Update color on color picker change
    colorPicker.addEventListener('input', (event) => {
        color = event.target.value; // Set selected color
    });

    // Function to create a grid of given size
    function createGrid(size) {
        container.innerHTML = ''; // Clear existing grid
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Set grid columns
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Set grid rows
        for (let i = 0; i < size * size; i++) { // Loop to create grid items
            const gridItem = document.createElement('div'); // Create a grid item
            gridItem.classList.add('grid-item'); // Add class to grid item
            gridItem.addEventListener('mouseover', () => {
                gridItem.style.backgroundColor = color; // Change color on hover
            });
            container.appendChild(gridItem); // Append grid item to container
        }
    }

    // Prompt user for new grid size and create new grid
    function promptForNewGrid() {
        let size = parseInt(prompt('Enter the number of squares per side (max 16):'), 10); // Get user input
        if (isNaN(size) || size < 1 || size > 16) { // Validate input
            alert('Invalid input! Please enter a number between 1 and 16.'); // Show error message
        } else {
            createGrid(size); // Create grid with valid input
        }
    }

    // Event listeners for buttons
    newGridButton.addEventListener('click', promptForNewGrid); // New grid button click event
    repeatButton.addEventListener('click', () => createGrid(16)); // Repeat button click event
    saveButton.addEventListener('click', () => {
        // Use html2canvas to save the current sketch as an image
        html2canvas(document.getElementById('etch-a-sketch')).then(canvas => {
            const link = document.createElement('a'); // Create a link element
            link.download = 'etch-a-sketch.png'; // Set download filename
            link.href = canvas.toDataURL('image/png'); // Set image source
            link.click(); // Trigger download
        });
    });

    createGrid(16); // Create default grid on load
});
