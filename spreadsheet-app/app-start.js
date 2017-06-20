//alert(document.querySelectorAll(".input-cell"));
var selectedCell = null;

function select(event) {
  if(mouseButtonPressed(event, 1)) {
    selectCell(event.target);
    event.preventDefault();
  }
}

function showContextMenu(x, y) {
  document.getElementById("context-menu").classList.add("context-menu-display");
  document.getElementById("context-menu").classList.remove("hidden");

  if(typeof x === "number" && typeof y === "number") {
    document.getElementById("context-menu").style.left = x + "px";
    document.getElementById("context-menu").style.top = y + "px";
  }
}

function hideContextMenu() {
  document.getElementById("context-menu").classList.remove("context-menu-display");
  document.getElementById("context-menu").classList.add("hidden");
}

function actOnAllCells(action) {
  Array.prototype.forEach.call(document.querySelectorAll(".input-cell"), action);
}

function deselectAllCells() {
  actOnAllCells(function(cell) {
    cell.classList.remove("selected");
  });
}

function blurAllCells() {
  actOnAllCells(function(cell) {
    cell.blur();
  });
}

function selectCell(cell) {
  cell.classList.add("selected");
}

function mouseButtonPressed(event, index) {
  // See browser support: http://eloquentjavascript.net/14_event.html#p_fndkFYbayW
  //                    : https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
  //                    : https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which

  var buttonClickedIndex = event.buttons !== null ? event.buttons : event.which;

  return buttonClickedIndex === index;
}

/** 
* FOR ASSIGNMENT 1, REPLACE THE BELOW FUNCTIONS WITH YOUR OWN
* ALSO, ADD YOUR OWN AS DIRECTED IN THE ASSIGNMENT
**/

function getSecondFromMs(num) {
  return 0;
}

function getMinuteFromMs(num) {
  return 0;
}

function getHourFromMs(num) {
  return 0;
}

function getSecondFromDays(num) {
  return 0;
}

function getMinuteFromDays(num) {
  return 0;
}

function getHourFromDays(num) {
  return 0;
}

/** END REPLACEMENT FOR ASSIGNMENT 1 **/



function getTimeStrFromMs(num) {
  return getHourFromMs(num) + ":" + getMinuteFromMs(num) + ":" + getSecondFromMs(num);
}

function getTimeStrFromDays(num) {
  return getHourFromDays(num) + ":" + getMinuteFromDays(num) + ":" + getSecondFromDays(num);
}

function evalCell(cell) {
  if(cell.getAttribute("data-format") === "currency") {
    return "$" + cell.getAttribute("data-value");
  } 
  else if(cell.getAttribute("data-format") === "time-ms") {
    return getTimeStrFromDays(cell.getAttribute("data-value") || 0);
  }
  else if(cell.getAttribute("data-format") === "time-days") {
    return getTimeStrFromMs(cell.getAttribute("data-value") || 0);
  }
  else if(cell.getAttribute("data-format") === "date") {
    //alert(cell.getAttribute("data-value"));
    return new Date(parseInt(cell.getAttribute("data-value") || 0));
  }
  else {
    return cell.getAttribute("data-value");
  }
}

Array.prototype.forEach.call(document.querySelectorAll(".input-cell"),function(ele){ 
  ele.setAttribute("data-value", "");
  //ele.setAttribute("display-value", "");
  
  ele.addEventListener("mouseover", select);

  ele.addEventListener("blur", function(event) {
    displayValue = evalCell(event.target);
    //alert(displayValue + " " + event.target.value);
    if(displayValue != event.target.value) {
      // cell value changed
      event.target.setAttribute("data-value", event.target.value);
    }
  });

  ele.addEventListener("click", function(event){
    deselectAllCells();
    hideContextMenu();
   });

  ele.addEventListener("focus", function(event){
    //deselectAllCells();
    hideContextMenu();
  });

  ele.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    selectedCell = event.target;
    showContextMenu(event.pageX, event.pageY);
  });

  ele.addEventListener("mousemove", function(event) {
    if(mouseButtonPressed(event, 1)) {
      //alert(event.target.id);
      //event.target.blur();
      if(document.activeElement !== event.target) {
        //alert("Blur");
        //blurAllCells();
        setTimeout(blurAllCells, 100);
      }
      selectCell(event.target);
    }
  });
});

Array.prototype.forEach.call(document.querySelectorAll(".format"),function(ele){
  ele.addEventListener("click", function(event) {
    hideContextMenu();
    //alert(event.target.getAttribute("data-value"));
    if(selectedCell) {
      selectedCell.setAttribute("data-format", event.target.getAttribute("data-type"));
    }

    //selectedCell.setAttribute("display-value", evalCell(selectedCell)); 
    //selectedCell.value = selectedCell.getAttribute("display-value");
    selectedCell.value = evalCell(selectedCell);
  });
});