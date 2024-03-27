const express = require("express");
const employeerouter = express.Router();
const { employeModel } = require("../model/employ.model");

const {auth}=require("../middleware/auth")

//employeerouter.use(auth)
// Create
employeerouter.post("/add", async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;
    try {
        const newEmployee = new employeModel({
            firstName,
            lastName,
            email,
            department,
            salary
        });
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get
employeerouter.get("/allemp", async (req, res) => {
    try {
        const employees = await employeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update 
employeerouter.put("/empup/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        await employeModel.findByIdAndUpdate(id, updates);
        res.status(200).json({ message: "Employee updated successfully" });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete an employee
employeerouter.delete("/del/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await employeModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//pagination
employeerouter.get("/pagination", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        if (endIndex < (await employeModel.countDocuments().exec())) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.results = await employeModel.find().limit(limit).skip(startIndex).exec();
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Filter department
employeerouter.get("/filter", async (req, res) => {
    const { department } = req.query;
    try {
        const employees = await employeModel.find({ department });
        res.status(200).json(employees);
        console.log(employees)
    } catch (error) {
        console.error("Error filtering employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Sort on salary
employeerouter.get("/sort", async (req, res) => {
    try {
        const employees = await employeModel.find().sort({ salary: 1 }); 
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error sorting employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Search for employees based on first name
employeerouter.get("/search", async (req, res) => {
    const { firstName } = req.query;
    try {
        const employees = await employeModel.find({ firstName: { $regex: new RegExp(firstName, "i") } });
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error searching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    employeerouter
};
