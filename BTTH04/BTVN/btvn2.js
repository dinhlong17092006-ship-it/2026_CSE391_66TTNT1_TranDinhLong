let currentStep = 1;

function showStep(step){

    document.querySelectorAll(".step").forEach(s=>{
        s.classList.remove("active");
    });

    document.getElementById("step"+step).classList.add("active");

    const progress = (step/3)*100;

    document.getElementById("progressBar").style.width = progress+"%";
}

function showError(id,msg){

    const e = document.getElementById(id+"Error");
    e.innerText = msg;
    e.style.display="block";
}

function clearError(id){

    const e = document.getElementById(id+"Error");
    e.style.display="none";
}

function validateStep1(){

    let valid = true;

    const name = document.getElementById("fullname").value.trim();
    const birth = document.getElementById("birthday").value;

    if(name.length < 3){
        showError("fullname","Ít nhất 3 ký tự");
        valid = false;
    }else clearError("fullname");

    if(birth === ""){
        showError("birthday","Chọn ngày sinh");
        valid = false;
    }else clearError("birthday");

    const gender = document.querySelector("input[name='gender']:checked");

    if(!gender){
        showError("gender","Chọn giới tính");
        valid = false;
    }else clearError("gender");

    return valid;
}

function validateStep2(){

    let valid = true;

    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        showError("email","Email không hợp lệ");
        valid=false;
    }else clearError("email");

    if(pass.length < 6){
        showError("password","Ít nhất 6 ký tự");
        valid=false;
    }else clearError("password");

    if(pass !== confirm){
        showError("confirmPassword","Mật khẩu không khớp");
        valid=false;
    }else clearError("confirmPassword");

    return valid;
}

document.getElementById("next1").onclick = function(){

    if(validateStep1()){
        currentStep = 2;
        showStep(2);
    }

};

document.getElementById("back1").onclick = function(){

    currentStep = 1;
    showStep(1);

};

document.getElementById("next2").onclick = function(){

    if(validateStep2()){

        document.getElementById("sumName").innerText =
        document.getElementById("fullname").value;

        document.getElementById("sumBirth").innerText =
        document.getElementById("birthday").value;

        document.getElementById("sumGender").innerText =
        document.querySelector("input[name='gender']:checked").value;

        document.getElementById("sumEmail").innerText =
        document.getElementById("email").value;

        currentStep = 3;
        showStep(3);
    }

};

document.getElementById("back2").onclick = function(){

    currentStep = 2;
    showStep(2);

};

document.getElementById("multiForm").addEventListener("submit",function(e){

    e.preventDefault();

    document.getElementById("multiForm").style.display="none";
    document.getElementById("successBox").style.display="block";

});