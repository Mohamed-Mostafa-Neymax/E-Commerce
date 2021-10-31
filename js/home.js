window.onload = function () {
    let mylist = document.getElementById("products")
    homeCart();
    let myServer = new XMLHttpRequest();
    myServer.open("get", "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json");
    myServer.send();

    myServer.onreadystatechange = function () {
        if (this.readyState == 4) {
            let allData = JSON.parse(this.responseText);
            let data = allData["ProductCollection"];
            localStorage.setItem("allProucts", JSON.stringify(data));
            for (let i = 0; i < data.length; i++) {
                let productDiv = document.createElement("div");
                productDiv.classList.add("card");
                productDiv.classList.add("m-2");
                productDiv.style.width = "300px";

                let viewProduct = document.createElement("a");
                viewProduct.href = "pages/viewProduct.html?id="+data[i].ProductId;
                let productImg = document.createElement("img");
                productImg.src = data[i].ProductPicUrl;
                productImg.alt = data[i].Name;
                productImg.classList.add("card-img-top");
                productImg.style.height = "300px";

                viewProduct.appendChild(productImg);

                let productBodyDiv = document.createElement("div");
                productBodyDiv.classList.add("card-body");

                let productName = document.createElement("h4");
                let productNameText = document.createTextNode(data[i].Name);
                productName.classList.add("card-title")
                productName.classList.add("text-primary")
                productName.appendChild(productNameText);


                let productPrice = document.createElement("p");
                let productPriceText = document.createTextNode("$" + data[i].Price)
                productPrice.classList.add("text-danger")
                productPrice.appendChild(productPriceText)
                productPrice.style.display = "inline-block"

                let cartImg = document.createElement("img");
                cartImg.src = "images/shopping-cart.png"
                cartImg.alt = "shopping cart image"
                cartImg.style.float = "right";
                cartImg.style.cursor = 'pointer';
                cartImg.addEventListener('click', addToCart);

                productBodyDiv.appendChild(productName);
                productBodyDiv.appendChild(productPrice);
                productBodyDiv.appendChild(cartImg);
                productDiv.appendChild(viewProduct);
                productDiv.appendChild(productBodyDiv);
                mylist.appendChild(productDiv);
            }
        }
    };
}
function addToCart(e) {

    let tar = e.target;
    let parent = tar.parentElement;
    let prouctBody = parent.innerText;
    let productData = prouctBody.split("$");

    let imgSrc = parent.parentElement.getElementsByClassName('card-img-top')[0].src;
    let productName = productData[0].trim();
    let productPrice = productData[1].trim();

    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    let check = cartItems.filter(function (item) { return item.name === productName; });

    if (check.length == 0) {
        let product = {
            name: productName,
            price: productPrice,
            imgSrc: imgSrc,
            quantity: 1
        };
        cartItems.push(product);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        homeCart();
    } else {
       // alert("This items Added Befor ");
        let prouchtIndex = cartItems.findIndex(product => product.name === productName);
        cartItems[prouchtIndex].quantity +=1;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        homeCart();
    }
}

function homeCart() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    let productsNum = 0;
    let productsPrice = 0;
    cartItems.forEach(function (item) {
        productsPrice += (parseFloat(item.price)*item.quantity);
        productsNum += item.quantity;
    });
    document.getElementById("productsPrice").innerHTML = "$" + productsPrice;
    document.getElementById("productsNum").innerHTML = productsNum;

}
