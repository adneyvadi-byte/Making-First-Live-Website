function createList() {

    let className = document.getElementById("className").value;
    let count = parseInt(document.getElementById("studentCount").value);

    if (count <= 0 || isNaN(count)) {
        alert("Please enter a valid number of students.");
        return;
    }

    let output = "";

    output += "<h2>" + className + "</h2>";

    for (let i = 1; i <= count; i++) {

        output += `
        <div class="student">

            <span>Student ${i}</span>

            <button onclick="markPresent(this)">
                ✅ Present
            </button>

            <button onclick="markAbsent(this)">
                ❌ Absent
            </button>

        </div>

        <hr>
        `;

    }

    document.getElementById("studentList").innerHTML = output;

}

function markPresent(button){

    button.style.background="green";
    button.style.color="white";

}

function markAbsent(button){

    button.style.background="red";
    button.style.color="white";

}
