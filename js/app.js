let data = '';
let Currency = ' :EGP';


// function getData() {
//     if (window.localStorage.getItem('Items')) {
//         data = JSON.parse(window.localStorage.getItem('Items'));
//     } else {
//         setTimeout(() => {
//             data = JSON.parse(window.localStorage.getItem('Items'));
//         }, 2000);
//     }
// }
// getData()


let ourMenu = document.getElementById('our-menu');
let btnOurMenu = document.querySelector('.our-menu h4');


    btnOurMenu.addEventListener('click', ()=> removeActive(ourMenu));

    function removeActive (el) {
        el.classList.toggle('active');
    };




let mobile = document.getElementById('mobile');
let myrecust = new XMLHttpRequest();
myrecust.onreadystatechange = function () {

    if (this.status === 200 && this.readyState === 4) {
        window.localStorage.setItem('Items', this.responseText);
        data = JSON.parse(this.responseText);
        for (i in data) {
            // Create Main Section 
            let section = document.createElement('section');
            mobile.appendChild(section);
            // Create Hedeng Section
            let headeing = document.createElement('h4');
            headeing.className = 'head-section';
            // Ineer Name Section
            headeing.innerHTML = i;
            section.appendChild(headeing);
            // Create Countinar Elements
            let elItems = document.createElement('div');
            elItems.className = 'items';
            section.appendChild(elItems);
            for (c in data[i]) {
                let item = document.createElement('div');
                item.className = 'item';
                elItems.appendChild(item);
                let nameItem = document.createElement('div');
                nameItem.className = 'name';
                nameItem.innerHTML = data[i][c].name;
                item.appendChild(nameItem);
                let desc = document.createElement('div');
                desc.className = 'desc';
                desc.innerHTML = data[i][c].dec;
                item.appendChild(desc);
                let sizPrice = document.createElement('div');
                sizPrice.className = 'size-price';
                item.appendChild(sizPrice);
                let select = document.createElement('select');
                select.name = 'size';
                select.id = c;
                sizPrice.appendChild(select);
                let optionSmull = document.createElement('option');
                optionSmull.value = 'smull';
                optionSmull.innerHTML = 'Smull';
                select.appendChild(optionSmull);
                let optionMedum = document.createElement('option');
                optionMedum.value = 'medium';
                optionMedum.innerHTML = 'Medium';
                select.appendChild(optionMedum);
                let optionLarge = document.createElement('option');
                optionLarge.value = 'large';
                optionLarge.innerHTML = 'Large';
                select.appendChild(optionLarge);
                let spanPrice = document.createElement('span');
                spanPrice.className = 'prise';
                getPrice(select, spanPrice, data[i][c]);
                sizPrice.appendChild(spanPrice);
                let spanAdd = document.createElement('span');
                spanAdd.innerHTML = '+';
                spanAdd.className = 'add-item';
                item.appendChild(spanAdd);
            }
        }
    }
}

myrecust.open('GET', 'js/items-en.json', true);
myrecust.send();


    function getPrice(parent, el, obj) {

        for (let i = 0; i < parent.length; i++) {
            if (parent.children[i].selected) {
                el.innerHTML = obj[parent.children[i].value] + Currency;
            }
        }
        parent.addEventListener('change', function (e, i) {
            e.target.parentElement.children[1].innerHTML = obj[e.target.value] + Currency;
        })
    }

















    // function getPrice(el, obj, prise) {
    //     let selectPrice = '';
        
    //     for (let p = 0; p < el.length; p++) {
    //         if (el[p].selected === true) {  
    //             selectPrice = `${obj[el[p].value]}${Currency}`;
    //         }
    //     }
    //     return selectPrice;
    // }