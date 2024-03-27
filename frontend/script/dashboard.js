const url = 'https://employee-management-7nvy.onrender.com/';


// Function to fetch all employees with pagination
async function fetchEmployees() {
  try {
    const response = await fetch(`${url}employee/pagination`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    console.log(data.results)
    return data.results;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
}


// Example usage:
async function loadEmployees() {
    try {
      const employees = await fetchEmployees();
      const tableBody = document.getElementById('employeeList');
      tableBody.innerHTML = ''; 
      employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.email}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
          
          <td>
            <button class="editBtn" data-id="${employee._id}">Edit</button>
            <button class="deleteBtn" data-id="${employee._id}" onClick="deleteEmployee('${employee._id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      // Handle error
      console.error('Error loading employees:', error);
    }
  }

// page loads

async function deleteEmployee(employeeId) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}employee/del/${employeeId}`, {
            method: "DELETE",

        });
        const data = await response.json();
        if (response.ok) {
            console.log(data.results);
            
            loadEmployees();
        } else {
            console.error("Error:", data.results);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


        document.addEventListener('DOMContentLoaded', loadEmployees);