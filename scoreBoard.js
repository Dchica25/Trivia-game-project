// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#homePage');

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
  const allEmployees = [];
  let addEmployee = true;

  while(addEmployee){
    const employee = {
      firstName: prompt("Enter Employee First Name"),
      lastName: prompt("Enter Employee Last Name"),
      salary: prompt("Enter Employee Salary"),
    };
      
    while(typeof employee.salary !== 'number' && !isFinite(employee.salary)){
      alert("This is not a number. Please enter a number.");
      employee.salary = prompt("Enter Employee Salary");
    }  
      
    let numSalary = Number(employee.salary);
    employee.salary = numSalary;  
      
    allEmployees.push(employee);
  
    addEmployee = confirm("Do you want to add another Employee?");
    
  }
  
  return allEmployees;

}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  let salarySum = 0;
  for(i = 0; i < employeesArray.length; i++){
    salarySum += employeesArray[i].salary;
  }
  const employeeAvg = (salarySum / employeesArray.length).toFixed(2);
  
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${employeeAvg}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  const randomEmployeeIndex = Math.floor(Math.random() * employeesArray.length);
  console.log(`Congratulations to ${employeesArray[randomEmployeeIndex].firstName} ${employeesArray[randomEmployeeIndex].lastName}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
