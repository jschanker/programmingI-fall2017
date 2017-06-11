//alert(document.querySelectorAll(".input-cell"));
var selectedCell = null;
var changeDataVal = true;

function select(event) {
  if(event.which == 1) {
    event.target.classList.add("selected");
    event.preventDefault();
  }
}

function evalCell(cell) {
  if(cell.getAttribute("data-format") === "currency") {
    return "$" + cell.getAttribute("data-value");
  } 
  else if(cell.getAttribute("data-format") === "time") {
    //alert(cell.getAttribute("data-value"));
    return new Date(parseInt(cell.getAttribute("data-value") || 0))
  }
  else {
    return cell.getAttribute("data-value");
  }
}

Array.prototype.forEach.call(document.querySelectorAll(".input-cell"),function(ele){ 
  ele.setAttribute("data-value", "");
  
  ele.addEventListener("mouseover", select);
  ele.addEventListener("blur", function(event) {
    if(changeDataVal) {
      event.target.setAttribute("data-value", event.target.value);
    } else {
      changeDataVal = true;
    }
  });
  ele.addEventListener("click", function(event){
    event.target.classList.remove("selected");
    document.getElementById("context-menu").classList.remove("context-menu-display");
    document.getElementById("context-menu").classList.add("hidden");
   });
  ele.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    selectedCell = event.target;
    document.getElementById("context-menu").classList.add("context-menu-display");
    document.getElementById("context-menu").classList.remove("hidden");
    document.getElementById("context-menu").style.left = event.pageX +"px";
    document.getElementById("context-menu").style.top = event.pageY +"px";
  });
  ele.addEventListener("mousemove", function(event) {
    if(event.which == 1) {
        event.target.classList.add("selected");
    }
  });
});

Array.prototype.forEach.call(document.querySelectorAll(".format"),function(ele){
  ele.addEventListener("click", function(event) {
    document.getElementById("context-menu").classList.remove("context-menu-display");
    document.getElementById("context-menu").classList.add("hidden");
    //alert(event.target.getAttribute("data-value"));
    if(selectedCell) {
      selectedCell.setAttribute("data-format", event.target.getAttribute("data-type"));
      changeDataVal = false;
    }
    selectedCell.value = evalCell(selectedCell);
  });
});