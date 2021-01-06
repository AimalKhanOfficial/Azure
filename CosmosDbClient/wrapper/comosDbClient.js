const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const configs = require('../configs');

const CONNECTION_STRING = configs.connectionString || process.env.CONNECTION_STRING;

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

const isObject = (empNameParam) => typeof empNameParam === 'object';
const convertToString = (empName) => isObject(empName) ? JSON.stringify(empName) : empName.toString();

//Extra comment - not needed - test
const retrieveEmployeeData = async (empName) => {
    try {
        console.log('>> findOne query name:', isObject(empName), convertToString(empName), typeof convertToString(empName));
        const res = await Employee.find({
            name: convertToString(empName)
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