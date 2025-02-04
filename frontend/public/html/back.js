// Ensure the DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelectorAll(".modal-action")[0]; // First button
  const logoutButton = document.querySelectorAll(".modal-action")[1]; // Second button

  // Go back to the previous page
  backButton.addEventListener("click", function () {
      window.history.back();
  });

  // Redirect to home page "/"
  logoutButton.addEventListener("click", function () {
      window.location.href = "/";
  });
});

/* --- Magic mouse effect --- */
const container = document.getElementById("magic-mouse-container"),
    cursor = document.getElementById("cursor");

// Ensure container exists before proceeding
if (!container) {
  console.error("Error: #magic-mouse-container not found.");
}

let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition,
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["245 245 245", "59 130 246"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"],
};

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const selectRandom = (items) => items[rand(0, items.length - 1)];

const px = (value) => `${value}px`;

const calcDistance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);

const appendElement = (element) => {
  if (container) {
      container.appendChild(element);
  }
};

const removeElement = (element, delay) => {
  setTimeout(() => {
      if (element.parentNode) {
          element.parentNode.removeChild(element);
      }
  }, delay);
};

const createStar = (position) => {
  if (!container) return;

  const star = document.createElement("span");
  const color = selectRandom(config.colors);

  star.className = "item fa-solid fa-circle-question";
  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.animationDuration = `${config.starAnimationDuration}ms`;

  appendElement(star);
  removeElement(star, config.starAnimationDuration);
};

const createGlowPoint = (position) => {
  if (!container) return;

  const glow = document.createElement("div");
  glow.className = "glow-point";
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow);
  removeElement(glow, config.glowDuration);
};

const createGlow = (last, current) => {
  const distance = calcDistance(last, current);
  const quantity = Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);
  const dx = (current.x - last.x) / quantity;
  const dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
      createGlowPoint({ x: last.x + dx * index, y: last.y + dy * index });
  });
};

const moveCursor = (e) => {
  cursor.style.left = px(e.clientX);
  cursor.style.top = px(e.clientY);
};

const handleOnMove = (e) => {
  const mousePosition = { x: e.clientX, y: e.clientY };

  moveCursor(e);

  const now = new Date().getTime();
  const hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;
  const hasBeenLongEnough = now - last.starTimestamp > config.minimumTimeBetweenStars;

  if (hasMovedFarEnough || hasBeenLongEnough) {
      createStar(mousePosition);
      last.starTimestamp = now;
      last.starPosition = mousePosition;
  }

  createGlow(last.mousePosition, mousePosition);
  last.mousePosition = mousePosition;
};

window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
document.body.addEventListener("mouseleave", () => {
  last.mousePosition = originPosition;
});
