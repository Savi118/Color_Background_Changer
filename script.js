// Elements
const colorButtons = document.querySelectorAll('.color-btn');
const randomButton = document.getElementById('random-btn');
const resetButton = document.getElementById('reset-btn');
const currentColorSpan = document.getElementById('current-color');
const body = document.body;

// History
const historyContainer = document.querySelector('#history .swatches');
let history = [];

// Core: change color + update UI + history
function changeBackgroundColor(color) {
  const normalized = color.toLowerCase();
  body.style.backgroundColor = normalized;
  currentColorSpan.textContent = normalized;
  updateHistory(normalized);
}

// Random hex generator
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Optional RGB generator
function generateRandomColorRgb() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// History rendering
function updateHistory(color) {
  if (history[0] === color) return; // avoid same consecutive
  history.unshift(color);
  if (history.length > 5) history.pop();

  historyContainer.innerHTML = '';
  history.forEach(c => {
    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = c;
    swatch.title = c;
    swatch.addEventListener('click', () => changeBackgroundColor(c));
    historyContainer.appendChild(swatch);
  });
}

// Predefined color buttons
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedColor = button.getAttribute('data-color');
    changeBackgroundColor(selectedColor);
    button.style.transform = 'scale(0.95)';
    setTimeout(() => (button.style.transform = 'scale(1)'), 150);
  });
});

// Random button
randomButton.addEventListener('click', () => {
  changeBackgroundColor(generateRandomColor());
  randomButton.style.transform = 'rotate(360deg)';
  setTimeout(() => (randomButton.style.transform = 'rotate(0deg)'), 500);
});

// Reset button
resetButton.addEventListener('click', () => {
  changeBackgroundColor('#ffffff');
  resetButton.style.transform = 'scale(0.9)';
  setTimeout(() => (resetButton.style.transform = 'scale(1)'), 150);
});

// Keyboard shortcuts
document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if (key === 'r') {
    changeBackgroundColor(generateRandomColor());
  } else if (event.code === 'Space') {
    event.preventDefault();
    changeBackgroundColor('#ffffff');
  }
});

// Initialize UI
currentColorSpan.textContent = '#ffffff';
updateHistory('#ffffff');

// Color picker
const colorPicker = document.getElementById('color-picker');
const applyPickerBtn = document.getElementById('apply-picker');

applyPickerBtn.addEventListener('click', () => {
  changeBackgroundColor(colorPicker.value);
});

// Optional live preview while dragging the picker
// colorPicker.addEventListener('input', () => changeBackgroundColor(colorPicker.value));
