/* eslint-disable @typescript-eslint/no-unused-vars */
const addBtns: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.add-btn:not(.solid)'
);
const saveItemBtns: NodeListOf<HTMLElement> =
    document.querySelectorAll('.solid');
const addItemContainers: NodeListOf<HTMLElement> =
    document.querySelectorAll('.add-container');
const addItems: NodeListOf<HTMLElement> =
    document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem: HTMLElement;
let currentColumn: number;
let dragging = false;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns(): void {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
    }
}

// Set localStorage Arrays
function updateSavedColumns(): void {
    listArrays = [
        backlogListArray,
        progressListArray,
        completeListArray,
        onHoldListArray,
    ];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    listArrays.map((array, index) =>
        localStorage.setItem(`${arrayNames[index]}Items`, JSON.stringify(array))
    );
}

//Filter arrays to remove empty items
function filterArray(array: Array<HTMLElement>) {
    return array.filter((item) => item !== null);
}

// Create DOM Elements for each list item
function createItemEl(
    columnEl: HTMLElement,
    column: number,
    item: string,
    index: number
): void {
    // List Item
    const listEl: HTMLLIElement = document.createElement('li');
    listEl.classList.add('drag-item');
    listEl.textContent = item;
    listEl.draggable = true;
    listEl.setAttribute('ondragstart', 'drag(event)');
    listEl.contentEditable = 'true';
    listEl.id = index.toString();
    listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
    columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM(): void {
    // Check localStorage once
    if (!updatedOnLoad) {
        getSavedColumns();
    }
    // Backlog Column
    backlogList.textContent = '';
    backlogListArray.forEach((backlogItem, index) => {
        createItemEl(backlogList, 0, backlogItem, index);
    });
    backlogListArray = filterArray(backlogListArray);
    // Progress Column
    progressList.textContent = '';
    progressListArray.forEach((progressItem, index) => {
        createItemEl(progressList, 1, progressItem, index);
    });
    progressListArray = filterArray(progressListArray);

    // Complete Column
    completeList.textContent = '';
    completeListArray.forEach((completeItem, index) => {
        createItemEl(completeList, 2, completeItem, index);
    });
    completeListArray = filterArray(completeListArray);

    // On Hold Column
    onHoldList.textContent = '';
    onHoldListArray.forEach((onHoldItem, index) => {
        createItemEl(onHoldList, 3, onHoldItem, index);
    });
    onHoldListArray = filterArray(onHoldListArray);
    // Run getSavedColumns only once, Update Local Storage
    updatedOnLoad = true;
    updateSavedColumns();
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id: string, column: number): void {
    const selectedArray = listArrays[column];
    const selectedColumnEl = listColumns[column].children;
    if (!dragging) {
        if (!selectedColumnEl[id].textContent) {
            delete selectedArray[id];
        } else {
            selectedArray[id] = selectedColumnEl[id].textContent;
        }
        updateDOM();
    }
}

// Add to Column
function addToColumn(column): void {
    const itemText = addItems[column].textContent;
    listArrays[column].push(itemText);
    addItems[column].textContent = '';
    updateDOM();
}

// Show Add Item Input Box
function showInputBox(column): void {
    addBtns[column].style.visibility = 'hidden';
    saveItemBtns[column].style.display = 'flex';
    addItemContainers[column].style.display = 'flex';
}

// Hide Item Input Box
function hideInputBox(column): void {
    addBtns[column].style.visibility = 'visible';
    saveItemBtns[column].style.display = 'none';
    addItemContainers[column].style.display = 'none';
    addToColumn(column);
}

// Add dropped items to array
function rebuildArrays(): void {
    backlogListArray = [...(backlogList.children as any)].map(
        (item) => item.textContent
    );
    progressListArray = [...(progressList.children as any)].map(
        (item) => item.textContent
    );
    completeListArray = [...(completeList.children as any)].map(
        (item) => item.textContent
    );
    onHoldListArray = [...(onHoldList.children as any)].map(
        (item) => item.textContent
    );
    updateDOM();
}

// On Drag Start
function drag(e): void {
    const target = e.target as HTMLInputElement;
    draggedItem = target;
    dragging = true;
}

// On Drag Enter Column
function dragEnter(column: number): void {
    listColumns[column].classList.add('over');
    currentColumn = column;
}

// Column allows drop
function allowDrop(e): void {
    e.preventDefault();
}

// On Drag End
function drop(e): void {
    e.preventDefault();
    listColumns.forEach((column) => {
        column.classList.remove('over');
    });
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
    rebuildArrays();
    dragging = false;
}

// On-Load
updateDOM();
