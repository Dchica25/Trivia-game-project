document.addEventListener("DOMContentLoaded", () => {
  // Variables to Get the Game User Name Scores for Scoreboard
  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];
  const homePage = document.getElementById("homePage");
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
      correct: randomScore(),
    };
    newUser.push(gameData);

    localStorage.setItem("gameUsers", JSON.stringify(newUser));

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

    return newUser;
  };

  // Display employee data in an HTML table
  const displayGameUsers = function (gameUsersArray) {
    // Get the employee table
    const gameTable = document.querySelector("#game-table");

    // Clear the game table
    gameTable.innerHTML = "";

    // Loop through the all the game user data and create a row for each user
    gameUsersArray.forEach((user, index) => {
      const newRow = document.createElement("tr");

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
  };

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
});

// Add event listener to 'Add Employees' button
// addEmployeesBtn.addEventListener('click', trackEmployeeData);
