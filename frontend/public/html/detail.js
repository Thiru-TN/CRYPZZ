window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

const createWord = (text, index) => {
  const word = document.createElement("span");
  word.innerHTML = `${text} `;
  word.classList.add("card-subtitle-word");
  word.style.transitionDelay = `${index * 40}ms`;
  return word;
};

const addWord = (element, text, index) => {
  const wordElement = createWord(text, index);
  element.appendChild(wordElement);
};

const createSubtitle = (element, text) => {
  element.innerHTML = ''; 
  text.split(" ").forEach((word, index) => addWord(element, word, index));
};

const emailSubtitle1 = document.querySelectorAll('.email-subtitle')[0];
createSubtitle(emailSubtitle1, "22BDS0002 - Student@VIT");

const experienceSubtitle1 = document.querySelectorAll('.experience-subtitle')[0];
createSubtitle(experienceSubtitle1, "AI & ML");

const availabilitySubtitle1 = document.querySelectorAll('.availability-subtitle')[0];
createSubtitle(availabilitySubtitle1, "Available for AI and Machine Learning projects.");

const emailSubtitle2 = document.querySelectorAll('.email-subtitle')[1];
createSubtitle(emailSubtitle2, "22BDS0082 - Student@VIT");

const experienceSubtitle2 = document.querySelectorAll('.experience-subtitle')[1];
createSubtitle(experienceSubtitle2, "BackEnd");

const availabilitySubtitle2 = document.querySelectorAll('.availability-subtitle')[1];
createSubtitle(availabilitySubtitle2, "Available for back-end development.");

const emailSubtitle3 = document.querySelectorAll('.email-subtitle')[2];
createSubtitle(emailSubtitle3, "22BDS0024 - Student@VIT");

const experienceSubtitle3 = document.querySelectorAll('.experience-subtitle')[2];
createSubtitle(experienceSubtitle3, "AI & ML");

const availabilitySubtitle3 = document.querySelectorAll('.availability-subtitle')[2];
createSubtitle(availabilitySubtitle3, "Available for AI-related projects.");

const emailSubtitle4 = document.querySelectorAll('.email-subtitle')[3];
createSubtitle(emailSubtitle4, "22BDS0342 - Student@VIT");

const experienceSubtitle4 = document.querySelectorAll('.experience-subtitle')[3];
createSubtitle(experienceSubtitle4, "React, TailWind");

const availabilitySubtitle4 = document.querySelectorAll('.availability-subtitle')[3];
createSubtitle(availabilitySubtitle4, "I’m a data science student with a passion for web development, Python, and using technology to solve real-world problems.");

const emailSubtitle5 = document.querySelectorAll('.email-subtitle')[4];
createSubtitle(emailSubtitle5, "22BCE0925 - Student@VIT");

const experienceSubtitle5 = document.querySelectorAll('.experience-subtitle')[4];
createSubtitle(experienceSubtitle5, "BackEnd");

const availabilitySubtitle5 = document.querySelectorAll('.availability-subtitle')[4];
createSubtitle(availabilitySubtitle5, "Open for back-end development opportunities.");
