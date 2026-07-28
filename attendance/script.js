// ================================
// Attendance Management System
// script.js
// Part 1
// ================================

// ---------- Global Variables ----------

let present = 0;
let absent = 0;

let studentDatabase = [];
let attendanceRecords = [];

const STUDENT_DB_KEY = "studentDatabase";
const ATTENDANCE_KEY = "attendanceRecords";

// ---------- Load Data ----------

function loadStudentDatabase(){

    studentDatabase =
        JSON.parse(localStorage.getItem(STUDENT_DB_KEY)) || [];

}

function loadAttendance(){

    attendanceRecords =
        JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || [];

}

function saveStudentDatabase(){

    localStorage.setItem(

        STUDENT_DB_KEY,

        JSON.stringify(studentDatabase)

    );

}

function saveAttendanceDatabase(){

    localStorage.setItem(

        ATTENDANCE_KEY,

        JSON.stringify(attendanceRecords)

    );

}

// ---------- Dashboard ----------

function updateDashboard(){

    document.getElementById("studentTotal").innerHTML =
    studentDatabase.length;

    document.getElementById("studentTotalSummary").innerHTML =
    studentDatabase.length;

    document.getElementById("presentCount").innerHTML =
    present;

    document.getElementById("absentCount").innerHTML =
    absent;

    let total = present + absent;

    let percent = 0;

    if(total>0){

        percent =
        ((present/total)*100).toFixed(2);

    }

    document.getElementById("attendancePercent").innerHTML =
    percent + "%";

    document.getElementById("attendancePercentSummary").innerHTML =
    percent + "%";

    document.getElementById("summaryPresentCount").innerHTML =
    present;

    document.getElementById("summaryAbsentCount").innerHTML =
    absent;

    document.getElementById("totalLectures").innerHTML =
    attendanceRecords.length;

}

// ---------- Startup ----------

window.onload=function(){

    loadStudentDatabase();

    loadAttendance();

    showDatabase();

    updateDashboard();

    viewAttendance();

};

// ---------- Add Student ----------

function addStudent(){

    let roll =
    document.getElementById("rollNumber")
    .value.trim();

    let name =
    document.getElementById("studentName")
    .value.trim();

    if(roll==="" || name===""){

        alert("Please enter Roll Number and Student Name.");

        return;

    }

    let duplicate =
    studentDatabase.some(function(student){

        return student.roll===roll;

    });

    if(duplicate){

        alert("Roll Number already exists.");

        return;

    }

    studentDatabase.push({

        roll:roll,

        name:name

    });

    saveStudentDatabase();

    showDatabase();

    updateDashboard();

    document.getElementById("rollNumber").value="";

    document.getElementById("studentName").value="";

}
// ================================
// Part 2
// Student Database & Attendance List
// ================================

// ---------- Show Student Database ----------

function showDatabase(){

    loadStudentDatabase();

    let output="";

    if(studentDatabase.length===0){

        output=`
        <p>No students added.</p>
        `;

    }else{

        studentDatabase.forEach(function(student,index){

            output+=`

            <div class="student">

                <h3>

                    ${student.roll}
                    -
                    ${student.name}

                </h3>

                <button
                onclick="deleteStudent(${index})">

                    🗑 Delete

                </button>

            </div>

            `;

        });

    }

    document.getElementById("database").innerHTML=output;

    updateDashboard();

}

// ---------- Delete Student ----------

function deleteStudent(index){

    if(!confirm("Delete this student?")){

        return;

    }

    studentDatabase.splice(index,1);

    saveStudentDatabase();

    showDatabase();

}

// ---------- Search Student Database ----------

