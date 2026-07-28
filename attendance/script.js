function createList() {

    let count = parseInt(document.getElementById("studentCount").value);

    if (isNaN(count) || count <= 0) {
        alert("Enter a valid number of students.");
        return;
    }

    let output = "";

    for (let i = 1; i <= count; i++) {

        output += `
        <div class="student">

            <input
            type="text"
            placeholder="Enter Student ${i} Name">

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

    button.style.background="green";
    button.style.color="white";

}

function markAbsent(button){

    button.style.background="red";
    button.style.color="white";

}
