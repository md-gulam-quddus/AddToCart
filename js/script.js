// select Ui
let cartItemList = document.querySelector('#cartItemList');

let list = document.querySelector('#cartItemList');

// Class
class Product{
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class UI{
    constructor(){

    }

    addToCartProduct(product){
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><button class="btn btn-danger" data-id="${product.id}" id="remove">Remove</button></td>
        <hr>
        `
        list.appendChild(row);
    }
    showAlertMessage(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message))
        let container = document.querySelector('.message-container');
        let row = document.querySelector('.row-message');
        container.insertBefore(div, row);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000);
    }

    removeToCart(target){
        if(target){
            target.parentElement.parentElement.remove();
        }
        this.showAlertMessage('Item Deleted Successfully', 'alert-danger');        
    }
}

// add Event Listener
cartItemList.addEventListener('click', removeItem);

// Data Receive form json file
fetch('./js/productList.json')
    .then(response => response.json())
    .then(data => {
        let item = data.data;
        if(item.length > 0){
            let temp = '';
            item.forEach(element => {
                temp += `<tr>`
                temp += `<th id="pId" scope="row">${element.id}</th>`
                temp += `<td id="pName">${element.name}</td>`
                temp += `<td id="pPrice">${element.price}</td>`
                temp += `<td>${element.color}</td>`                
                temp += `<td><button class="btn btn-success" data-id="${element.id}" id="addToCart">Add To Cart </button></td>`                
                temp += `</tr>` 
                document.querySelector('#item').innerHTML = temp;             
            });
            
            
            // Select Ui
            let cartItem = document.querySelectorAll('button[data-id]');

            
            for(let i=0; i < cartItem.length; i++){
                cartItem[i].addEventListener('click', ()=>{
                    let singleElement = cartItem[i].parentElement.parentElement;
                    let id = singleElement.querySelector('#pId').innerHTML;
                    let name = singleElement.querySelector('#pName').innerHTML;
                    let price = singleElement.querySelector('#pPrice').innerHTML;
                    addToCart(id, name, price);
                })
            }

            function addToCart(id, name, price){
                let product = new Product(id, name, price)
                let ui = new UI();
                ui.addToCartProduct(product);
                ui.showAlertMessage('Item Added Successfully', 'alert-success');
            }
        }
    })

// Define function

function removeItem(e){
    let ui = new UI();
    ui.removeToCart(e.target);
}






