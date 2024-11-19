document.addEventListener("DOMContentLoaded", () => {
  // Variables to Get the User Name Input from the Modal form
  // const nameForm = document.getElementById("nameForm");
  const confirmButton = document.getElementById("confirm-btn");

  // Add an Event Listener for when user submit form
  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
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
      users.push(userName);
      localStorage.setItem("users", JSON.stringify(users));
      modal.style.display = "none";
      errorMessage.style.display = "none";
      nameExistMessage.style.display = "none";
      redirectPage("./questions.html");
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

  function hasDuplicates(user, userGameArray) {
    for (let i = 0; i < userGameArray.lenth; i++) {
      if (user === userGameArray[i + 1]) {
        return true;
      }
    }
    return false;
  }

  function redirectPage(url) {
    location.assign(url);
  }
});
