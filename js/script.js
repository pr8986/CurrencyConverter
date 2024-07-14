const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Function to update the exchange rate
const updateExchangeRate = async () => {
    // Get the amount value
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    // Validate amount
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // Fetch exchange rate data
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/currencies/${fromCurrency}.json`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch exchange rate data`);
        }
        const data = await response.json();
        const rate = data[fromCurrency][toCurrency];

        // Calculate final amount
        let finalAmount = amtVal * rate;

        // Update message
        msg.innerText = `${amtVal} ${fromCurrency.toUpperCase()} = ${finalAmount} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Function to update the flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Event listeners for dropdown changes
for (let select of dropdowns) {
    for(currCode in countryList)
    {
        let newOption=document.createElement("option");
            newOption.innerText=currCode;
            newOption.innerValue=currCode;
            if(select.name === "from" && currCode === "USD")
            {
                newOption.selected="selected"
            }
            else if(select.name === "to" && currCode === "INR")
            {
                newOption.selected="selected"
            }
            select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        updateExchangeRate();
    });
}

// Event listener for button click
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Initial call to update exchange rate
updateExchangeRate();

