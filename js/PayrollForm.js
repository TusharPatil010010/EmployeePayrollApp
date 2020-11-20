class EmployeePayrollData {

    get name() { return this._name; }
    set name(name) {
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else throw 'Name is incorrect!';
    }

    get id() { return this._id}
    set id(id) {
        this._id = id;
    }

    get salary() { return this._salary}
    set salary(salary) {
        this._salary = salary
    }

    get startDate() { return this._startDate}
    set startDate(startDate){
        this._startDate = startDate;
    }

    get profilePic(){ return this._gender;}
    set gender(gender){
        this._gender = gender;
    }

    get department(){ return this._departmnet;}
    set department(department){
        this._departmnet = department;
    }

    get note(){ return this._note;}
    set note(note){
        this._note = note;
    }

    toString() {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate = this.startDate === undefined ? "undefined" : 
        this.startDate.toLocaleDateString("en-US", options);
        return "id = " + this.id + ", name = " + this.name + ", gender=" +this.gender +
        ", profilePic= " + this.profilePic +", startDate=" + empDate +", note=" + this.note;      
               
    }
}

const createEmployeePayrollData = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name')
    }
    catch(e){
        setTextValue('.text-error', e);
        throw e
    }
    employeePayrollData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
    getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function(){
    output.textContent = salary.value;
});

const textError = document.querySelector('#text-error');
const name = document.querySelector('#name');
name.addEventListener('input', function(){
        if(name.value.length == 0){
        textError.textContent = "";
        return;
    }
    try{
        (new EmployeePayrollData()).name = name.value;
        textError.textContent = "";
    }catch(e){
        textError.textContent = e;
    }
});

const date = document.querySelector('#date');
const dateError = document.querySelector('.date-error');
date.addEventListener('input', function() {
    const startDate = new Date(Date.parse(getInputValueById('#day') + " " + getInputValueById('#month')+" "+getInputValueById('#year')));
    try{
        (new EmployeePayrollData()).startDate = startDate;
        dateError.textContent = "";
    }catch(e){
        dateError.textContent = e;
    }
});