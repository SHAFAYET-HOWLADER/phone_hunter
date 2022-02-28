//adding spinner
const loading = (progress) =>{
    document.getElementById("spinner").style.display = progress;
}
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
        loading("block")
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
    loading("none")
    }
   else{
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("phone_items");
        div.innerHTML = `
        <img src="${phone.image}">
        <h3>Name : ${phone.phone_name} </h3> 
        <h3>Brand : ${phone.brand}</h3>
        <button onclick="phoneDetails('${phone.slug}')">More-Info</button>
        `
        showPhone.appendChild(div);
    });
    loading("none")
   }
}

// load phone details
const phoneDetails = (phoneId) =>{
 const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
 fetch(url)
 .then(res => res.json())
 .then(data =>displayInfo(data.data))
 loading("block")
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
 <h3>Name : </h3>${explore.name}
 <h3>Release Date : </h3>${explore.releaseDate ? explore.releaseDate : "Not Found"}
 <p><h3>Features :</h3><p>ChipSet : </p>${explore.mainFeatures.chipSet}
                       <p>DisplaySize : </p>  ${explore.mainFeatures.displaySize}
                       <p>Memory :</p>  ${explore.mainFeatures.memory}
        <h3>Sensors :</h3><p>${explore.mainFeatures.sensors}</p>
        <h3>Others :</h3> <p>Bluetooth : ${explore.others.Bluetooth}</p>
        <p>GPS : ${explore.others.GPS}</p>
        <p>NFC : ${explore.others.NFC}</p>
        <p>Radio : ${explore.others.Radio}</p>
        <p>USB : ${explore.others.USB}</p>
        <p>WLAN : ${explore.others.WLAN}</p>
 </p>
 `
 more_info.appendChild(div)
 loading("none")
}

