var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/* eslint-disable @typescript-eslint/no-unused-vars */
var addBtns = document.querySelectorAll('.add-btn:not(.solid)');
var saveItemBtns = document.querySelectorAll('.solid');
var addItemContainers = document.querySelectorAll('.add-container');
var addItems = document.querySelectorAll('.add-item');
// Item Lists
var listColumns = document.querySelectorAll('.drag-item-list');
var backlogList = document.getElementById('backlog-list');
var progressList = document.getElementById('progress-list');
var completeList = document.getElementById('complete-list');
var onHoldList = document.getElementById('on-hold-list');
// Items
var updatedOnLoad = false;
// Initialize Arrays
var backlogListArray = [];
var progressListArray = [];
var completeListArray = [];
var onHoldListArray = [];
var listArrays = [];
// Drag Functionality
var draggedItem;
var currentColumn;
var dragging = false;
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
// Set localStorage Arrays
function updateSavedColumns() {
    listArrays = [
        backlogListArray,
        progressListArray,
        completeListArray,
        onHoldListArray,
    ];
    var arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    listArrays.map(function (array, index) {
        return localStorage.setItem(arrayNames[index] + "Items", JSON.stringify(array));
    });
}
//Filter arrays to remove empty items
function filterArray(array) {
    return array.filter(function (item) { return item !== null; });
}
// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
    // List Item
    var listEl = document.createElement('li');
    listEl.classList.add('drag-item');
    listEl.textContent = item;
    listEl.draggable = true;
    listEl.setAttribute('ondragstart', 'drag(event)');
    listEl.contentEditable = 'true';
    listEl.id = index.toString();
    listEl.setAttribute('onfocusout', "updateItem(" + index + ", " + column + ")");
    columnEl.appendChild(listEl);
}
// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once
    if (!updatedOnLoad) {
        getSavedColumns();
    }
    // Backlog Column
    backlogList.textContent = '';
    backlogListArray.forEach(function (backlogItem, index) {
        createItemEl(backlogList, 0, backlogItem, index);
    });
    backlogListArray = filterArray(backlogListArray);
    // Progress Column
    progressList.textContent = '';
    progressListArray.forEach(function (progressItem, index) {
        createItemEl(progressList, 1, progressItem, index);
    });
    progressListArray = filterArray(progressListArray);
    // Complete Column
    completeList.textContent = '';
    completeListArray.forEach(function (completeItem, index) {
        createItemEl(completeList, 2, completeItem, index);
    });
    completeListArray = filterArray(completeListArray);
    // On Hold Column
    onHoldList.textContent = '';
    onHoldListArray.forEach(function (onHoldItem, index) {
        createItemEl(onHoldList, 3, onHoldItem, index);
    });
    onHoldListArray = filterArray(onHoldListArray);
    // Run getSavedColumns only once, Update Local Storage
    updatedOnLoad = true;
    updateSavedColumns();
}
// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
    var selectedArray = listArrays[column];
    var selectedColumnEl = listColumns[column].children;
    if (!dragging) {
        if (!selectedColumnEl[id].textContent) {
            delete selectedArray[id];
        }
        else {
            selectedArray[id] = selectedColumnEl[id].textContent;
        }
        updateDOM();
    }
}
// Add to Column
function addToColumn(column) {
    var itemText = addItems[column].textContent;
    listArrays[column].push(itemText);
    addItems[column].textContent = '';
    updateDOM();
}
// Show Add Item Input Box
function showInputBox(column) {
    addBtns[column].style.visibility = 'hidden';
    saveItemBtns[column].style.display = 'flex';
    addItemContainers[column].style.display = 'flex';
}
// Hide Item Input Box
function hideInputBox(column) {
    addBtns[column].style.visibility = 'visible';
    saveItemBtns[column].style.display = 'none';
    addItemContainers[column].style.display = 'none';
    addToColumn(column);
}
// Add dropped items to array
function rebuildArrays() {
    backlogListArray = __spreadArray([], backlogList.children).map(function (item) { return item.textContent; });
    progressListArray = __spreadArray([], progressList.children).map(function (item) { return item.textContent; });
    completeListArray = __spreadArray([], completeList.children).map(function (item) { return item.textContent; });
    onHoldListArray = __spreadArray([], onHoldList.children).map(function (item) { return item.textContent; });
    updateDOM();
}
// On Drag Start
function drag(e) {
    var target = e.target;
    draggedItem = target;
    dragging = true;
}
// On Drag Enter Column
function dragEnter(column) {
    listColumns[column].classList.add('over');
    currentColumn = column;
}
// Column allows drop
function allowDrop(e) {
    e.preventDefault();
}
// On Drag End
function drop(e) {
    e.preventDefault();
    listColumns.forEach(function (column) {
        column.classList.remove('over');
    });
    var parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
    rebuildArrays();
    dragging = false;
}
// On-Load
updateDOM();
//# sourceMappingURL=script.js.map