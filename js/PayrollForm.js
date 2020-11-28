let isUpdate = false;
let empPayrollObj = {};

//Class to manipulate employee payroll data
class EmployeePayrollData {

    get name() { return this._name; }
    set name(name) {
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else throw 'Name is incorrect!';
    }

    get id() { return this._id;}
    set id(id) {
        this._id = id;
    }

    get profilePic() { return this._profilePic; }
    set profilePic (profilePic){
        this._profilePic = profilePic;
    }

    get gender() { return this._gender; }
    set gender (gender) {
        this._gender = gender;
    }

    get salary() { return this._salary;}
    set salary (salary) {
        this._salary = salary;
    }

    get department() { return this._department; }
    set department (department) {
        this._department = department ;
    }

    get notes() { return this._notes; }
    set notes (notes) {
        this._notes = notes;
    }

    get startDate() { return this._startDate; }
    set startDate(startDate){
        let now = new Date();
        if(startDate > now) throw "Start Date cannot be future date";
        this._startDate = startDate;
    }

    toString() {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate =  this.startDate === undefined ? "undefined" : this.startDate.toLocaleDateString('en-US', options);
        return "id = " + this._id + ", name = " + this._name + ", gender = " + this._gender + 
               ", salary = " + this._salary + ", ProfilePic = " + this._profilePic + ", department = " + this._department + 
               ", start date = " + empDate + ", Notes = " + this._notes;
    }
}

//Adds event listners to DOMs when the content is loaded
window.addEventListener('DOMContentLoaded', () => {
    
    //Event listner to validate the name while typing
    const name = document.querySelector('#name');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            setTextValue('.text-error', '');
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error', '');
        }catch(e){
            setTextValue('.text-error', e);
        }
    });  

    //Event listner to check if the date is future date
    const date = document.querySelector('#date');
    date.addEventListener('input', function(){
        let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.date-error', '');
        }catch(e){
            setTextValue('.date-error', e);
        }
    });

    //Event listner to set the slider at the selected position
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });

    checkForUpdate();

});

//Saves the employee data to local storage
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace("../pages/home.html");
    }catch(e){
        return;
    }
}

//Populates the employee payroll object
const setEmployeePayrollObject = () => {
    empPayrollObj._name = getInputValueById('#name');
    empPayrollObj._profilePic = getSelectedValues('[name = profile]').pop();
    empPayrollObj._gender = getSelectedValues('[name = gender]').pop();
    empPayrollObj._department = getSelectedValues('[name = department]');
    empPayrollObj._salary = getInputValueById('#salary');
    empPayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + ' ' + getInputValueById('#year');
    empPayrollObj._startDate = date;
}

//Populated objects are stored in the local storage
const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == empPayrollObj._id)
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    }else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

//Creates employee payroll data
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

//Sets the values created by create data method
const setEmployeePayrollData = (employeePayrollData) => {

    try{
        employeePayrollData.name = empPayrollObj._name;
    } catch(e){
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = empPayrollObj._profilePic;
    employeePayrollData.gender = empPayrollObj._gender;
    employeePayrollData.department = empPayrollObj._department;
    employeePayrollData.salary = empPayrollObj._salary;
    employeePayrollData.notes = empPayrollObj._notes;
    try{
        employeePayrollData.startDate = new Date(Date.parse(empPayrollObj._startDate));
    } catch(e){
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

//Creates a new id for new employee
const createNewEmployeeId = () => {
    let empID = localStorage.getItem('EmployeeID');
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem('EmployeeID', empID);
    return empID;
}

//Return the array of selected values by property
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach( item => {
        if( item.checked ) selItems.push( item.value );
    });
    return selItems;
}

//Returns the value of an element by id
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//Returns the element by id
const getInputElementValue= (id) => {
    let value = document.getElementById(id).value;
    return value;
}

//Sets the form according to class names or IDs
const setForm = () => {
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name = profile]', empPayrollObj._profilePic);
    setSelectedValues('[name = gender]', empPayrollObj._gender);
    setSelectedValues('[name = department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._notes);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

//Sets selected values by property
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if (value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value == value)
            item.checked = true;
    });
}

//Resets the form if reset button is clicked
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name = gender');
    unsetSelectedValues('[name = department');
    unsetSelectedValues('[name = profile');
    setValue('#salary', ' ');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
    setValue('#notes', '');
}

//Unsets the selected value by property
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });    
}

//Sets the value of an element using id
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value
}

//Sets the text content of an element using id
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//Sets the selected index using id
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

//Checks if there is any need of updation in local storage
checkForUpdate = () => {
    const empPayrollJson = localStorage.getItem('editEmp');
    isUpdate = empPayrollJson ? true : false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(empPayrollJson);
    setForm();
}