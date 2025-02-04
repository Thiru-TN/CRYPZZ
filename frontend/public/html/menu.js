const wrapper = document.getElementById("wrapper");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const uniqueRand = (min, max, prev) => {
  let next = prev;
  
  while(prev === next) next = rand(min, max);
  
  return next;
}

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 4 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 3 }
];

let prev = 0;

setInterval(() => {
  const index = uniqueRand(0, combinations.length - 1, prev),
        combination = combinations[index];
  
  wrapper.dataset.configuration = combination.configuration;
  wrapper.dataset.roundness = combination.roundness;
  
  prev = index;
}, 3000);

// Select all the shapes
const shapes = document.querySelectorAll('.shape');

// Loop through each shape to add click event listeners
shapes.forEach(shape => {
  // Click to expand the shape
  shape.addEventListener('click', function() {
    // Add 'expanded' class to this shape to make it full screen
    this.classList.add('expanded');

    // Show the close button
    const closeButton = this.querySelector('.close-btn');
    closeButton.style.display = 'block';
  });

  // Close button functionality
  const closeButton = shape.querySelector('.close-btn');
  closeButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent triggering the shape click event
    shape.classList.remove('expanded'); // Collapse the shape
    closeButton.style.display = 'none'; // Hide the close button
  });
});
