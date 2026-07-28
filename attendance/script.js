let present = 0;
let absent = 0;

function createList() {

    let count = parseInt(document.getElementById("studentCount").value);

    if (isNaN(count) || count <= 0) {
        alert("Enter a valid number.");
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

<input
type="text"
placeholder="Roll Number">

<input
type="text"
placeholder="Student Name">

<button onclick="markPresent(this)">
    ✅ Present
</button>

<button onclick="markAbsent(this)">
    ❌ Absent
</button>

        </div>

        <br>
        `;

    }

    document.getElementById("studentList").innerHTML = output;

}

function markPresent(button){

    button.disabled = true;

    button.style.background = "green";
    button.style.color = "white";

    present++;

    document.getElementById("presentCount").innerHTML = present;

}

function markAbsent(button){

    button.disabled = true;

    button.style.background = "red";
    button.style.color = "white";

    absent++;

    document.getElementById("absentCount").innerHTML = absent;

}
function exportToExcel() {

    let table = [];

    table.push([
        "Roll No",
        "Student Name",
        "Attendance"
    ]);

    let students = document.querySelectorAll(".student");

    students.forEach(student => {

        let inputs = student.querySelectorAll("input");

        let roll = inputs[0].value;
        let name = inputs[1].value;

        let attendance = "Not Marked";

        let buttons = student.querySelectorAll("button");

        if(buttons[0].style.background === "green"){
            attendance = "Present";
        }

        if(buttons[1].style.background === "red"){
            attendance = "Absent";
        }

        table.push([
            roll,
            name,
            attendance
        ]);

    });

    let workbook = XLSX.utils.book_new();

    let worksheet = XLSX.utils.aoa_to_sheet(table);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, "Attendance.xlsx");

}
