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
    
    get profilePic(){ return this._profilePic; }
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }
    get gender(){ return this._gender; }
    set gender(gender){
        this._gender = gender;
    }

    get department(){ return this._department; }
    set department(department){
        this._department = department;
    }
    
    get salary() { return this._salary}
    set salary(salary) {
        this._salary = salary
    }
    get note(){ return this._note;}
    set note(note){
        this.note = note;
    }
    get startDate() { return this._startDate}
    set startDate(startDate){
        let now = new Date();
        if(startDate > now) {
            throw 'Start Date is a Future Date!';
        }
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if(diff / (1000 * 60 * 60 * 24) > 30)
            throw 'Start Date is beyond 30 days!';
        this._startDate = startDate;
    }
    
    toString() {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate = this.startDate === undefined ? "undefined" : 
            this.startDate.toLocaleDateString("en-US", options);
        return "name = " + this.name + ", gender="+this.gender+
                ", profilePic="+this.profilePic+", department="+this.department+", salary = " 
                + this.salary + ", start date = " + empDate+", note="+this.note;
    }
}


window.addEventListener('DOMContentLoaded', () => {
    
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });
    
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
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
});

const save = () => {
    try{
        let employeePayrollData = createEmployeePayrollData();
    }catch(e){
        return;
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
    employeePayrollData.profilePic = getSelectedValues('[name= profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name= gender]').pop();
    employeePayrollData.department = getSelectedValues('[name= department]');
    employeePayrollData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
               getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    employeePayrollData.note = getInputValueById('#notes');
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked){
            setItems.push(item.value);
        }
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}