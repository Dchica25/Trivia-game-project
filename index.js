document.addEventListener("DOMContentLoaded", () => {
  const myModal = document.getElementById('nameModal');
  const playButton = document.getElementById("playButton");
  const mCloseButton = document.getElementsByClassName("close-button");
  const nameForm = document.getElementById("nameForm");
  const userNameInput = document.getElementById("userName");
  

 playButton.addEventListener('click', userNameEnter);
//   userNameEnter();
  function userNameEnter(){
    myModal.style.display='block';
    // prompt('Enter a user name');

    //  gameLevelPage('./gameLevelPage.html');

  }

  function gameLevelPage(url){
      location.assign(url);

  }


//   playButton.onclick = function () {
//     myModal.style.display = 'block';
//   };

//   mCloseButton.onclick = function () {
//     myModal.style.display = 'none';
//   };

  window.onclick = function (event) {
    if (event.target === myModal) {
      myModal.style.display = 'none';
    }
  }

  nameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userName = userNameInput.ariaValueMax.trim();
    alert(`Hello, ${userName}!`);
  });

  // playButton.addEventListener('click',modal);

  function showPrompt() {
    let userInput = prompt("Please enter your name:", "Harry Potter");
    if (userInput !== null) {
      alert("Hello, " + userInput + "!");
    }
  }
});
