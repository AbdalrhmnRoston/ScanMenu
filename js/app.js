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
            section.setAttribute('data-section', i);
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
                item.id = c;
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
                select.setAttribute('data-id', c);
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
                el.innerHTML = obj[parent.children[i].value];
            }
        }
        parent.addEventListener('change', function (e, i) {
            e.target.parentElement.children[1].innerHTML = obj[e.target.value];
        })
    }


    let order = {};
    window.localStorage.getItem('Orders') ? order = JSON.parse(window.localStorage.getItem('Orders')): '';


    
    let chick = setInterval(() => {
        if (myrecust.readyState === 4 && myrecust.status === 200) {
            let btnAdd = document.querySelectorAll('.add-item');


            btnAdd.forEach((el) => {
                el.addEventListener('click', function () {
                    addInOrders(el);
                })

            })
            return clearInterval(chick);
        }
    }, 10);



    function addInOrders(el) {
        let random = Math.floor(Math.random() * 10000);
        order[random] = el.parentElement;

        order[random].name = el.parentElement.children[0].innerHTML;
        order[random].size = getSize(el.parentElement.children[2].children[0]);
        order[random].code = el.parentElement.id;
        order[random].price = el.parentElement.children[2].children[1].innerHTML;

        window.localStorage.setItem('Orders', JSON.stringify(order));
        addToInvoesPage(order, random);
    }

    function getSize(e) {
        for (let i = 0; i < e.children.length; i++) {
            if (e.children[i].selected) {
                return e.children[i].innerHTML;
            }
        }
    }


    function getOrders() {
        let totalPrice = 0;
        let section = document.createElement('section');
        section.className = 'invoice';
        mobile.appendChild(section);
        let left = document.createElement('div');
        left.className = 'left';
        section.appendChild(left);
        let right = document.createElement('div');
        right.className = 'right';
        section.appendChild(right);
        let h3 = document.createElement('h3');
        h3.innerHTML = 'Arrange your order';
        section.appendChild(h3);
    for (i in order) {
        totalPrice += +order[i].price;
        let item = document.createElement('div');
        item.className = 'item-order';
        section.appendChild(item);
        let name = document.createElement('div');
        name.innerHTML = order[i].name;
        item.appendChild(name);
        let size = document.createElement('div');
        size.className = 'size';
        size.innerHTML = order[i].size;
        item.appendChild(size);
        let price = document.createElement('div');
        price.className = 'price';
        price.innerHTML = order[i].price;
        item.appendChild(price);
        let icon = document.createElement('i');
        icon.classList.add('far');
        icon.classList.add('fa-trash-alt');
        icon.classList.add('remove');
        item.appendChild(icon);
        
    }
    let totale = document.createElement('div');
    totale.classList.add('totale');
    totale.innerHTML = `Totale is : ${totalPrice}:EGP`;    
    section.appendChild(totale);
    }
    getOrders();


    function addToInvoesPage(order, random) {
        let sectionInvo = document.querySelector('.invoice');
        

        let item = document.createElement('div');
        item.className = 'item-order';
        sectionInvo.appendChild(item);
        let name = document.createElement('div');
        name.innerHTML = order[random].name;
        item.appendChild(name);
        let size = document.createElement('div');
        size.className = 'size';
        size.innerHTML = order[random].size;
        item.appendChild(size);
        let price = document.createElement('div');
        price.className = 'price';
        price.innerHTML = order[random].price;
        item.appendChild(price);
        let icon = document.createElement('i');
        icon.classList.add('far');
        icon.classList.add('fa-trash-alt');
        icon.classList.add('remove');
        item.style.order = '1';
        item.appendChild(icon);
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
