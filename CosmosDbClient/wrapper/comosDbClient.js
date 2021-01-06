const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const CONNECTION_STRING = process.env.CONNECTION_STRING || '';

const connectToCosmosDb = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING,  { useNewUrlParser: true, useUnifiedTopology: true })
        return true;
    } catch {
        return false;
    } 
}

const saveToCosmosDb = async (name, employeeId, address) => {
    try {
        let employeeRecord = new Employee({
            name,
            employeeId,
            address
        });
    
        const res = await employeeRecord.save();
        return res;
    } catch (err) {
        console.log('>> Err Saving Employee Record', err);
        return false;
    }
}

const retrieveEmployeeData = async (empName) => {
    try {
        const res = await Employee.findOne({
            name: empName
        });
        return res;
    } catch (err) {
        console.log('>> Err retrieving Employee Record', err);
        return false;
    }
}

module.exports = {
    connectToCosmosDb,
    saveToCosmosDb,
    retrieveEmployeeData
}