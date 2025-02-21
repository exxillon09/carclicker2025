let score = 0;
let level = 1;
let clickValue = 1;
let autoClickerLevel = 0;
let clickMultiplier = 1;

let upgradeSpeedCost = 50;
let upgradePowerCost = 100;
let autoClickerCost = 200;
let clickMultiplierCost = 100;

const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const upgradeSpeedButton = document.getElementById('upgrade-speed');
const upgradePowerButton = document.getElementById('upgrade-power');
const autoClickerButton = document.getElementById('upgrade-auto-clicker');
const clickMultiplierButton = document.getElementById('upgrade-click-multiplier');
const achievementsList = document.getElementById('achievements-list');
const resetProgressButton = document.getElementById('reset-progress');

const clickSound = document.getElementById('click-sound');
const upgradeSound = document.getElementById('upgrade-sound');

const achievements = {
  100: "Новичок",
  500: "Любитель",
  1000: "Профессионал",
  5000: "Мастер кликов",
};

// Клик по машине
car.addEventListener('click', () => {
  score += clickValue * clickMultiplier;
  updateScore();
  updateButtons();
  clickSound.currentTime = 0;
  clickSound.play();
  checkAchievements();
});

// Улучшение скорости
upgradeSpeedButton.addEventListener('click', () => {
  if (score >= upgradeSpeedCost) {
    score -= upgradeSpeedCost;
    clickValue += 1;
    upgradeSpeedCost *= 2;
    updateScore();
    updateButtons();
    playUpgradeSound();

    // Анимация всплывающего текста
    const rect = upgradeSpeedButton.getBoundingClientRect();
    createPopup('Скорость улучшена!', rect.left + rect.width / 2, rect.top);

    // Анимация кнопки
    animateButton(upgradeSpeedButton);
  }
});

// Улучшение мощности
upgradePowerButton.addEventListener('click', () => {
  if (score >= upgradePowerCost) {
    score -= upgradePowerCost;
    level += 1;
    upgradePowerCost *= 2;
    updateScore();
    updateButtons();
    updateCarImage();
    playUpgradeSound();

    // Анимация всплывающего текста
    const rect = upgradePowerButton.getBoundingClientRect();
    createPopup('Мощность улучшена!', rect.left + rect.width / 2, rect.top);

    // Анимация кнопки
    animateButton(upgradePowerButton);
  }
});

// Улучшение автокликера
autoClickerButton.addEventListener('click', () => {
  if (score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickerLevel += 1;
    autoClickerCost *= 2;
    updateScore();
    updateButtons();
    playUpgradeSound();

    // Анимация всплывающего текста
    const rect = autoClickerButton.getBoundingClientRect();
    createPopup('Автокликер улучшен!', rect.left + rect.width / 2, rect.top);

    // Анимация кнопки
    animateButton(autoClickerButton);
  }
});

// Улучшение скорости клика
clickMultiplierButton.addEventListener('click', () => {
  if (score >= clickMultiplierCost) {
    score -= clickMultiplierCost;
    clickMultiplier += 1;
    clickMultiplierCost *= 2;
    updateScore();
    updateButtons();
    playUpgradeSound();

    // Анимация всплывающего текста
    const rect = clickMultiplierButton.getBoundingClientRect();
    createPopup('Скорость клика улучшена!', rect.left + rect.width / 2, rect.top);

    // Анимация кнопки
    animateButton(clickMultiplierButton);
  }
});

// Автокликер
function autoClick() {
  if (autoClickerLevel > 0) {
    score += autoClickerLevel;
    updateScore();
    updateButtons();
  }
}

setInterval(autoClick, 1000);

// Обновление отображения очков и уровня
function updateScore() {
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;

  // Анимация для очков
  scoreDisplay.classList.add('animate');
  setTimeout(() => {
    scoreDisplay.classList.remove('animate');
  }, 300);
}

