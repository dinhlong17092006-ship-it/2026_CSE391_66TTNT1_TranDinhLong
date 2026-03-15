const form = document.getElementById("registerForm");

function showError(id,msg){

    const field=document.getElementById(id);
    const error=document.getElementById(id+"Error");

    field.classList.add("invalid");
    error.innerText=msg;
    error.style.display="block";
}

function clearError(id){

    const field=document.getElementById(id);
    const error=document.getElementById(id+"Error");

    field.classList.remove("invalid");
    field.classList.add("success");

    error.style.display="none";
}

function validateFullname(){

    const value=document.getElementById("fullname").value.trim();

    const regex=/^[a-zA-ZÀ-ỹ\s]+$/;

    if(value.length<3){
        showError("fullname","Ít nhất 3 ký tự");
        return false;
    }

    if(!regex.test(value)){
        showError("fullname","Chỉ chứa chữ");
        return false;
    }

    clearError("fullname");
    return true;
}

function validateEmail(){

    const value=document.getElementById("email").value.trim();

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(value)){
        showError("email","Email không hợp lệ");
        return false;
    }

    clearError("email");
    return true;
}

function validatePassword(){

    const value=document.getElementById("password").value;

    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(!regex.test(value)){
        showError("password","Ít nhất 8 ký tự gồm chữ hoa, thường, số");
        return false;
    }

    clearError("password");
    return true;
}

form.addEventListener("submit",function(e){

    e.preventDefault();

    const valid=
    validateFullname() &
    validateEmail() &
    validatePassword();

    if(valid){

        const name=document.getElementById("fullname").value;

        form.style.display="none";

        document.getElementById("successBox").style.display="block";

        document.getElementById("userName").innerText=name;
    }

});

document.getElementById("fullname").addEventListener("blur",validateFullname);
document.getElementById("email").addEventListener("blur",validateEmail);
document.getElementById("password").addEventListener("blur",validatePassword);

document.getElementById("fullname").addEventListener("input",()=>clearError("fullname"));
document.getElementById("email").addEventListener("input",()=>clearError("email"));
document.getElementById("password").addEventListener("input",()=>clearError("password"));

/* Đếm ký tự họ tên */

const fullname=document.getElementById("fullname");
const nameCounter=document.getElementById("nameCounter");

fullname.addEventListener("input",function(){

    nameCounter.innerText=this.value.length+"/50";

});

/* Password strength */

const password=document.getElementById("password");
const strengthFill=document.getElementById("strengthFill");

password.addEventListener("input",function(){

    const val=this.value;

    let score=0;

    if(val.length>=8) score++;
    if(/[A-Z]/.test(val)) score++;
    if(/[0-9]/.test(val)) score++;
    if(/[a-z]/.test(val)) score++;

    strengthFill.className="strength-fill";

    if(score<=1){
        strengthFill.style.width="33%";
        strengthFill.classList.add("weak");
    }
    else if(score<=3){
        strengthFill.style.width="66%";
        strengthFill.classList.add("medium");
    }
    else{
        strengthFill.style.width="100%";
        strengthFill.classList.add("strong");
    }

});

/* Toggle password */

const toggle=document.getElementById("togglePass");

toggle.addEventListener("click",function(){

    if(password.type==="password"){
        password.type="text";
    }else{
        password.type="password";
    }

});