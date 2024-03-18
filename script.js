const BASE_URL = "https://api.exchangeratesapi.io/latest";

const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const message = document.querySelector(".msg"); 

const btn = document.querySelector("form button")
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target )
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc; 
}

const mockData = {
    rates:{
        "PKR": 279.39
    }
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }  
   // Construct URL for fetching exchange rates
   const URL = `${BASE_URL}?base=${fromCurr.value}&symbols=${toCurr.value}`;

   try {
       let response = await fetch(URL);
       let data = await response.json();
       if (data.error) {
           message.innerText = JSON.stringify(data.error);
       } else {
           let rate = data.rates[toCurr.value];
           let finalAmount = amtValue * rate;
           message.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
       }
   } catch (error) {
       console.error("Error fetching exchange rates:", error);
       message.innerText = "An error occurred while fetching exchange rates.";
   }

});