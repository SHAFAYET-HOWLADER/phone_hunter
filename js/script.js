
// start js
// load phone data
const loadData = () =>{
  const input = document.getElementById("inputField");
  const errorMsg = document.getElementById("error_msg");
  const inputValue = input.value;
  //clear input
  input.value = "";
  //error handling
  if(inputValue === "" || !isNaN(inputValue)){
    errorMsg.innerText = "! please search by phone name"
  }
  else{
        //fetch phone data
        const url =`https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
        errorMsg.innerText = "";
  }
}
// display phone data
const displayPhone = (phones) =>{
    const showPhone = document.getElementById("display_phone");
    const errorMsg = document.getElementById("error_msg");
    showPhone.textContent = "";
    //error handling
    if(phones.length === 0){
     errorMsg.innerText = "! please input valid phone name"
    }
   else{
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("phone_items");
        div.innerHTML = `
        <img src="${phone.image}">
        <h3>Name : ${phone.phone_name}</h3>
        <h3>Brand : ${phone.brand}</h3>
        <button onclick="phoneDetails('${phone.slug}')">More-Info</button>
        `
        showPhone.appendChild(div);
    });
   }
}

// load phone details
const phoneDetails = (phoneId) =>{
 const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
 fetch(url)
 .then(res => res.json())
 .then(data =>displayInfo(data.data))
}
// display phone details
const displayInfo = (explore) =>{
    console.log(explore)
 const more_info = document.getElementById("display_info");
 more_info.textContent = "";
 const div = document.createElement("div");
 div.classList.add("infos");
 div.innerHTML = `
 <img src="${explore.image}">
 <h3>Name : ${explore.name}</h3>
 <h3>Name : ${explore.releaseDate}</h3>
 <p>Features : ${explore.mainFeatures.chipSet}
                         ${explore.mainFeatures.displaySize}
                         ${explore.mainFeatures.memory}
        Sensors :   ${explore.mainFeatures.sensors}
          ${explore.others.Bluetooth}
          ${explore.others.GPS}
          ${explore.others.NFC}
          ${explore.others.Radio}
          ${explore.others.USB}
          ${explore.others.WLAN}
 </p>
 `
 more_info.appendChild(div)
}