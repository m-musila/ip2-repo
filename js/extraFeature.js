
const button = document.querySelector("#button");
const feedbackList = document.querySelector("#feedback-storage");

displayFeedback();

function getFeedback() {
  let name = document.getElementById("name").value; 
  let email = document.getElementById("email").value;
  let feedback = document.getElementById("feedback").value;
  let storage = localStorage.getItem("New feedback"); 

  if (storage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(storage);
  }

  listArr.push(
     "<span>" +
      "<img src = 'images/user.png'/>" +
      name +
      "<br/>" +
      email +
      "</span>" +
      "<br>" +
      feedback 
  );
  localStorage.setItem("New feedback", JSON.stringify(listArr));

  displayFeedback(); 
}

function displayFeedback() {
  let storage = localStorage.getItem("New feedback");

  if (storage == null) {
    listArr = []; 
  } else {
    listArr = JSON.parse(storage); 
  }

  let liElement = "";

  listArr.forEach((element, index) => {
    liElement += `<li> ${element} </li>`;
  });

  feedbackList.innerHTML = liElement;
}