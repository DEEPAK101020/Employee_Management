# Employee Management API

This API provides endpoints for managing employees, including registration, authentication, CRUD operations, and filtering/searching/pagination for employees. Below are the details of the available routes:

- [Deployment Link](https://employee-management-gamma-nine.vercel.app/)

## User Routes

### Register
- **Method:** POST
- **Endpoint:** user/register
- **Description:** Registers a new user.
- **Request Body:**
  - email: String
  - pass: String
- **Response:**
  - 200 OK
    - msg: "Hey! user You are successfully Register"
  - 400 Bad Request
    - msg: Error message

### Login
- **Method:** POST
- **Endpoint:** /user/login
- **Description:** Logs in a user.
- **Request Body:**
  - email: String
  - pass: String
- **Response:**
  - 200 OK
    - msg: "Login Successful!"
    - token: String (JWT token)
    - refresh_token: String (JWT token)
    - user: Object (User details)
  - 400 Bad Request
    - msg: "Please register first, wrong Credential" or "Wrong Password"

### Logout
- **Method:** GET
- **Endpoint:** user/logout
- **Description:** Logs out a user by adding the token to the blacklist.
- **Request Headers:**
  - Authorization: Bearer <token>
- **Response:**
  - 200 OK
    - msg: "Logged out"
  - 400 Bad Request
    - error: "err"

## Employee Routes

### Add Employee
- **Method:** POST
- **Endpoint:** employee/add
- **Description:** Adds a new employee (Admin only).
- **Request Body:**
  - name: String
  - lastname: String
  - email: String
  - salary: Number
- **Response:**
  - 200 OK
    - msg: "Employee added successfully"
    - user: Object (Employee details)
  - 500 Internal Server Error
    - error: "Internal server error"

### Delete Employee
- **Method:** DELETE
- **Endpoint:** employee/delete/:id
- **Description:** Deletes an employee by ID (Admin only).
- **Request Parameters:**
  - id: String (Employee ID)
- **Response:**
  - 200 OK
    - msg: "Employee deleted successfully"
  - 500 Internal Server Error
    - error: "Internal server error"

### Update Employee
- **Method:** PATCH
- **Endpoint:** employee/update/:id
- **Description:** Updates an employee by ID (Admin only).
- **Request Parameters:**
  - id: String (Employee ID)
- **Request Body:** Any updated fields
- **Response:**
  - 200 OK
    - msg: "Employee updated successfully"
  - 500 Internal Server Error
    - error: "Internal server error"

### Get All Employees
- **Method:** GET
- **Endpoint:** employee/alldata
- **Description:** Gets all employees with filtering, searching, and pagination (Admin only).
- **Query Parameters:**
  - page: Number (optional, default: 1)
  - limit: Number (optional, default: 10)
  - salary: Number (optional, filter employees with salary greater than or equal to this value)
  - name: String (optional, case-insensitive search by name)
- **Response:**
  - 200 OK
    - employees: Array (List of employees)
  - 500 Internal Server Error
    - error: "Internal server error"

      
##LogIn page
![Screenshot (13)](https://github.com/DEEPAK101020/Employee_Management/assets/131662969/e5d02648-4a01-4d67-8f76-0ce1735b927c)

##Dashboard

![Screenshot (14)](https://github.com/DEEPAK101020/Employee_Management/assets/131662969/948c7584-2852-41c5-b5a3-1725f30f4c80)

