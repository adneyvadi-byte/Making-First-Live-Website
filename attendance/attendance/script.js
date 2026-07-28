function createList(){

let count=document.getElementById("studentCount").value;

let output="";

for(let i=1;i<=count;i++){

output+=`
<p>
Student ${i}
<button>Present</button>
<button>Absent</button>
</p>
`;

}

document.getElementById("studentList").innerHTML=output;

}
