// Close the dropdown if the user clicks outside of it
// bind click events
document.getElementById("auditButton").onclick = auditFunc;


// hide all drowdowns
const hideAll = () => {
  Object.keys(dropdowns).forEach(dropdown => {
    toggleShowOff(document.getElementById(dropdown))
  })
}

// toggle dropdown off
const toggleShowOff = element => {
  if (element.classList.contains("show")) {
    element.classList.remove("show");
  }
};

// toggle dropdown on
const toggleShowOn = element => {
  hideAll();
  document.getElementById(element).classList.toggle("show");
  dropdowns[element] = true;
  document.getElementsByTagName("body")[0].style.height = "584px";
}

// close if you click outside of the target
document.getElementById("auditButton").onclick = function(event) {
  
  
    
    document.getElementsByTagName("body")[0].style.height = "100%";
 
};

// callback functions

function auditFunc() {
  //toggleShowOn("myDropdownAudit");
  console.log("yo mang");
}


function main() {
  var source = document.getElementById("myDropdownSelection").value;
  document.getElementById(".dropbtnSelection").innerHTML = source;
}


        
