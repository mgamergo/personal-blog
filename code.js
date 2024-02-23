var today = new Date();
var formattedDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

var today = new Date();
var dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' });

let counter = 0;

let userInputEle = document.getElementById('userInput');
let todaysLearning = userInputEle.value;
let saveButton = document.getElementById('saveButton');
let clearButton = document.getElementById('clearButton');
let clearAllButton = document.getElementById('clearAllButton');
let learningItemsContainer = document.getElementById('learningItemsContainer');

function getLearningHistory() {
    return JSON.parse(localStorage.getItem('storageObj')) || [];
}

function saveLearningHistory(history) {
    localStorage.setItem('storageObj', JSON.stringify(history));
}

function displayHistory(item) {
    let learningItem = document.createElement('div');
    learningItem.classList.add('learning-item')
    learningItemsContainer.appendChild(learningItem);

    let dateDay = document.createElement('p');
    dateDay.id = 'date';
    dateDay.setAttribute('style','text-decoration:underline');
    dateDay.textContent = item.date;
    learningItem.appendChild(dateDay);

    let description = document.createElement('p');
    description.id = 'description';
    description.textContent = item.todaysLearning;
    learningItem.appendChild(description);
}

function onclearButton() {
    let storageObj = getLearningHistory()
    storageObj.shift();

    while (learningItemsContainer.firstChild) {
        learningItemsContainer.removeChild(learningItemsContainer.firstChild);
    }

    for(let item of storageObj) {
        displayHistory(item);
        counter ++
    
        if(counter === 3) {
            break
        }
    }
    counter = 0;

    userInputEle.value = '';

    saveLearningHistory(storageObj);
}

function onclearAllButton() {
    localStorage.setItem('storageObj',JSON.stringify([]));
    while (learningItemsContainer.firstChild) {
        learningItemsContainer.removeChild(learningItemsContainer.firstChild);
    }
    userInputEle.value = '';
}

function onSaveButton() {
    let userInput = userInputEle.value;
    let todayObj = {};
    todayObj['date'] = formattedDate + ',' + dayOfWeek;
    todayObj['todaysLearning'] = userInput;
    let learningHistory = getLearningHistory();
    learningHistory.unshift(todayObj)
    userInput = '';

    saveLearningHistory(learningHistory);

    while(learningItemsContainer.firstChild) {
        learningItemsContainer.removeChild(learningItemsContainer.firstChild);
    }

    for(let item of learningHistory) {
        displayHistory(item);
        counter ++

        if(counter === 3) {
            break
        }
    }
    counter = 0;


}

let learningHistoryDetails = getLearningHistory()
for(let item of learningHistoryDetails) {
    displayHistory(item);
    counter ++

    if(counter === 1) {
        break
    }
}
counter = 0;

saveButton.onclick = function() {
    onSaveButton()
}

clearButton.onclick = function() {
    onclearButton()
}

clearAllButton.onclick = function() {
    onclearAllButton()
}