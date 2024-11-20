
document.addEventListener("DOMContentLoaded", () => {
  // Variables to Get the User Name Input from the Modal form
  // const nameForm = document.getElementById("nameForm");
  const confirmButton = document.getElementById("confirm-btn");
  const userNameForm = document.getElementById("nameForm");

  // Add an Event Listener for when user submit form
  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Variables to Get the User Name Input from the Modal form
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
      if (isDuplicate(userName, users)) {   // Check if user named entered already exist //
        errorMessage.style.display = "none";
        nameExistMessage.style.display = "block";
        modal.style.display = "block";
        userNameForm.reset(); // Clear the User Name Input
      } else {
        users.push(userName);
        localStorage.setItem("users", JSON.stringify(users));
        modal.style.display = "none";
        errorMessage.style.display = "none";
        nameExistMessage.style.display = "none";
        redirectPage("./questions.html");        // Use to direct user to the actual game play //
      }
    } else {
      users.push(userName);
      localStorage.setItem("users", JSON.stringify(users));
      modal.style.display = "none";
      errorMessage.style.display = "none";
      nameExistMessage.style.display = "none";
      redirectPage("./questions.html");
    } {
    }
    userNameForm.reset();   //Clear the input field
  });

  // Checks if there are any duplicate names in the list of userGamerArray
  function isDuplicate(user, userGameArray) {
    for (let i = 0; i < userGameArray.length; i++) {
      if (user === userGameArray[i]) {
        return true;
      }
    }
    return false;
  }
  function redirectPage(url) {
    location.assign(url);
  }
});