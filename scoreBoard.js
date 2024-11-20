scoreboard.js
document.addEventListener("DOMContentLoaded", () => {
  // Variables to Get the Game User Name Scores for Scoreboard
  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];
  const playAgain = document.getElementById("homePage");
  const correctQuestions = localStorage.getItem('userScore');
  const gameItem = localStorage.getItem('gamelevel');

  // Reset the gamePosted flag when the user navigates away from the page
  playAgain.addEventListener("click", () => {
    localStorage.setItem('gamePosted', false); // Reset the flag
    location.assign("./index.html");
  });

  // Collect All User Game Data
  const collectGameUsers = function () {
    // Get Data from the Local Storage
    let newUser = localStorage.getItem("gameUsers");
    newUser = newUser ? JSON.parse(newUser) : [];

    //const gameItem = localStorage.getItem('gamelevel');
    //const correctQuestions = localStorage.getItem('userScore');
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const gameData = {
      userName: users[users.length - 1], // Assuming this is the last user
      level: gameItem,
      correct: correctQuestions,
    };

    // Check if the user data already exists
    const existingUser = newUser.find(user => user.userName === gameData.userName && user.level === gameData.level);
    if (!existingUser) {
      newUser.push(gameData);
      localStorage.setItem("gameUsers", JSON.stringify(newUser)); // Save the updated list
    }

    return newUser; // Return the updated list
  };

  // Display employee data in an HTML table
  const displayGameUsers = function (gameUsersArray) {
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
    // Collect users data from collectGameUsers
    const users = collectGameUsers(); // Now this will return the updated array

    // Check if `users` is an array and contains valid data
    if (Array.isArray(users)) {
      // Sort users based on the `correct` score (assuming `correct` is a numeric property)
      users.sort(function (a, b) {
        if (a.correct > b.correct) {
          return -1; // Sort descending
        } else if (a.correct < b.correct) {
          return 1;  // Sort descending
        } else {
          return 0;  // If equal, no change
        }
      });

      // Flag to prevent repeated posting
      const gamePostedFlag = localStorage.getItem('gamePosted') || false;

      // Check if the game has already been posted
      if (!gamePostedFlag) {
        // Collect and save data to scoreboard
        trackGameData();
        // Set the flag to prevent future postings on page refresh
        localStorage.setItem('gamePosted', true);
      }

      // Display sorted users
      displayGameUsers(users);
    } else {
      console.error("Error: collectGameUsers did not return a valid array", users);
    }
  };

  // Call the function once, when the DOM content is loaded
  trackGameData();
});
