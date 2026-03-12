const form = document.getElementById("registerForm");

function showError(fieldId,message){

    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId+"Error");

    input.classList.remove("success");
    input.classList.add("invalid");

    error.innerText = message;
    error.style.display="block";

}

function clearError(fieldId){

    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId+"Error");

    input.classList.remove("invalid");
    input.classList.add("success");

    error.style.display="none";

}

function validateFullname(){

    const value = document.getElementById("fullname").value.trim();

    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;

    if(value===""){
        showError("fullname","Không được để trống");
        return false;
    }

    if(value.length<3){
        showError("fullname","Ít nhất 3 ký tự");
        return false;
    }

    if(!regex.test(value)){
        showError("fullname","Chỉ chứa chữ cái");
        return false;
    }

    clearError("fullname");
    return true;

}

function validateEmail(){

    const value = document.getElementById("email").value.trim();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(value===""){
        showError("email","Email không được trống");
        return false;
    }

    if(!regex.test(value)){
        showError("email","Email không hợp lệ");
        return false;
    }

    clearError("email");
    return true;

}

function validatePhone(){

    const value = document.getElementById("phone").value.trim();

    const regex = /^0[0-9]{9}$/;

    if(value===""){
        showError("phone","SĐT không được trống");
        return false;
    }

    if(!regex.test(value)){
        showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
        return false;
    }

    clearError("phone");
    return true;

}

function validatePassword(){

    const value = document.getElementById("password").value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(value===""){
        showError("password","Mật khẩu không được trống");
        return false;
    }

    if(!regex.test(value)){
        showError("password","Ít nhất 8 ký tự, có chữ hoa, chữ thường và số");
        return false;
    }

    clearError("password");
    return true;

}

function validateConfirmPassword(){

    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(confirm===""){
        showError("confirmPassword","Nhập lại mật khẩu");
        return false;
    }

    if(pass!==confirm){
        showError("confirmPassword","Mật khẩu không khớp");
        return false;
    }

    clearError("confirmPassword");
    return true;

}

function validateGender(){

    const genders = document.querySelectorAll("input[name='gender']");

    let checked=false;

    genders.forEach(g=>{
        if(g.checked) checked=true;
    });

    if(!checked){

        const error=document.getElementById("genderError");
        error.innerText="Vui lòng chọn giới tính";
        error.style.display="block";

        return false;
    }

    document.getElementById("genderError").style.display="none";
    return true;

}

function validateTerms(){

    const checked = document.getElementById("terms").checked;

    if(!checked){

        const error=document.getElementById("termsError");
        error.innerText="Bạn phải đồng ý điều khoản";
        error.style.display="block";

        return false;
    }

    document.getElementById("termsError").style.display="none";
    return true;

}

form.addEventListener("submit",function(e){

    e.preventDefault();

    const valid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms();

    if(valid){

        const name = document.getElementById("fullname").value;

        form.style.display="none";

        document.getElementById("successBox").style.display="block";

        document.getElementById("userName").innerText=name;

    }

});

document.getElementById("fullname").addEventListener("blur",validateFullname);
document.getElementById("email").addEventListener("blur",validateEmail);
document.getElementById("phone").addEventListener("blur",validatePhone);
document.getElementById("password").addEventListener("blur",validatePassword);
document.getElementById("confirmPassword").addEventListener("blur",validateConfirmPassword);

document.getElementById("fullname").addEventListener("input",()=>clearError("fullname"));
document.getElementById("email").addEventListener("input",()=>clearError("email"));
document.getElementById("phone").addEventListener("input",()=>clearError("phone"));
document.getElementById("password").addEventListener("input",()=>clearError("password"));
document.getElementById("confirmPassword").addEventListener("input",()=>clearError("confirmPassword"));