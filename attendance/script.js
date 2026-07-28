let present = 0;
let absent = 0;
let studentDatabase = [];
function createList() {

    let count = parseInt(document.getElementById("studentCount").value);

    if (isNaN(count) || count <= 0) {
        alert("Please enter a valid number of students.");
        return;
    }

    present = 0;
    absent = 0;

    document.getElementById("presentCount").innerHTML = 0;
    document.getElementById("absentCount").innerHTML = 0;

    let output = "";

    for (let i = 1; i <= count; i++) {

        output += `
        <div class="student">

            <h3>Student ${i}</h3>

            <input type="text" placeholder="Roll Number">

            <input type="text" placeholder="Student Name">

            <button onclick="markPresent(this)">
                ✅ Present
            </button>

            <button onclick="markAbsent(this)">
                ❌ Absent
            </button>

            <hr>

        </div>
        `;
    }

    document.getElementById("studentList").innerHTML = output;

    localStorage.setItem("studentList", output);

}

function markPresent(button){

    button.style.background = "green";
    button.style.color = "white";

    present++;

    document.getElementById("presentCount").innerHTML = present;

}

function markAbsent(button){

    button.style.background = "red";
    button.style.color = "white";

    absent++;

    document.getElementById("absentCount").innerHTML = absent;

}

function saveAttendance(){

    let records = [];

    let lectureDate = document.getElementById("lectureDate").value;
    let className = document.getElementById("className").value;
    let subject = document.getElementById("subject").value;

    let students = document.querySelectorAll(".student");

    students.forEach(student=>{

        let inputs = student.querySelectorAll("input");

        let roll = inputs[0].value;
        let name = inputs[1].value;

        let attendance = "Not Marked";

        let buttons = student.querySelectorAll("button");

        if(buttons[0].style.background==="green"){
            attendance="Present";
        }

        if(buttons[1].style.background==="red"){
            attendance="Absent";
        }

        records.push({
            date:lectureDate,
            className:className,
            subject:subject,
            roll:roll,
            name:name,
            attendance:attendance
        });

    });

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(records)
    );

    alert("Attendance Saved Successfully!");

}

function exportToExcel(){

    let records = JSON.parse(localStorage.getItem("attendanceRecords"));

    if(records==null || records.length==0){
        alert("No attendance records found.");
        return;
    }

    let workbook = XLSX.utils.book_new();

    let worksheet = XLSX.utils.json_to_sheet(records);

    XLSX.utils.book_append_sheet(workbook,worksheet,"Attendance");

    XLSX.writeFile(workbook,"Attendance.xlsx");

}

function clearData(){

    localStorage.removeItem("attendanceRecords");
    localStorage.removeItem("studentList");

    document.getElementById("studentList").innerHTML="";

    present=0;
    absent=0;

    document.getElementById("presentCount").innerHTML=0;
    document.getElementById("absentCount").innerHTML=0;

    alert("All data cleared.");

}

window.onload=function(){

    let saved=localStorage.getItem("studentList");

    if(saved){

        document.getElementById("studentList").innerHTML=saved;
        showDatabase();
    }

}
function addStudent(){

    let roll=document.getElementById("rollNumber").value;
    let name=document.getElementById("studentName").value;

    if(roll==="" || name===""){
        alert("Please enter Roll Number and Student Name.");
        return;
    }

    studentDatabase.push({
        roll:roll,
        name:name
    });

    localStorage.setItem(
        "studentDatabase",
        JSON.stringify(studentDatabase)
    );

    showDatabase();

    document.getElementById("rollNumber").value="";
    document.getElementById("studentName").value="";

}
function showDatabase(){

    let data=JSON.parse(localStorage.getItem("studentDatabase")) || [];

    studentDatabase=data;

    let output="";

    data.forEach(student=>{

        output+=`
        <div class="student">

        <b>${student.roll}</b> - ${student.name}

        </div>
        `;

    });

    document.getElementById("database").innerHTML=output;

}
