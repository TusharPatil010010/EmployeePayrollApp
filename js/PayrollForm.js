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

    toString() {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        return "id = " + this.id + ", name = " + this.name + ", salary = " + this.salary + 
               ", start date = " + new Date(this.startDate);
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
    employeePayrollData.startDate = Date.parse(date);
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

