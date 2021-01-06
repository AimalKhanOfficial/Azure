const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    name: String,
    employeeId: String,
    address: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Employee', empSchema, 'EmployeesCollection');