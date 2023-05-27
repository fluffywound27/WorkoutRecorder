// html Elements
const mainForm = document.querySelector('#js-exercise-templates');
mainForm.innerHTML = localStorage.getItem('savedform') || '';
const sessionTitle = document.querySelector('#js-workout-title');
sessionTitle.value = localStorage.getItem('savedTitle') || '';
renderInputs();
// buttons
const addBtn = document.querySelector('#js-add-exercise');
const removeBtn = document.querySelector('#js-remove-exercise');
const saveBtn = document.querySelector('#js-save');
const saveSessionBtn = document.querySelector('#js-save-session');
//arrays
const exerciseArray = [];
const weightArray = [];
const setsArray = [];

const savedSessionLinks = JSON.parse(localStorage.getItem('savedSessionLinks')) || [];
// Event listeners
addBtn.addEventListener('click', createForm);

removeBtn.addEventListener('click', () => {
  const exerciseSec = document.querySelector('section');
  mainForm.removeChild(exerciseSec);
});
saveBtn.addEventListener('click', () => {
  localStorage.setItem('savedTitle', sessionTitle.value);
  localStorage.setItem('savedform', mainForm.innerHTML);
  saveInputInfo();
  if (mainForm.innerHTML === '') {
    alert('Nothing to save');
  } else if (sessionTitle.value === '') { //this makes sure title field is not empty
    alert('Sorry, session title needs to have a name');
  } else if (savedSessionLinks.indexOf(sessionTitle.value) === -1) { //makes sure array wont have duplicate names.
    savedSessionLinks.push(sessionTitle.value);
  } else {
    return;
  }
  localStorage.setItem('savedSessionLinks', JSON.stringify(savedSessionLinks));
  saveSessionInformation();
});
// functions 
function createForm() {
  // section
  const exerciseSec = document.createElement('section');
  mainForm.appendChild(exerciseSec);
  // exercise
  const exerciseDiv = document.createElement('div');
  exerciseDiv.innerHTML = 'Exercise';
  exerciseSec.appendChild(exerciseDiv);
  const exerciseInput = Object.assign(document.createElement('input'), {
    id: 'exercise-title',
    className: 'exercise-input',
    type: 'text',
    placeholder: 'What exercise?',
  });
  exerciseSec.appendChild(exerciseInput);
// weight
  const weightDiv = document.createElement('div');
  weightDiv.innerHTML = 'Weight';
  exerciseSec.appendChild(weightDiv);
  const weightInput = Object.assign(document.createElement('input'), {
    id: 'weight-used',
    className: 'weight-input',
    type: 'text',
    placeholder: 'What weight?',
  });
  exerciseSec.appendChild(weightInput);
  // reps
  const setsDiv = document.createElement('div');
  setsDiv.innerHTML = 'Sets';
  exerciseSec.appendChild(setsDiv);

  for (let i = 0; i < 3; i++) {
    const setInput = Object.assign(document.createElement('input'), {
      id: 'reps-per-set',
      className: 'set-input',
      type: 'text',
      placeholder: 'Reps',
    });
    exerciseSec.appendChild(setInput);
  }
};
function saveInputInfo() {
  localStorage.removeItem('saveExercises');
  localStorage.removeItem('saveWeight');
  localStorage.removeItem('saveSets');

  const exerciseList = document.querySelectorAll('#exercise-title');
  const weightList = document.querySelectorAll('#weight-used');
  const setsList = document.querySelectorAll('#reps-per-set');

  for (let exElem of exerciseList) {
    exerciseArray.push(exElem.value);
  };
  for (let weElem of weightList) {
    weightArray.push(weElem.value);
  };
  for (let setElem of setsList) {
    setsArray.push(setElem.value);
  };
  localStorage.setItem('saveExercises', JSON.stringify(exerciseArray));
  localStorage.setItem('saveWeight', JSON.stringify(weightArray));
  localStorage.setItem('saveSets', JSON.stringify(setsArray));
};

function renderInputs() {
  const exerciseList = document.querySelectorAll('#exercise-title');
  const weightList = document.querySelectorAll('#weight-used');
  const setsList = document.querySelectorAll('#reps-per-set');

  const exerciseData = JSON.parse(localStorage.getItem('saveExercises'));
  const weightData = JSON.parse(localStorage.getItem('saveWeight'));
  const setsData = JSON.parse(localStorage.getItem('saveSets'));

  let i = 0;

  for (let exElem of exerciseList) {
    exElem.value = exerciseData[i];
    i++;
  };
  i = 0;
  for (let weElem of weightList) {
    weElem.value = weightData[i];
    i++
  };
  i = 0;
  for (let setElem of setsList) {
    setElem.value = setsData[i];
    i++
  };
};

const savedRecordsArr = [];

function saveSessionInformation() {
  const workoutSessionData = {
    sessionHtml: '',
    sessionExercises: [],
    sessionWeights: [],
    sessionSets: []
  };

  workoutSessionData.sessionHtml = mainForm.innerHTML;

  const exerciseList = document.querySelectorAll('#exercise-title');
  const weightList = document.querySelectorAll('#weight-used');
  const setsList = document.querySelectorAll('#reps-per-set');

  for (let exElems of exerciseList) {
    workoutSessionData.sessionExercises.push(exElems.value);
  };
  for (let weElems of weightList) {
    workoutSessionData.sessionWeights.push(weElems.value);
  };
  for (let seElems of setsList) {
    workoutSessionData.sessionSets.push(seElems.value);
  };
  localStorage.setItem(`${sessionTitle.value}`, JSON.stringify(workoutSessionData));
}