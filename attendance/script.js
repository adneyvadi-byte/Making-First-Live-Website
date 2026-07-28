let present = 0;
let absent = 0;
let studentDatabase = [];

function createList() {

    let data = JSON.parse(localStorage.getItem("studentDatabase")) || [];

    if (data.length === 0) {
        alert("Please add students to the Student Database first.");
        return;
    }

    present = 0;
    absent = 0;

    document.getElementById("presentCount").innerHTML = 0;
    document.getElementById("absentCount").innerHTML = 0;

    let output = "";

    data.forEach(student => {

        output += `
        <div class="student">

            <h3>${student.roll} - ${student.name}</h3>

            <button onclick="markPresent(this)">
                ✅ Present
            </button>

            <button onclick="markAbsent(this)">
                ❌ Absent
            </button>

            <hr>

        </div>
        `;

    });

    document.getElementById("studentList").innerHTML = output;

}

function markPresent(button){

    button.style.background="green";
    button.style.color="white";

    present++;

    document.getElementById("presentCount").innerHTML=present;

}

function markAbsent(button){

    button.style.background="red";
    button.style.color="white";

    absent++;

    document.getElementById("absentCount").innerHTML=absent;

}
function saveAttendance(){

    let records = [];

    let lectureDate = document.getElementById("lectureDate").value;
    let className = document.getElementById("className").value;
    let subject = document.getElementById("subject").value;

    let students = document.querySelectorAll(".student");

    students.forEach((student,index)=>{

        let buttons = student.querySelectorAll("button");

        let attendance = "Not Marked";

        if(buttons[0].style.background==="green"){
            attendance="Present";
        }

        if(buttons[1].style.background==="red"){
            attendance="Absent";
        }

        let data = JSON.parse(localStorage.getItem("studentDatabase")) || [];

        records.push({
            date:lectureDate,
            className:className,
            subject:subject,
            roll:data[index].roll,
            name:data[index].name,
            attendance:attendance
        });

    });

    let oldRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

oldRecords.push({
    date: lectureDate,
    className: className,
    subject: subject,
    students: records
});

localStorage.setItem(
    "attendanceRecords",
    JSON.stringify(oldRecords)
);

    alert("✅ Attendance Saved Successfully!");

}

function exportToExcel(){

    let records = JSON.parse(localStorage.getItem("attendanceRecords"));

    if(records==null || records.length==0){

        alert("No attendance records found.");

        return;

    }

    let workbook = XLSX.utils.book_new();

    let worksheet = XLSX.utils.json_to_sheet(records);

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Attendance"
    );

    XLSX.writeFile(
        workbook,
        "Attendance.xlsx"
    );

}

function clearData(){

    if(confirm("Delete all saved attendance and student data?")){

        localStorage.removeItem("attendanceRecords");
        localStorage.removeItem("studentDatabase");
        localStorage.removeItem("studentList");

        document.getElementById("studentList").innerHTML="";
        document.getElementById("database").innerHTML="";

        present=0;
        absent=0;

        document.getElementById("presentCount").innerHTML=0;
        document.getElementById("absentCount").innerHTML=0;

        alert("All data cleared.");

    }

}

window.onload=function(){

    showDatabase();

}
function addStudent(){

    let roll = document.getElementById("rollNumber").value.trim();
    let name = document.getElementById("studentName").value.trim();

    if(roll==="" || name===""){
        alert("Please enter Roll Number and Student Name.");
        return;
    }

    let data = JSON.parse(localStorage.getItem("studentDatabase")) || [];

    // Check duplicate roll number
    let exists = data.some(student => student.roll === roll);

    if(exists){
        alert("Roll Number already exists.");
        return;
    }

    data.push({
        roll: roll,
        name: name
    });

    localStorage.setItem(
        "studentDatabase",
        JSON.stringify(data)
    );

    showDatabase();

    document.getElementById("rollNumber").value = "";
    document.getElementById("studentName").value = "";

}

function showDatabase(){

    let data = JSON.parse(localStorage.getItem("studentDatabase")) || [];

    let output = "";

    if(data.length===0){

        output = "<p>No students added yet.</p>";

    }else{

        data.forEach((student,index)=>{

            output += `
            <div class="student">

                <h3>${student.roll} - ${student.name}</h3>

                <button onclick="deleteStudent(${index})">
                    🗑 Delete
                </button>

            </div>
            `;

        });

    }

    document.getElementById("database").innerHTML = output;

}

function deleteStudent(index){

    let data = JSON.parse(localStorage.getItem("studentDatabase")) || [];

    if(confirm("Delete this student?")){

        data.splice(index,1);

        localStorage.setItem(
            "studentDatabase",
            JSON.stringify(data)
        );

        showDatabase();

    }

}
function viewAttendance() {

    let history = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

    if (history.length === 0) {

        document.getElementById("history").innerHTML =
        "<h3>No attendance records found.</h3>";

        return;

    }

    let output = "";

    history.forEach((lecture, index) => {

        output += `
        <div class="student">

        <h2>📚 Lecture ${index + 1}</h2>

        <p><b>📅 Date:</b> ${lecture.date}</p>

        <p><b>🏫 Class:</b> ${lecture.className}</p>

        <p><b>📖 Subject:</b> ${lecture.subject}</p>

        <table border="1" width="100%" cellspacing="0" cellpadding="8">

        <tr>

        <th>Roll No.</th>

        <th>Name</th>

        <th>Attendance</th>

        </tr>
        `;

        lecture.students.forEach(student => {

            let color = "black";

            if(student.attendance === "Present"){
                color = "green";
            }

            if(student.attendance === "Absent"){
                color = "red";
            }

            output += `
            <tr>

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td style="color:${color};font-weight:bold;">
            ${student.attendance}
            </td>

            </tr>
            `;

        });

        output += `

        </table>

        <br>

        </div>

        <br>

        `;

    });

    document.getElementById("history").innerHTML = output;

}
