   window.addEventListener("load",(e)=>{

    let keyValues :string | null = window.sessionStorage.getItem("key") ;
    
    if (keyValues == null)
        return
    
    let keyValue =  JSON.parse(keyValues) ;

    console.log(keyValue);
       
    for(let key   in keyValue ){

        let keyValueRow:HTMLLIElement  = document.createElement('li');
        let keyElement:HTMLSpanElement = document.createElement('span');
        let ValueElement:HTMLSpanElement = document.createElement('span');
        let inputsList = document.getElementById("container") as HTMLUListElement;
    
        keyElement.classList.add('container__key');
        ValueElement.classList.add('container__value');
        keyValueRow.classList.add("container__keyValuePair__row");
        
        let value = keyValue[key];

        
        if(value == ''){
            value = "null";
        }

        keyElement.textContent = key
        ValueElement.textContent = value;
    
        keyValueRow.append(keyElement ,ValueElement);
        inputsList?.append(keyValueRow);
    }
})