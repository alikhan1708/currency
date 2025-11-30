let API_KEY = 'b32f3a6c121b152e79e64926';
let API_URL = 'https://v6.exchangerate-api.com/v6/' + API_KEY + '/latest/';

function convertCurrency() {
    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;
    let resultField = document.getElementById('result');

    if (!amount || amount <= 0) {
        resultField.innerText = "Введите корректную сумму!";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL + fromCurrency, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let rate = data.conversion_rates[toCurrency];
            let convertedAmount = (amount * rate).toFixed(2);
            resultField.innerText = amount + " " + fromCurrency + " = " + convertedAmount + " " + toCurrency;
        } else if (xhr.readyState === 4) {
            resultField.innerText = "Ошибка загрузки курсов валют!";
        }
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("convertBtn").addEventListener("click", convertCurrency);
});

