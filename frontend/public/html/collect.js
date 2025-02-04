const images = document.getElementsByClassName("image");

let globalIndex = 0,
  last = { x: 0, y: 0 },
  isCursorOut = false,
  infinityAnimation;

const setRandomSizes = () => {
  for (let image of images) {
    const size = Math.random() * 10 + 40; 
    image.style.width = `${size}vmin`;
    image.style.height = `${size}vmin`; 
    image.style.borderRadius = "0%"; 
  }
};

setRandomSizes();

const activate = (image, x, y, zIndex) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = zIndex;

  image.dataset.status = "active";

  last = { x, y };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

const handleOnMove = (e) => {
  if (isCursorOut) return;

  if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
    const lead = images[(globalIndex + 9) % images.length], 
      tail = images[(globalIndex + 4) % images.length]; 
    activate(lead, e.clientX, e.clientY, globalIndex);

    if (tail) tail.dataset.status = "inactive";

    globalIndex++;
  }
};

const startInfinityAnimation = () => {
  let angle = Math.PI; 
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radiusX = window.innerWidth / 3; 
  const radiusY = window.innerHeight / 4; 

  for (let image of images) {
    image.style.width = "45vmin"; 
    image.style.height = "45vmin"; 
    image.style.borderRadius = "50%"; 
  }

  infinityAnimation = setInterval(() => {
    for (let i = 0; i < images.length; i++) {
      const image = images[(9 - i + images.length) % images.length]; 
      const t = angle + (i * Math.PI) / 5; 
      const x = centerX + radiusX * Math.sin(t); 
      const y = centerY + radiusY * Math.sin(2 * t); 

      const zIndex = i;

      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      image.style.zIndex = zIndex;
      image.dataset.status = "active";
    }
    angle += 0.02; 
  }, 16); 
};

const stopInfinityAnimation = () => {
  clearInterval(infinityAnimation);
};

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

document.body.addEventListener("mouseleave", () => {
  isCursorOut = true;
  stopInfinityAnimation();
  startInfinityAnimation();
});

document.body.addEventListener("mouseenter", () => {
  isCursorOut = false;
  stopInfinityAnimation();

  for (let image of images) {
    image.dataset.status = "inactive";
  }

  setRandomSizes();
});

startInfinityAnimation();
