
// start js
// load phone data
const loadData = () =>{
  const input = document.getElementById("inputField");
  const inputValue = input.value;
  //clear input
  input.value = "";
  //fetch phone data
  const url =`https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhone(data.data))
}
// display phone data
const displayPhone = (phones) =>{
    const showPhone = document.getElementById("display_phone");
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement("div");
        div.classList.add("phone_items");
        div.innerHTML = `
        <img src="${phone.image}">
        <h3>Name : ${phone.phone_name}</h3>
        <h3>Brand : ${phone.brand}</h3>
        <button>More-Info</button>
        `
        showPhone.appendChild(div);
    });
}
