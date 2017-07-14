let selectedCell = null;

let selectCell = cell => {
  cell.classList.add("selected");
};

let select = event => {
  if(mouseButtonPressed(event, 1)) {
    selectCell(event.target);
    event.preventDefault();
  }
};

/**
* Make the context menu appear and set the position of its top left corner to be the clicked location
**/

let showContextMenu = (x, y) => {
  document.getElementById("context-menu").classList.add("context-menu-display");
  document.getElementById("context-menu").classList.remove("hidden");

  if(typeof x === "number" && typeof y === "number") {
    document.getElementById("context-menu").style.left = x + "px";
    document.getElementById("context-menu").style.top = y + "px";
  }
};

let hideContextMenu = () => {
  document.getElementById("context-menu").classList.remove("context-menu-display");
  document.getElementById("context-menu").classList.add("hidden");
};

/**
* Perform the action function on all input cells
**/

let actOnAllCells = action => {
  Array.prototype.forEach.call(document.querySelectorAll(".input-cell"), action);
};

let deselectAllCells = () => {
  actOnAllCells(cell => {
    cell.classList.remove("selected");
  });
};

let blurAllCells = () => {
  actOnAllCells(cell => {
    cell.blur();
  });
};

let mouseButtonPressed = (event, index) => {
  // See browser support: http://eloquentjavascript.net/14_event.html#p_fndkFYbayW
  //                    : https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
  //                    : https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which

  var buttonClickedIndex = event.buttons !== null ? event.buttons : event.which;

  return buttonClickedIndex === index;
};

/** 
* FOR ASSIGNMENT 2, ADD YOUR OWN FUNCTION DEFINITIONS AS DIRECTED IN THE ASSIGNMENT
* THEN USING THESE FUNCTIONS, REPLACE THE 0 IN EACH FUNCTION DEFINITION BELOW WITH THE APPROPRIATE OUTPUT 
**/

let getSecondFromMs   = num => 0;
let getMinuteFromMs   = num => 0;
let getHourFromMs     = num => 0;

let getSecondFromDays = num => 0;
let getMinuteFromDays = num => 0;
let getHourFromDays   = num => 0;

/** END REPLACEMENT FOR ASSIGNMENT 2 **/

let getTimeStrFromMs   = num => getHourFromMs(num) + ":" + getMinuteFromMs(num) + ":" + getSecondFromMs(num);
let getTimeStrFromDays = num => getHourFromDays(num) + ":" + getMinuteFromDays(num) + ":" + getSecondFromDays(num);

let formatCellValue = (format, value) => {
  if(format === "currency") {
    return "$" + value;
  } 
  else if(format === "time-ms") {
    return getTimeStrFromDays(value || 0);
  }
  else if(format === "time-days") {
    return getTimeStrFromMs(value || 0);
  }
  else if(format === "date") {
    return new Date(parseInt(value || 0));
  }
  else {
    return value;
  }
};

let evalCell = cell => {
  let rawValue = cell.getAttribute("data-value"); // unformatted user input

  return formatCellValue(cell.getAttribute("data-format"), rawValue);
};

Array.prototype.forEach.call(document.querySelectorAll(".input-cell"), ele => { 
  ele.setAttribute("data-value", "");
  
  ele.addEventListener("mouseover", select);

  ele.addEventListener("blur", event => {
    displayValue = evalCell(event.target);

    if(displayValue != event.target.value) {
      // cell value changed
      event.target.setAttribute("data-value", event.target.value);
    }
  });

  ele.addEventListener("click", event => {
    deselectAllCells();
    hideContextMenu();
  });

  ele.addEventListener("focus", event => {
    hideContextMenu();
  });

  ele.addEventListener("contextmenu", event => {
    event.preventDefault();
    selectedCell = event.target;
    showContextMenu(event.pageX, event.pageY);
  });

  ele.addEventListener("mousemove", event => {
    if(mouseButtonPressed(event, 1)) {
      if(document.activeElement !== event.target) {
        setTimeout(blurAllCells, 100);
      }
      selectCell(event.target);
    }
  });
});

/**
* When the user clicks on any format option in the context menu, hide the menu
* and set the selected cell's data format to be the clicked option;
* then update that cell's display value so that it appears in the new format
**/ 

Array.prototype.forEach.call(document.querySelectorAll(".format"), ele => {
  ele.addEventListener("click", event => {
    hideContextMenu();

    if(selectedCell) {
      selectedCell.setAttribute("data-format", event.target.getAttribute("data-type"));
    }

    selectedCell.value = evalCell(selectedCell);
  });
});