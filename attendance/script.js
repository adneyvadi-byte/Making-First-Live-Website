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
