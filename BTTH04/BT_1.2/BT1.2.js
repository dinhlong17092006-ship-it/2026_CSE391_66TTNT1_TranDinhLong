let students = [];
let filteredStudents = [];

let sortAsc = true;

function getRank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";

}

function addStudent(){

    const nameInput = document.getElementById("name");
    const scoreInput = document.getElementById("score");

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được trống");
        return;
    }

    if(isNaN(score) || score <0 || score >10){
        alert("Điểm phải từ 0-10");
        return;
    }

    students.push({
        name:name,
        score:score
    });

    nameInput.value="";
    scoreInput.value="";
    nameInput.focus();

    applyFilters();
}

function applyFilters(){

    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filterRank = document.getElementById("filterRank").value;

    filteredStudents = students.filter(sv => {

        const matchName = sv.name.toLowerCase().includes(keyword);

        const rank = getRank(sv.score);
        const matchRank = filterRank === "all" || rank === filterRank;

        return matchName && matchRank;

    });

    filteredStudents.sort((a,b)=>{

        return sortAsc ? a.score - b.score : b.score - a.score;

    });

    renderTable();
}

function renderTable(){

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML="";

    if(filteredStudents.length === 0){

        tbody.innerHTML = `
        <tr>
        <td colspan="4" class="no-result">
        Không có kết quả
        </td>
        </tr>
        `;

        document.getElementById("total").innerText=0;
        document.getElementById("avg").innerText=0;

        return;
    }

    let sum = 0;

    filteredStudents.forEach((sv,index)=>{

        sum += sv.score;

        const tr = document.createElement("tr");

        if(sv.score <5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
        <button data-index="${students.indexOf(sv)}" class="deleteBtn">Xóa</button>
        </td>
        `;

        tbody.appendChild(tr);

    });

    document.getElementById("total").innerText = filteredStudents.length;

    document.getElementById("avg").innerText = (sum/filteredStudents.length).toFixed(2);

}

document.getElementById("addBtn").addEventListener("click",addStudent);

document.getElementById("score").addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        addStudent();
    }

});

document.getElementById("searchInput").addEventListener("input",applyFilters);

document.getElementById("filterRank").addEventListener("change",applyFilters);

document.getElementById("sortScore").addEventListener("click",function(){

    sortAsc = !sortAsc;

    this.innerText = sortAsc ? "Điểm ▲" : "Điểm ▼";

    applyFilters();
});

document.getElementById("tableBody").addEventListener("click",function(e){

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.dataset.index;

        students.splice(index,1);

        applyFilters();

    }

});