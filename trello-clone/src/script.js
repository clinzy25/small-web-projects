var addBtns = document.querySelectorAll('.add-btn:not(.solid)');
var saveItemBtns = document.querySelectorAll('.solid');
var addItemContainers = document.querySelectorAll('.add-container');
var addItems = document.querySelectorAll('.add-item');
// Item Lists
var itemLists = document.querySelectorAll('.drag-item-list');
var backlogList = document.getElementById('backlog-list');
var progressList = document.getElementById('progress-list');
var completeList = document.getElementById('complete-list');
var onHoldList = document.getElementById('on-hold-list');
// Items
// Initialize Arrays
var backlogListArray = [];
var progressListArray = [];
var completeListArray = [];
var onHoldListArray = [];
// Drag Functionality
// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    }
    else {
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
    }
}
getSavedColumns();
// Set localStorage Arrays
function updateSavedColumns() {
    localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
    localStorage.setItem('progressItems', JSON.stringify(progressListArray));
    localStorage.setItem('completeItems', JSON.stringify(completeListArray));
    localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}
// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
    console.log('columnEl:', columnEl);
    console.log('column:', column);
    console.log('item:', item);
    console.log('index:', index);
    // List Item
    var listEl = document.createElement('li');
    listEl.classList.add('drag-item');
}
// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once
    // Backlog Column
    // Progress Column
    // Complete Column
    // On Hold Column
    // Run getSavedColumns only once, Update Local Storage
}
//# sourceMappingURL=script.js.map