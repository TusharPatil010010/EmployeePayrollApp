const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = Salary.value;
Salary.addEventListener('input', function() {
output.textContent = Salary.value
});