// Обновление состояния кнопок
function updateButtons() {
  upgradeSpeedButton.textContent = `Улучшить скорость (${upgradeSpeedCost} очков)`;
  upgradePowerButton.textContent = `Улучшить мощность (${upgradePowerCost} очков)`;
  autoClickerButton.textContent = `Купить автокликер (${autoClickerCost} очков)`;
  clickMultiplierButton.textContent = `Улучшить скорость клика (${clickMultiplierCost} очков)`;

  upgradeSpeedButton.disabled = score < upgradeSpeedCost;
  upgradePowerButton.disabled = score < upgradePowerCost;
  autoClickerButton.disabled = score < autoClickerCost;
  clickMultiplierButton.disabled = score < clickMultiplierCost;
}

// Звук улучшения
function playUpgradeSound() {
  upgradeSound.currentTime = 0;
  upgradeSound.play();
}

// Достижения
function checkAchievements() {
  for (const [points, title] of Object.entries(achievements)) {
    if (score >= points && !achievementsList.querySelector(`[data-points="${points}"]`)) {
      const achievementItem = document.createElement('li');
      achievementItem.textContent = title;
      achievementItem.setAttribute('data-points', points);
      achievementsList.appendChild(achievementItem);
    }
  }
}

// Обновление изображения машины
function updateCarImage() {
  const car = document.getElementById('car');
  let carImage;

  if (level >= 5) {
    carImage = 'images/level-5.png';
  } else if (level >= 4) {
    carImage = 'images/level-4.png';
  } else if (level >= 3) {
    carImage = 'images/level-3.png';
  } else if (level >= 2) {
    carImage = 'images/level-2.png';
  } else {
    carImage = 'images/level-1.png';
  }

  car.src = carImage;
}

// Сохранение прогресса
function saveProgress() {
  const progress = {
    score,
    level,
    clickValue,
    autoClickerLevel,
    clickMultiplier,
  };
  localStorage.setItem('carClickerProgress', JSON.stringify(progress));
}

// Загрузка прогресса
function loadProgress() {
  const savedProgress = JSON.parse(localStorage.getItem('carClickerProgress'));
  if (savedProgress) {
    score = savedProgress.score || 0;
    level = savedProgress.level || 1;
    clickValue = savedProgress.clickValue || 1;
    autoClickerLevel = savedProgress.autoClickerLevel || 0;
    clickMultiplier = savedProgress.clickMultiplier || 1;
    updateScore();
    updateButtons();
    updateCarImage();
    checkAchievements();
  }
}

// Сброс прогресса
function deleteProgress() {
  // Сбрасываем переменные
  score = 0;
  level = 1;
  clickValue = 1;
  autoClickerLevel = 0;
  clickMultiplier = 1;

  // Удаляем данные из localStorage
  localStorage.removeItem('carClickerProgress');

  // Обновляем интерфейс
  updateScore();
  updateButtons();
  updateCarImage();
  checkAchievements();
}

// Обработчик кнопки сброса прогресса
if (resetProgressButton) {
  resetProgressButton.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите сбросить прогресс? Это действие нельзя отменить.')) {
      deleteProgress();
    }
  });
} else {
  console.error('Кнопка сброса прогресса не найдена!');
}

// Автосохранение каждые 10 секунд
setInterval(saveProgress, 10000);

// Загрузка прогресса при запуске
window.onload = loadProgress;

// Функция для создания всплывающего текста
function createPopup(text, x, y) {
  const popup = document.createElement('div');
  popup.className = 'upgrade-popup';
  popup.textContent = text;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  document.body.appendChild(popup);

  // Удаляем элемент после завершения анимации
  setTimeout(() => {
    popup.remove();
  }, 1000);
}

// Функция для анимации кнопки
function animateButton(button) {
  button.classList.add('pulse-animation');

  // Убираем класс после завершения анимации
  setTimeout(() => {
    button.classList.remove('pulse-animation');
  }, 500);
}
// Клик по машине
car.addEventListener('click', () => {
    score += clickValue * clickMultiplier;
    updateScore();
    updateButtons();
    clickSound.currentTime = 0;
    clickSound.play();
    checkAchievements();
  
    // Анимация для машины
    car.style.animation = 'none'; // Сбрасываем анимацию
    setTimeout(() => {
      car.style.animation = 'press 0.2s ease-in-out';
    }, 10);
  });