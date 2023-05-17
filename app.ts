
let createInputFieldButton: HTMLButtonElement | null = document.querySelector(".container__add--btn");

let createInputFieldElementsParent: HTMLUListElement | null = document.querySelector("#container__inputs__list");

let inputFieldKeyStart = document.querySelector(".container__key--input");

let closeButtonStart = document.querySelector(".container__key__value__close--btn");

 let keyValueRowElement = document.getElementsByClassName("container__key__value__pair--input-row");

let keyValuePairs: object = {} ;

let keyElementsList = document.getElementsByClassName("container__key--input");

let keyList: Array<string> = [];

let iserror = false;
let isUnique = true;
let isEmpty :boolean = true;

// let isthere :boolean = true;

function setError(event: any) {
    iserror = true
    if (!isKeyUnique(event)) {
        event.target.nextElementSibling.style.color = "red";
        event.target.nextElementSibling.textContent = "Please Provide a Unique Key";
    }

    if (isEmpty) {
        event.target.nextElementSibling.style.color = "blue";
        event.target.nextElementSibling.textContent = "Key Cannot be empty";
    }

}

function removeError(event : any ) {
    iserror = false;
    event.target.nextElementSibling.textContent = "";
}

function removeInputFields(event: any) {

    event.preventDefault();

    let val = event.target.parentNode.previousElementSibling.children[0].value;

    event.target.parentNode.parentNode.remove();

    //reset
    isUnique = true;
    isEmpty = false; 

    let removedValue: string = '';
 
    let index = keyList.indexOf(val);
    removedValue = keyList[index];
    keyList.splice(index, 1);

    //NEEDS TO VALIDATE HERE 
    for (let i of keyElementsList) {
        if ((i as HTMLInputElement).value == removedValue) {
            if (i.nextElementSibling) {
                i.nextElementSibling.textContent = "";
                keyList.push( (i as HTMLInputElement).value);
                iserror = false;
            }
        }
    }

}


function validateKey(event: any) {

    isEmpty = isKeyempty(event);


    if (isEmpty) {
        setError(event);
    } 
    else  
    {
        removeError(event);
        isUnique = isKeyUnique(event);
        if (!isUnique) {
            setError(event);
        } else {

            // for (let i of keyElementsList) {
            //     if (i.nextElementSibling.text) {
            //         i.nextElementSibling.textContent = "";
            //    }
            // }

            removeError(event);
        }
        
    }


    
    // if (isEmpty) {
    //     setError(event);
    // }

    // else {

    //     removeError(event);

    // }

    // if (!isEmpty) {

    //     isUnique = isKeyUnique(event);

    //     if (!isUnique || isEmpty) {
    //         setError(event);
             
    //     }

    //     else {

    //         removeError(event);

    //     }
    // }
}  



function isKeyUnique(event: any) {
    
    let key = event.target.value;
    if (keyList.includes(key) && keyElementsList.length != keyList.length) {
        return false;
    } 

    if (key) {
        keyList = [];
        
        for (let keyElement of keyElementsList) {
            if (!keyList.includes(key)) {
                keyList.push((keyElement as HTMLInputElement).value);
            }
        }
    }
    
return true; 
}


function isKeyempty(event : any ) {
        if(!event.target.value)
            return true
    return false;
}


function createInputField (event:any) {

    event.preventDefault();
    checkAllkeyFields();
    if (isUnique && !isEmpty && !iserror)
    {
        //create a require elements
        getKeyValuePair();
        let createliElement = document.createElement("li");
        let createKeyInputElement = document.createElement("input");
        let createValueInputElement = document.createElement("input");
        let errorMessageElementKey = document.createElement("p");
        let errorMessageElementValue = document.createElement("p");
        let createDivKeyWrapper = document.createElement("div");
        let createDivValueWrapper = document.createElement("div");
        let removeInputFieldsButton = document.createElement('button');
    
        //add requires classes and attributes 
     
        createKeyInputElement.setAttribute("type", "text");
        createValueInputElement.setAttribute("type", "text");
        removeInputFieldsButton.textContent = 'REMOVE';
    
        //add classes and attach event listeners 
        createliElement.classList.add("container__key__value__pair--input-row");
        createDivKeyWrapper.classList.add("container__key__input__wrapper");
        createDivValueWrapper.classList.add("container__value__input__wrapper")
        createKeyInputElement.classList.add("container__key--input");
        createValueInputElement.classList.add("container__value--input");
        removeInputFieldsButton.classList.add("container__key__value__close--btn");
        removeInputFieldsButton.addEventListener("click", removeInputFields);
        createKeyInputElement.addEventListener("change", validateKey);
        //createValueInputElement.addEventListener("change", validateKey); 
    
        //append them all 
        createDivKeyWrapper.append(createKeyInputElement, errorMessageElementKey);
        createDivValueWrapper.append(createValueInputElement, removeInputFieldsButton, errorMessageElementValue);
        createliElement.append(createDivKeyWrapper, createDivValueWrapper);
        createInputFieldElementsParent?.append(createliElement);
    }
}

inputFieldKeyStart?.addEventListener("change", validateKey);

//inputFieldKeyStart?.addEventListener('change', validateKey);

// closeButtonStart?.addEventListener("click", removeInputFields);


createInputFieldButton?.addEventListener("click", createInputField);





function checkAllkeyFields() {
    
    for (let k of keyElementsList) {

        if ((k as HTMLInputElement).value == '') {
            isEmpty = true;
        }

        if (k.nextElementSibling?.textContent != "") {
            iserror = true;
        }
       
        
    }

}


function getKeyValuePair() {
    
    let key, value, singlePair:{ [n: string] : string} = {};
    
    for (let keyValueSingleRow of keyValueRowElement) {
        key = (keyValueSingleRow.children[0].children[0] as HTMLInputElement) .value;
        value = (keyValueSingleRow.children[1].children[0] as HTMLInputElement).value;
        singlePair[key] = value
        console.log(singlePair);
        keyValuePairs = singlePair;
    }
}



//keylist update on every change