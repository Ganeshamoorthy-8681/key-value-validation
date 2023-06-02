"use strict";
window.addEventListener("load", (e) => {
    let keyValues = window.sessionStorage.getItem("key");
    if (keyValues == null)
        return;
    let keyValue = JSON.parse(keyValues);
    console.log(keyValue);
    for (let key in keyValue) {
        let keyValueRow = document.createElement('li');
        let keyElement = document.createElement('span');
        let ValueElement = document.createElement('span');
        let inputsList = document.getElementById("container");
        keyElement.classList.add('container__key');
        ValueElement.classList.add('container__value');
        keyValueRow.classList.add("container__keyValuePair__row");
        let value = keyValue[key];
        if (value == '') {
            value = "null";
        }
        keyElement.textContent = key;
        ValueElement.textContent = value;
        keyValueRow.append(keyElement, ValueElement);
        inputsList?.append(keyValueRow);
    }
});
