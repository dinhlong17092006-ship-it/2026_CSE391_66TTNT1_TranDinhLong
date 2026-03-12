const form = document.getElementById("orderForm");

const prices = {
    laptop:20000000,
    phone:10000000,
    headphone:2000000
};

function showError(id,msg){

    const error = document.getElementById(id+"Error");
    const field = document.getElementById(id);

    error.innerText=msg;
    error.style.display="block";

    if(field){
        field.classList.add("invalid");
    }
}

function clearError(id){

    const error = document.getElementById(id+"Error");
    const field = document.getElementById(id);

    if(error) error.style.display="none";
    if(field){
        field.classList.remove("invalid");
        field.classList.add("success");
    }
}

function validateProduct(){

    const value=document.getElementById("product").value;

    if(value===""){
        showError("product","Vui lòng chọn sản phẩm");
        return false;
    }

    clearError("product");
    return true;
}

function validateQuantity(){

    const q=parseInt(document.getElementById("quantity").value);

    if(isNaN(q) || q<1 || q>99){
        showError("quantity","Số lượng 1-99");
        return false;
    }

    clearError("quantity");
    return true;
}

function validateDate(){

    const value=document.getElementById("deliveryDate").value;

    if(value===""){
        showError("date","Chọn ngày giao");
        return false;
    }

    const today=new Date();
    const selected=new Date(value);

    const max=new Date();
    max.setDate(today.getDate()+30);

    if(selected < today){
        showError("date","Không chọn ngày quá khứ");
        return false;
    }

    if(selected > max){
        showError("date","Không quá 30 ngày");
        return false;
    }

    clearError("date");
    return true;
}

function validateAddress(){

    const value=document.getElementById("address").value.trim();

    if(value.length<10){
        showError("address","Ít nhất 10 ký tự");
        return false;
    }

    clearError("address");
    return true;
}

function validateNote(){

    const value=document.getElementById("note").value;

    if(value.length>200){
        showError("note","Không quá 200 ký tự");
        return false;
    }

    clearError("note");
    return true;
}

function validatePayment(){

    const radios=document.querySelectorAll("input[name='payment']");
    let checked=false;

    radios.forEach(r=>{
        if(r.checked) checked=true;
    });

    if(!checked){
        document.getElementById("paymentError").innerText="Chọn phương thức thanh toán";
        document.getElementById("paymentError").style.display="block";
        return false;
    }

    document.getElementById("paymentError").style.display="none";
    return true;
}

function updateTotal(){

    const product=document.getElementById("product").value;
    const quantity=parseInt(document.getElementById("quantity").value);

    if(product && quantity){
        const total=prices[product]*quantity;
        document.getElementById("totalPrice").innerText=total.toLocaleString();
    }else{
        document.getElementById("totalPrice").innerText="0";
    }
}

const note=document.getElementById("note");
const counter=document.getElementById("noteCounter");

note.addEventListener("input",function(){

    const len=this.value.length;

    counter.innerText=len+"/200";

    if(len>200){
        counter.classList.add("limit");
    }else{
        counter.classList.remove("limit");
    }

    validateNote();
});

document.getElementById("product").addEventListener("change",updateTotal);
document.getElementById("quantity").addEventListener("input",updateTotal);

form.addEventListener("submit",function(e){

    e.preventDefault();

    const valid=
    validateProduct() &
    validateQuantity() &
    validateDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

    if(valid){

        document.getElementById("sumProduct").innerText=document.getElementById("product").selectedOptions[0].text;
        document.getElementById("sumQuantity").innerText=document.getElementById("quantity").value;
        document.getElementById("sumPrice").innerText=document.getElementById("totalPrice").innerText+" VNĐ";
        document.getElementById("sumDate").innerText=document.getElementById("deliveryDate").value;

        document.getElementById("orderSummary").style.display="block";

    }

});

document.getElementById("confirmBtn").addEventListener("click",function(){

    document.getElementById("orderSummary").style.display="none";
    form.style.display="none";
    document.getElementById("successBox").style.display="block";

});

document.getElementById("cancelBtn").addEventListener("click",function(){

    document.getElementById("orderSummary").style.display="none";

});