function searchDatabase(){

    let keyword=document
    .getElementById("searchDatabase")
    .value
    .toLowerCase();

    let cards=document.querySelectorAll("#database .student");

    cards.forEach(function(card){

        if(card.innerText.toLowerCase().includes(keyword)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}

// ---------- Create Attendance List ----------

function createList(){

    loadStudentDatabase();

    if(studentDatabase.length===0){

        alert("Please add students first.");

        return;

    }

    present=0;
    absent=0;

    updateDashboard();

    let html="";

    studentDatabase.forEach(function(student){

        html+=`

        <div class="student">

            <h3>

                ${student.roll}
                -
                ${student.name}

            </h3>

            <button
            class="presentBtn"
            onclick="markPresent(this)">

                ✅ Present

            </button>

            <button
            class="absentBtn"
            onclick="markAbsent(this)">

                ❌ Absent

            </button>

            <hr>

        </div>

        `;

    });

    document.getElementById("studentList").innerHTML=html;

}
// ================================
// Part 3
// Attendance Marking
// ================================

// ---------- Mark Present ----------

function markPresent(button){

    let student = button.parentElement;

    let presentBtn = student.querySelector(".presentBtn");
    let absentBtn = student.querySelector(".absentBtn");

    // Already Present
    if(presentBtn.classList.contains("active")){

        return;

    }

    // If previously absent
    if(absentBtn.classList.contains("active")){

        absent--;

    }

    presentBtn.classList.add("active");
    presentBtn.style.background = "green";
    presentBtn.style.color = "white";

    absentBtn.classList.remove("active");
    absentBtn.style.background = "";
    absentBtn.style.color = "";

    present++;

    updateDashboard();

}

// ---------- Mark Absent ----------

function markAbsent(button){

    let student = button.parentElement;

    let presentBtn = student.querySelector(".presentBtn");
    let absentBtn = student.querySelector(".absentBtn");

    // Already Absent
    if(absentBtn.classList.contains("active")){

        return;

    }

    // If previously present
    if(presentBtn.classList.contains("active")){

        present--;

    }

    absentBtn.classList.add("active");
    absentBtn.style.background = "red";
    absentBtn.style.color = "white";

    presentBtn.classList.remove("active");
    presentBtn.style.background = "";
    presentBtn.style.color = "";

    absent++;

    updateDashboard();

}

// ---------- Search Attendance List ----------

function searchStudent(){

    let keyword = document
    .getElementById("searchStudent")
    .value
    .toLowerCase();

    let students =
    document.querySelectorAll("#studentList .student");

    students.forEach(function(student){

        if(student.innerText.toLowerCase().includes(keyword)){

            student.style.display="block";

        }else{

            student.style.display="none";

        }

    });

}

// ---------- Reset Attendance ----------

function resetAttendance(){

    present = 0;

    absent = 0;

    document.querySelectorAll(".presentBtn").forEach(function(btn){

        btn.classList.remove("active");

        btn.style.background="";

        btn.style.color="";

    });

    document.querySelectorAll(".absentBtn").forEach(function(btn){

        btn.classList.remove("active");

        btn.style.background="";

        btn.style.color="";

    });

    updateDashboard();

}
// ================================
// Part 4
// Save Attendance
// ================================

// ---------- Save Attendance ----------

function saveAttendance(){

    let lectureDate =
    document.getElementById("lectureDate").value;

    let className =
    document.getElementById("className").value.trim();

    let subject =
    document.getElementById("subject").value.trim();

    if(lectureDate===""){

        alert("Please select Lecture Date.");

        return;

    }

    if(className===""){

        alert("Please enter Class Name.");

        return;

    }

    if(subject===""){

        alert("Please enter Subject.");

        return;

    }

    loadStudentDatabase();

    loadAttendance();

    let attendanceList=[];

    let students=
    document.querySelectorAll("#studentList .student");

    students.forEach(function(student,index){

        let presentBtn=
        student.querySelector(".presentBtn");

        let absentBtn=
        student.querySelector(".absentBtn");

        let status="Not Marked";

        if(presentBtn.classList.contains("active")){

            status="Present";

        }

        if(absentBtn.classList.contains("active")){

            status="Absent";

        }

        attendanceList.push({

            roll:
            studentDatabase[index].roll,

            name:
            studentDatabase[index].name,

            attendance:
            status

        });

    });

    attendanceRecords.push({

        date:lectureDate,

        className:className,

        subject:subject,

        totalStudents:
        studentDatabase.length,

        present:present,

        absent:absent,

        percentage:
        studentDatabase.length===0
        ?0
        :
        (
            (present/studentDatabase.length)
            *100
        ).toFixed(2),

        students:attendanceList

    });

    saveAttendanceDatabase();

    updateDashboard();

    alert("✅ Attendance Saved Successfully.");

    viewAttendance();

    showReport();

}
// ================================
// Part 5
// Attendance History
// ================================

// ---------- View Attendance History ----------

function viewAttendance(){

    loadAttendance();

    let historyDiv =
    document.getElementById("history");

    if(attendanceRecords.length===0){

        historyDiv.innerHTML=`

        <div class="emptyBox">

        <h3>No Attendance History Found</h3>

        </div>

        `;

        return;

    }

    let output="";

    attendanceRecords.forEach(function(record,index){

        output+=`

        <div class="historyCard">

        <h2>

        📚 Lecture ${index+1}

        </h2>

        <p>

        <b>Date :</b>

        ${record.date}

        </p>

        <p>

        <b>Class :</b>

        ${record.className}

        </p>

        <p>

        <b>Subject :</b>

        ${record.subject}

        </p>

        <p>

        <b>Total Students :</b>

        ${record.totalStudents}

        </p>

        <p>

        <b>Present :</b>

        <span style="color:green;">

        ${record.present}

        </span>

        </p>

        <p>

        <b>Absent :</b>

        <span style="color:red;">

        ${record.absent}

        </span>

        </p>

        <p>

        <b>Attendance :</b>

        ${record.percentage}%

        </p>

        <table
        border="1"
        width="100%"
        cellspacing="0"
        cellpadding="8">

        <tr>

        <th>Roll</th>

        <th>Name</th>

        <th>Status</th>

        </tr>

        `;

        record.students.forEach(function(student){

            let color="black";

            if(student.attendance==="Present"){

                color="green";

            }

            if(student.attendance==="Absent"){

                color="red";

            }

            output+=`

            <tr>

            <td>

            ${student.roll}

            </td>

            <td>

            ${student.name}

            </td>

            <td
            style="color:${color};
            font-weight:bold;">

            ${student.attendance}

            </td>

            </tr>

            `;

        });

        output+=`

        </table>

        <br><hr><br>

        </div>

        `;

    });

    historyDiv.innerHTML=output;

}
// ================================
// Part 6
// Attendance Report
// ================================

// ---------- Attendance Percentage Report ----------

function showReport(){

    loadAttendance();

    let reportDiv =
    document.getElementById("report");

    if(attendanceRecords.length===0){

        reportDiv.innerHTML=`

        <div class="emptyBox">

        <h3>No Report Available</h3>

        </div>

        `;

        return;

    }

    loadStudentDatabase();

    let report=[];

    studentDatabase.forEach(function(student){

        let totalLectures=0;

        let totalPresent=0;

        let totalAbsent=0;

        attendanceRecords.forEach(function(record){

            let found=record.students.find(function(item){

                return item.roll===student.roll;

            });

            if(found){

                totalLectures++;

                if(found.attendance==="Present"){

                    totalPresent++;

                }

                if(found.attendance==="Absent"){

                    totalAbsent++;

                }

            }

        });

        let percentage=0;

        if(totalLectures>0){

            percentage=
            (
                (totalPresent/totalLectures)
                *100
            ).toFixed(2);

        }

        report.push({

            roll:student.roll,

            name:student.name,

            lectures:totalLectures,

            present:totalPresent,

            absent:totalAbsent,

            percentage:percentage

        });

    });

    let html=`

    <table
    border="1"
    width="100%"
    cellspacing="0"
    cellpadding="8">

    <tr>

    <th>Roll</th>

    <th>Name</th>

    <th>Total</th>

    <th>Present</th>

    <th>Absent</th>

    <th>%</th>

    </tr>

    `;

    report.forEach(function(student){

        let color="red";

        if(student.percentage>=75){

            color="green";

        }

        html+=`

        <tr>

        <td>

        ${student.roll}

        </td>

        <td>

        ${student.name}

        </td>

        <td>

        ${student.lectures}

        </td>

        <td>

        ${student.present}

        </td>

        <td>

        ${student.absent}

        </td>

        <td
        style="
        color:${color};
        font-weight:bold;
        ">

        ${student.percentage}%

        </td>

        </tr>

        `;

    });

    html+=`

    </table>

    `;

    if(report.length>0){

        let best=[...report]
        .sort(function(a,b){

            return b.percentage-a.percentage;

        })[0];

        let lowest=[...report]
        .sort(function(a,b){

            return a.percentage-b.percentage;

        })[0];

        html+=`

        <br>

        <div class="summaryCard">

        <h3>🏆 Best Attendance</h3>

        <p>

        ${best.roll} - ${best.name}

        (${best.percentage}%)

        </p>

        </div>

        <br>

        <div class="summaryCard">

        <h3>📉 Lowest Attendance</h3>

        <p>

        ${lowest.roll} - ${lowest.name}

        (${lowest.percentage}%)

        </p>

        </div>

        `;

    }

    reportDiv.innerHTML=html;

}
// ================================
// Part 7
// Export & Clear Data
// ================================

// ---------- Export Attendance to Excel ----------

function exportToExcel(){

    loadAttendance();

    if(attendanceRecords.length===0){

        alert("No attendance records found.");

        return;

    }

    let excelData=[];

    attendanceRecords.forEach(function(record){

        record.students.forEach(function(student){

            excelData.push({

                Date:record.date,

                Class:record.className,

                Subject:record.subject,

                Roll:student.roll,

                Name:student.name,

                Attendance:student.attendance

            });

        });

    });

    let workbook =
    XLSX.utils.book_new();

    let worksheet =
    XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Attendance"

    );

    XLSX.writeFile(

        workbook,

        "Attendance_Report.xlsx"

    );

}

// ---------- Clear All Data ----------

function clearData(){

    let confirmDelete = confirm(

        "Delete all attendance records and student database?"

    );

    if(!confirmDelete){

        return;

    }

    localStorage.removeItem(STUDENT_DB_KEY);

    localStorage.removeItem(ATTENDANCE_KEY);

    studentDatabase=[];

    attendanceRecords=[];

    present=0;

    absent=0;

    document.getElementById("studentList").innerHTML="";

    document.getElementById("database").innerHTML="";

    document.getElementById("history").innerHTML=
    "<p>No Attendance History Found.</p>";

    document.getElementById("report").innerHTML=
    "<p>No Report Available.</p>";

    updateDashboard();

    alert("All data cleared successfully.");

}

// ---------- Reset Attendance Buttons ----------

function resetAttendance(){

    present=0;

    absent=0;

    document.querySelectorAll(".presentBtn").forEach(function(btn){

        btn.classList.remove("active");

        btn.style.background="";

        btn.style.color="";

    });

    document.querySelectorAll(".absentBtn").forEach(function(btn){

        btn.classList.remove("active");

        btn.style.background="";

        btn.style.color="";

    });

    updateDashboard();

}

// ---------- Utility ----------

function formatDate(date){

    if(date==="") return "";

    let d = new Date(date);

    return d.toLocaleDateString();

}

function getToday(){

    let today = new Date();

    return today.toISOString().split("T")[0];

}
// ================================
// Part 8
// Initialization & Helper Functions
// ================================

// ---------- Set Today's Date ----------

function initializePage(){

    let lectureDate =
    document.getElementById("lectureDate");

    if(lectureDate){

        lectureDate.value = getToday();

    }

    loadStudentDatabase();

    loadAttendance();

    showDatabase();

    updateDashboard();

    viewAttendance();

    showReport();

}

// ---------- Refresh Dashboard ----------

function refreshAll(){

    loadStudentDatabase();

    loadAttendance();

    updateDashboard();

    showDatabase();

    viewAttendance();

    showReport();

}

// ---------- Student Count ----------

function getStudentCount(){

    return studentDatabase.length;

}

// ---------- Lecture Count ----------

function getLectureCount(){

    return attendanceRecords.length;

}

// ---------- Present Percentage ----------

function calculateAttendancePercentage(){

    if(studentDatabase.length===0){

        return "0.00";

    }

    return (

        (present/studentDatabase.length)

        *100

    ).toFixed(2);

}

// ---------- Show Toast ----------

function showToast(message){

    let toast =
    document.getElementById("toast");

    let toastMessage =
    document.getElementById("toastMessage");

    if(!toast || !toastMessage){

        return;

    }

    toastMessage.innerHTML = message;

    toast.style.display = "block";

    setTimeout(function(){

        toast.style.display = "none";

    },3000);

}

// ---------- Loading ----------

function showLoading(){

    let loading =
    document.getElementById("loading");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    let loading =
    document.getElementById("loading");

    if(loading){

        loading.style.display="none";

    }

}

// ---------- Keyboard Shortcut ----------

document.addEventListener(

    "keydown",

    function(event){

        if(event.ctrlKey && event.key==="s"){

            event.preventDefault();

            saveAttendance();

        }

    }

);

// ---------- Initialize ----------

window.addEventListener(

    "load",

    function(){

        initializePage();

    }

);

// ---------- Console ----------

console.log(

"Attendance Management System Loaded Successfully."

);
