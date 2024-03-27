const mongoose=require("mongoose");

const employeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    department: {
        type: String,
        enum: ['Tech', 'Marketing', 'Operations'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    },  
},{
    versionKey: false
});

const employeModel = mongoose.model("Employee", employeSchema);

module.exports = {
    employeModel,
};