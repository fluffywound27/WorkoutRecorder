const titleOfSession = document.querySelector('#Title');
const formToRender = localStorage.getItem('formToRender');
titleOfSession.innerHTML = formToRender;

const renderingSessionInfo = JSON.parse(localStorage.getItem(formToRender));
const formBody = document.querySelector('#session-Render');

formBody.innerHTML = renderingSessionInfo.sessionHtml;

renderInputsFromSaves();

function renderInputsFromSaves() {
  const exerciseList = document.querySelectorAll('#exercise-title');
  const weightList = document.querySelectorAll('#weight-used');
  const setsList = document.querySelectorAll('#reps-per-set');

  const exercises = renderingSessionInfo.sessionExercises;
  const weights = renderingSessionInfo.sessionWeights;
  const sets = renderingSessionInfo.sessionSets;

  let i = 0;

  for (let exElem of exerciseList) {
    exElem.value = exercises[i];
    i++;
  };
  i = 0;
  for (let weElem of weightList) {
    weElem.value = weights[i];
    i++
  };
  i = 0;
  for (let setElem of setsList) {
    setElem.value = sets[i];
    i++
  };
};