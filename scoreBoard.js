document.addEventListener("DOMContentLoaded", () => {
  // Variables to Get the Game User Name Scores for Scoreboard
  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];
  const homePage = document.getElementById("homePage");
const correctQuestions = localStorage.getItem('userScore');
const gameItem = localStorage.getItem('gamelevel');
  homePage.addEventListener("click", () => {
    let redirectURL = "./index.html";
    url = redirectURL;
    location.assign(url);
  });

  // Collect All User Game Data
  const collectGameUsers = function () {
    // Get Data from the Local Storage
    // const gameUsers = JSON.parse(localStorage.getItem("gameUsers")) || [];
    let newUser = localStorage.getItem("gameUsers");
    newUser = newUser ? JSON.parse(newUser) : [];
    const gameLevel = ["beginner", "Intermediate", "Expert"];
    let gameData = {
      userName: users[users.length - 1],
      level: gameLevel[randomLevel()],
const gameLevel = ["Beginner", "Intermediate", "Advanced"];
let gameData = {
  userName: users[users.length - 1],
  level: gameItem,
  correct: correctQuestions,
};

    /*********************************************************************************
     * Function randomeLevel() and randomScore() is for Game Simulation Purposes Only
     *********************************************************************************/
    function randomLevel() {
      let level = Math.floor(Math.random() * gameLevel.length);
      return level;
    }

    function randomScore() {
      let score = Math.floor(Math.random() * 25 + 1);
      return score;
    }

      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;

      const userNameCell = document.createElement("td");
      userNameCell.textContent = user.userName;

      const levelCell = document.createElement("td");
      levelCell.textContent = user.level;

      const correctCell = document.createElement("td");
      correctCell.textContent = user.correct;

      newRow.appendChild(rankCell);
      newRow.appendChild(userNameCell);
      newRow.appendChild(levelCell);
      newRow.appendChild(correctCell);

      gameTable.appendChild(newRow);
    });

  const trackGameData = function () {
    const users = collectGameUsers();
    console.table(users);
    users.sort(function (a, b) {
      if (a.correct > b.correct) {
        return -1;
      } else {
        return 1;
      }
    });

    displayGameUsers(users);
  };

  trackGameData();

// Add event listener to 'Add Employees' button
// addEmployeesBtn.addEventListener('click', trackEmployeeData);
console.table(users);
