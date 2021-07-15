let carts = document.querySelectorAll(".add_cart");
let products = [
    {
        name: "Panda hoodie",
        tag: "shirt1",
        price: 20,
        inCart: 0  
    },
    {
        name: "Black hoodie",
        tag: "shirt2",
        price: 15,
        inCart: 0  
    },
    {
        name: "Printed hoodie",
        tag: "shirt3",
        price: 25,
        inCart: 0  
    },
    {
        name: "Tendance hoodie",
        tag: "shirt4",
        price: 30,
        inCart: 0  
    },
    {
        name: "Adidas hoodie",
        tag: "shirt5",
        price: 50,
        inCart: 0  
    },
    {
        name: "Kitty Cat hoodie",
        tag: "shirt6",
        price: 20,
        inCart: 0  
    },
];
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        cartnumber(products[i]);
        total(products[i]);
    })
}
function savecartnumber() {
    let productnumber = localStorage.getItem("cartnumber");
    if (productnumber) {
        document.querySelector(".cart span").textContent = productnumber;
    }
}
function cartnumber (products) {
    let productnumber = localStorage.getItem("cartnumber");
    productnumber = parseInt (productnumber);
    if (productnumber) {
        localStorage.setItem("cartnumber", productnumber + 1);
        document.querySelector(".cart span").textContent = productnumber + 1;
    }
    else {
        localStorage.setItem("cartnumber", 1);
        document.querySelector(".cart span").textContent = 1;
    }
    setItems(products);
    
}
function setItems(products) {
    let cartitems = localStorage.getItem("productsincart");
    cartitems = JSON.parse(cartitems);
    if (cartitems != null) {
        if (cartitems[products.tag] == undefined){
            cartitems= {
                ...cartitems,
                [products.tag]: products
            }
        }
        cartitems[products.tag].inCart+= 1;
    }
    else {
        products.inCart = 1;
        cartitems = {
            [products.tag]: products
        }
    }
    localStorage.setItem("productsincart", JSON.stringify(cartitems));
}
function total(products) {
    let cartcost = localStorage.getItem("total");
    if (cartcost != null) {
        cartcost = parseInt(cartcost);
        localStorage.setItem("total", cartcost + products.price);
    } else {
        localStorage.setItem("total", products.price);
    }
}
function displaycart() {
    let cartitems = localStorage.getItem("productsincart");
    cartitems = JSON.parse(cartitems);
    let product_container = document.querySelector(".products");
    let cartcost = localStorage.getItem("total");
    if (cartitems && product_container) {
        product_container.innerHTML = "";
        Object.values(cartitems).map(item => {
             product_container.innerHTML += `
             <div id=azer> 
            <div class="product">
                <ion-icon onclick="remove()" name="trash"></ion-icon>
                <img src ="./img/${item.tag}.jpg" width=75px height=75px>
                <span>${item.name}</span>
            </div>
            <div class="price">
                $${item.price}
            </div>
            <div class="quantity">
                <ion-icon name="add-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="remove-circle"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}
            </div>
            </div>
             `
        })
        product_container.innerHTML += `
            <div class="cartTotalTontainer">
                <h4 class="cartTotalTitle">
                    Total Price :
                </h4>
                <h4 class="cartTotal">
                    $${cartcost}
        `
    }

}
function like(id){
    if(document.getElementById(id).style.color == "red"){
        document.getElementById(id).style.color = "grey"
    }else
    document.getElementById(id).style.color = "red"
}
function remove(){
    let ttt=document.getElementById("azer")
    ttt.remove();
    window.localStorage.removeItem('productsincart');
    total();
}
function removeall(){
    window.localStorage.clear();
    window.location.reload();
}
savecartnumber();
displaycart()