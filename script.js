const calculatorState = {
    tip: 0,
    currency: "₹"
};

window.onload = () => {
    document.querySelector("#calculate").onclick = calculateTip;
    document.querySelector("#reset").onclick = resetValues;
    const tips = document.querySelectorAll(".tip");
    tips.forEach(tip => {
        tip.addEventListener("click", handleTipClick);
    });
    document.querySelector("#customTip").addEventListener("input", handleCustomTip);
    document.querySelector("#currency").addEventListener("change", handleCurrencyChange);
};

function handleCurrencyChange(e) {
    calculatorState.currency = e.target.value;
    document.querySelector("#tipCurrency").innerText = calculatorState.currency;
    document.querySelector("#totalCurrency").innerText = calculatorState.currency;
}

function handleTipClick(e) {
    calculatorState.tip = Number(e.target.textContent.replace("%", ""));
    document.querySelectorAll(".tip").forEach(tip => {
        tip.classList.remove("selected");
    });
    e.target.classList.add("selected");
    document.querySelector("#customTip").value = "";
}

function handleCustomTip(e) {
    const customTip = Number(e.target.value);
    calculatorState.tip = customTip;
    document.querySelectorAll(".tip").forEach(tip => {
        tip.classList.remove("selected");
    });
}

function calculateTip() {
    const amount = Number(document.querySelector("#amount").value);
    const people = Number(document.querySelector("#people").value);
    if (!amount || amount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
    }
    if (!people || people <= 0) {
        alert("Please enter the number of people sharing the bill.");
        return;
    }
    if (calculatorState.tip < 0) {
        alert("Tip percentage cannot be negative.");
        return;
    }
    const tip = (amount * calculatorState.tip) / 100;
    const tipPerPerson = tip / people;
    const billPerPerson = (amount + tip) / people;
    document.querySelector("#tipCurrency").innerText = calculatorState.currency;
    document.querySelector("#totalCurrency").innerText = calculatorState.currency;
    document.querySelector("#tipamount").innerText = tipPerPerson.toFixed(2);
    document.querySelector("#totalamount").innerText = billPerPerson.toFixed(2);
}

function resetValues() {
    calculatorState.tip = 0;
    calculatorState.currency = "₹";
    document.querySelector("#amount").value = "";
    document.querySelector("#people").value = "1";
    document.querySelector("#customTip").value = "";
    document.querySelector("#currency").value = "₹";
    document.querySelector("#tipCurrency").innerText = "₹";
    document.querySelector("#totalCurrency").innerText = "₹";
    document.querySelector("#tipamount").innerText = "0";
    document.querySelector("#totalamount").innerText = "0";
    document.querySelectorAll(".tip").forEach(tip => {
        tip.classList.remove("selected");
    });
}