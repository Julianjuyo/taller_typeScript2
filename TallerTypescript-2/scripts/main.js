import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var studentbox = document.getElementById('students');
renderStundetInTable(dataStudent);
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var btnFilterByRange = document.getElementById("button-filterByRange");
var inputRangeMenor = document.getElementById("search-box-rango");
var inputRangeMayor = document.getElementById("search-box-rango2");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFilterByRange.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderStundetInTable(students) {
    console.log('Desplegando studiantes');
    console.log('Desplegando informacion studiante');
    students.forEach(function (Student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00F3digo</td>\n                           <td>" + Student.codigo + "</td>";
        studentbox.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>C\u00E9dula</td>\n                           <td>" + Student.cedula + "</td>";
        studentbox.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Edad</td>\n                           <td>" + Student.Edad + " A\u00F1os</td>";
        studentbox.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Direcci\u00F3n</td>\n                           <td>" + Student.Direccion + "</td>";
        studentbox.appendChild(trElement);
        trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Tel\u00E9fono</td>\n                           <td>" + Student.Telefono + "</td>";
        studentbox.appendChild(trElement);
    });
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByRange() {
    var menor = inputRangeMenor.value;
    var mayor = inputRangeMayor.value;
    if (menor !== null && mayor !== null) {
        var num1 = +menor;
        var num2 = +mayor;
        clearCoursesInTable();
        var coursesFiltered = searchCoursesByRange(num1, num2, dataCourses);
        renderCoursesInTable(coursesFiltered);
    }
}
function searchCourseByCreditos(numeroM, numeroS, courses) {
    var cursos = courses.slice();
    for (var index = 0; index < courses.length; index++) {
        var course = courses[index];
        var eliminado = void 0;
        if (course.credits < numeroM || course.credits > numeroS) {
            eliminado = cursos.shift();
        }
        else {
            eliminado = cursos.shift();
            cursos.push(eliminado);
        }
    }
    return cursos;
}
function searchCoursesByRange(MenorKey, MayorKey, courses) {
    var cursos = courses.slice();
    for (var index = 0; index < courses.length; index++) {
        var course = courses[index];
        var eliminado = void 0;
        if (course.credits > MayorKey || course.credits < MenorKey) {
            eliminado = cursos.shift();
        }
        else {
            eliminado = cursos.shift();
            cursos.push(eliminado);
        }
    }
    return cursos;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
