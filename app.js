"use strict";
//initialzing class names used 
const addButtonClassName = "container__add--btn";
const groupInputClassName = "container__inputs__list";
const removeButtonClassName = "container__key__value__close--btn";
const singleInputPairClassName = "container__key__value__pair--input-row";
const submitButtonClassName = "container__key__value__submit--btn";
const keyInputsListClassName = "container__key--input";
const valueInputsListClassName = "container__value--input";
const keyWrapperClassName = "container__key__input__wrapper";
const valueWrapperClassName = "container__value__input__wrapper";
const errorMessageClassName = "container__error__message";
const formElementClassName = "container";
//getting the required elements
const createInputFieldButton = document.getElementsByClassName(addButtonClassName)[0];
const createInputFieldElementsParent = document.getElementById(groupInputClassName);
const closeButtonStart = document.getElementsByClassName(removeButtonClassName)[0];
const keyValueRowElement = document.getElementsByClassName(singleInputPairClassName);
const submitButton = document.getElementsByClassName(submitButtonClassName)[0];
const keyElementsList = document.getElementsByClassName(keyInputsListClassName);
const inputFieldKeyStart = keyElementsList[0];
const formElement = document.getElementsByClassName(formElementClassName)[0];
//Error messages
const duplicateKeyErrorMsg = "Please Provide a Unique Key";
const nullKeyErrorMsg = "Please fill the above field it cannot be empty";
const keyLengthErrorMsg = "Please ensure that the key is more than three characters";
//variables used
let keyValuePairs = {};
let keyList = [];
let iserror = false;
let valueBeforeChange;
let duplicateKey;
let duplicateKeyList = [];
function createInputField(event) {
    event.preventDefault();
    //generates the key value pairs
    renderKeyValuePairs();
    //check for error msg and empty fields in all key field
    checkAllKeyFields();
    //no  error means create the new input fields
    if (!iserror && keyElementsList.length == keyList.length) {
        //create a require elements
        const createliElement = document.createElement("li");
        const createKeyInputElement = document.createElement("input");
        const createValueInputElement = document.createElement("input");
        const errorMessageElementKey = document.createElement("p");
        const errorMessageElementValue = document.createElement("p");
        const createDivKeyWrapper = document.createElement("div");
        const createDivValueWrapper = document.createElement("div");
        const removeInputFieldsButton = document.createElement('button');
        //add required  attributes 
        createKeyInputElement.setAttribute("type", "text");
        createValueInputElement.setAttribute("type", "text");
        createKeyInputElement.setAttribute("required", "");
        removeInputFieldsButton.textContent = 'REMOVE';
        //add classes and attach event listeners
        createliElement.classList.add(singleInputPairClassName);
        createDivKeyWrapper.classList.add(keyWrapperClassName);
        createDivValueWrapper.classList.add(valueWrapperClassName);
        createKeyInputElement.classList.add(keyInputsListClassName);
        createValueInputElement.classList.add(valueInputsListClassName);
        removeInputFieldsButton.classList.add(removeButtonClassName);
        errorMessageElementKey.classList.add(errorMessageClassName);
        removeInputFieldsButton.addEventListener("click", removeInputFields);
        createKeyInputElement.addEventListener("change", validateKey);
        //append them all 
        createDivKeyWrapper.append(createKeyInputElement, errorMessageElementKey);
        createDivValueWrapper.append(createValueInputElement, removeInputFieldsButton, errorMessageElementValue);
        createliElement.append(createDivKeyWrapper, createDivValueWrapper);
        createInputFieldElementsParent?.append(createliElement);
    }
}
function validateKey(event) {
    let eventTarget = event.target;
    if (event.target != null) {
        let keyData = eventTarget.value;
        //checking the length of the key 
        if (keyData.length == 0) {
            setError(eventTarget);
            return;
        }
        else if (keyData.length < 3) {
            setError(eventTarget, "length");
            return;
        }
        else {
            removeError(eventTarget);
        }
        //checking previously present or not; 
        if (keyList.includes(keyData)) {
            duplicateKey = keyData;
            //backtracking the non-unique keys for validation purpose (storing in list)
            duplicateKeyList.push(duplicateKey);
            //setting the error 
            setError(eventTarget, "unique");
        }
        else {
            //removes the error 
            removeError(eventTarget);
        }
        // validate in case of unique key error
        if (iserror && keyElementsList.length == keyList.length) {
            console.log("from key vlaid", keyElementsList.length);
            for (let keyElement of keyElementsList) {
                if (keyElement.value == duplicateKey ||
                    duplicateKeyList.includes(keyElement.value)) {
                    removeError(keyElement);
                }
            }
        }
        //generating the key value pair
        renderKeyValuePairs();
    }
}
function setError(eventElement, errorType) {
    iserror = true;
    //adding disabled for submit button (user can't submit form when error)
    submitButton.setAttribute('disabled', '');
    submitButton.classList.add("disabled");
    //error type is used to show multiple contraints 
    if (eventElement.nextElementSibling != null) {
        if (errorType == "unique") {
            eventElement.nextElementSibling.textContent = duplicateKeyErrorMsg;
        }
        else if (errorType == "length") {
            eventElement.nextElementSibling.textContent = keyLengthErrorMsg;
        }
        else {
            eventElement.nextElementSibling.textContent = nullKeyErrorMsg;
        }
    }
}
function removeError(eventElement) {
    //removing disabled  when there is no error
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove("disabled");
    if (eventElement.nextElementSibling != null)
        eventElement.nextElementSibling.textContent = "";
}
function removeInputFields(event) {
    //this will prevent from submitting the  form 
    event.preventDefault();
    let eventTarget = event.target;
    let keyData = "";
    if (eventTarget.parentNode != null && (eventTarget.parentNode instanceof HTMLElement)) {
        if (eventTarget.parentNode.previousElementSibling != null) {
            //getting  which data is removing for validation purpose 
            keyData = eventTarget.parentNode.previousElementSibling.children[0].value;
        }
        if (eventTarget.parentNode.parentNode != null) {
            //removes the selected element
            eventTarget.parentNode.parentNode.remove();
        }
    }
    checkAllKeyFields(keyData);
    //after validation key pairs updated 
    renderKeyValuePairs();
}
function checkAllKeyFields(keyData) {
    for (let keyElement of keyElementsList) {
        //whenever the field is removed it is used to validate it 
        if (keyElement.value == keyData) {
            removeError(keyElement);
            return;
        }
        else if (keyElement.value == '') {
            setError(keyElement);
            iserror = true;
        }
        else if (keyElement.nextElementSibling?.textContent != "") {
            iserror = true;
        }
        else {
            iserror = false;
        }
    }
    //        if ( keyElementsList.length == keyList.length ) {
    //         for (let keyElement of keyElementsList) {
    //             if ((keyElement as HTMLInputElement).value == duplicateKey ||
    //                 duplicateKeyList.includes((keyElement as HTMLInputElement).value)) {
    //                 removeError((keyElement as HTMLInputElement));
    //             }
    //         }
    //    }
}
function renderKeyValuePairs() {
    let key, value, singlePair = {};
    for (let keyValueSingleRow of keyValueRowElement) {
        key = (keyValueSingleRow.children[0]?.children[0]).value;
        value = (keyValueSingleRow.children[1]?.children[0]).value;
        singlePair[key] = value;
        keyValuePairs = singlePair;
    }
    keyList = Object.keys(keyValuePairs);
}
//it indicates the first key value fields
inputFieldKeyStart?.addEventListener("change", validateKey);
//it indicates add button to create a input fields
createInputFieldButton?.addEventListener("click", createInputField);
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAllKeyFields();
    if (!iserror && keyElementsList.length == keyList.length) {
        window.sessionStorage.setItem("key", JSON.stringify(keyValuePairs));
        formElement.submit();
        formElement.reset();
    }
});
//validation scheck 
// code intentation
//avoid if in for use nested for 
//use local storage 
// try to avoid the  if use ? operator 
