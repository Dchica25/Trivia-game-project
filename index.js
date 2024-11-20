document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  // Declared variable for button clicked on the Modal Window
=======
  // Variables to Get the User Name Input from the Modal form
  // const nameForm = document.getElementById("nameForm");
>>>>>>> 7b8f88b823362f2b3877d3d488b9d9ac260e8f23
  const confirmButton = document.getElementById("confirm-btn");

  // Add an Event Listener for when user submit form
  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
<<<<<<< HEAD

    // Variables to Get the User Name Input from the Modal form
=======
>>>>>>> 7b8f88b823362f2b3877d3d488b9d9ac260e8f23
    const userNameInput = document.getElementById("userName");
    const errorMessage = document.getElementById("error");
    const nameExistMessage = document.getElementById("nameExistMessage");

    const modal = document.getElementById("staticBackdrop");

    //Check if User Name is Still Empty after clicking the submit button
    const userName = userNameInput.value.trim();
    let users = localStorage.getItem("users");
    users = users ? JSON.parse(users) : [];
    if (userName === "") {
      errorMessage.style.display = "block";
      nameExistMessage.style.display = "none";
      modal.style.display = "block";
    } else if (Array.isArray(users)) {
<<<<<<< HEAD
      if(isDuplicate(userName, users)){
        errorMessage.style.display = "none";
        nameExistMessage.style.display = "block";
        modal.style.display = "block";
      }else{
        users.push(userName);
        localStorage.setItem("users", JSON.stringify(users));
        modal.style.display = "none";
        errorMessage.style.display = "none";
        nameExistMessage.style.display = "none";
        redirectPage("./scoreBoard.html");        // Use to direct user to the actual game play //
      }
      
=======
      users.push(userName);
      localStorage.setItem("users", JSON.stringify(users));
      modal.style.display = "none";
      errorMessage.style.display = "none";
      nameExistMessage.style.display = "none";
      redirectPage("./questions.html");
>>>>>>> 7b8f88b823362f2b3877d3d488b9d9ac260e8f23
    } else {
      users.push(userName);
      localStorage.setItem("users", JSON.stringify(users));
      modal.style.display = "none";
      errorMessage.style.display = "none";
      nameExistMessage.style.display = "none";
      redirectPage("./scoreBoard.html");
    } {
       
    }

    userNameInput, (value = ""); //Clear the input field
  });

<<<<<<< HEAD
  function isDuplicate(user, userGameArray) {
    for (let i = 0; i < userGameArray.length; i++) {
      if (user === userGameArray[i]) {
=======
  function hasDuplicates(user, userGameArray) {
    for (let i = 0; i < userGameArray.lenth; i++) {
      if (user === userGameArray[i + 1]) {
>>>>>>> 7b8f88b823362f2b3877d3d488b9d9ac260e8f23
        return true;
      }
    }
    return false;
  }

  function redirectPage(url) {
    location.assign(url);
  }
});
