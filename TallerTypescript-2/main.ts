import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let studentbox: HTMLElement = document.getElementById('students')!;

renderStundetInTable(dataStudent);

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const btnFilterByRange : HTMLElement = document.getElementById("button-filterByRange")!;
const inputRangeMenor: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-rango")!;
const inputRangeMayor: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-rango2")!;
btnfilterByName.onclick = () => applyFilterByName();

btnFilterByRange.onclick =() => applyFilterByRange();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderStundetInTable(students: Student[]): void {
  console.log('Desplegando studiantes');

  console.log('Desplegando informacion studiante');
  students.forEach((Student) => {
    let trElement = document.createElement("tr");

    trElement.innerHTML = `<td>Código</td>
                           <td>${Student.codigo}</td>`;
    studentbox.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Cédula</td>
                           <td>${Student.cedula}</td>`;
    studentbox.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Edad</td>
                           <td>${Student.Edad} Años</td>`;
    studentbox.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Dirección</td>
                           <td>${Student.Direccion}</td>`;
    studentbox.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Teléfono</td>
                           <td>${Student.Telefono}</td>`;
    studentbox.appendChild(trElement);
  });
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

function applyFilterByRange(){

  let menor = inputRangeMenor.value;
  let mayor = inputRangeMayor.value;
  if(menor !== null && mayor !== null){

    let num1 =  +menor;
    let num2 =  +mayor;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCoursesByRange(num1, num2,dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
}

 
function searchCoursesByRange(MenorKey: number, MayorKey:number, courses: Course[]){

  var coursesiter = courses.slice();
  for(let i = 0; i < courses.length ; i++){

    let courseActual = courses[i];
    let eliminado: Course;

    if(courseActual.credits > MayorKey || courseActual.credits < MenorKey)
    {
      eliminado = coursesiter.shift()!;
    }
    else{
      eliminado = coursesiter.shift()!;
      coursesiter.push(eliminado);
    }
  }
  return coursesiter ;
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}