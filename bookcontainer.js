$(document).ready(function(){
     $('#fixedcontainer').hide();
     // Get the modal
var modal = document.getElementById('id01');
        
// When the user clicks anywhere outside of the modal, close it

window.addEventListener("click", function(event) {
  //alert(event.target.id); 
  if (event.target == modal) {
      //alert("hii");
    modal.style.display = "none";
  }
})
var modal1 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
})
   
var modal2 = document.getElementById('id03');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
})
var modal3 = document.getElementById('id04');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
})
})

