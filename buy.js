let products=[
{name:"iPhone 15",category:"Electronics",price:55000,emoji:"📱",seller:"Poovisha"},
{name:"Wireless Headphones",category:"Electronics",price:1999,emoji:"🎧",seller:"Arun"},
{name:"Laptop",category:"Electronics",price:45000,emoji:"💻",seller:"Rahul"},
{name:"Denim Jacket",category:"Fashion",price:1499,emoji:"🧥",seller:"Swathi"},
{name:"Sneakers",category:"Fashion",price:2499,emoji:"👟",seller:"Shiva"},
{name:"Programming Book",category:"Books",price:599,emoji:"📚",seller:"Priya"},
{name:"Study Table",category:"Furniture",price:3500,emoji:"🪑",seller:"Nivetha"},
{name:"Football",category:"Sports",price:899,emoji:"⚽",seller:"Mega"},
{name:"Makeup Kit",category:"Beauty",price:1299,emoji:"💄",seller:"Vaishu"}
];

let cart=[];
let sellingProducts=0;

function showPage(pageName){
document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active");
});
document.getElementById(pageName).classList.add("active");
window.scrollTo(0,0);
}

function displayProducts(list=products){
const container=document.getElementById("productContainer");
container.innerHTML="";
list.forEach((product,index)=>{
container.innerHTML+=`
<div class="product-card">
<div class="product-image">${product.emoji}</div>
<div class="product-info">
<h3>${product.name}</h3>
<p>${product.category}</p>
<p>Seller: ${product.seller}</p>
<div class="price">₹${product.price}</div>
<div class="product-buttons">
<button class="buy" onclick="addToCart(${index})">Add to Cart</button>
<button class="wishlist" onclick="wishlist()">❤️</button>
</div>
</div>
</div>
`;
});
}

function searchProducts(){
const value=document.getElementById("searchInput").value.toLowerCase();
const result=products.filter(product=>product.name.toLowerCase().includes(value)||product.category.toLowerCase().includes(value));
displayProducts(result);
}

function filterCategory(category){
if(category==="All"){
displayProducts();
return;
}
const result=products.filter(product=>product.category===category);
displayProducts(result);
}

function addToCart(index){
const product=products[index];
const existing=cart.find(item=>item.name===product.name);
if(existing){
existing.quantity++;
}else{
cart.push({...product,quantity:1});
}
updateCart();
alert(product.name+" added to cart! 🛒");
}

function updateCart(){
const container=document.getElementById("cartItems");
container.innerHTML="";
let subtotal=0;
cart.forEach((item,index)=>{
subtotal+=item.price*item.quantity;
container.innerHTML+=`
<div class="cart-item">
<div class="cart-item-icon">${item.emoji}</div>
<div class="cart-info">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
</div>
<div class="quantity">
<button onclick="changeQuantity(${index},-1)">-</button>
${item.quantity}
<button onclick="changeQuantity(${index},1)">+</button>
</div>
</div>
`;
});

const total=subtotal+(cart.length>0?50:0);

document.getElementById("cartCount").textContent=cart.reduce((sum,item)=>sum+item.quantity,0);
document.getElementById("subtotal").textContent="₹"+subtotal;
document.getElementById("total").textContent="₹"+total;
}

function changeQuantity(index,amount){
cart[index].quantity+=amount;
if(cart[index].quantity<=0){
cart.splice(index,1);
}
updateCart();
}

function wishlist(){
alert("❤️ Product added to wishlist!");
}

function sellProduct(){
const name=document.getElementById("sellName").value.trim();
const price=document.getElementById("sellPrice").value;
const category=document.getElementById("sellCategory").value;
const description=document.getElementById("sellDescription").value;

if(!name||!price){
alert("Please enter product name and price.");
return;
}

products.unshift({
name:name,
category:category,
price:Number(price),
emoji:"📦",
seller:"Poovisha"
});

sellingProducts++;
document.getElementById("sellingCount").textContent=sellingProducts;
document.getElementById("sellName").value="";
document.getElementById("sellPrice").value="";
document.getElementById("sellDescription").value="";
displayProducts();
alert("🎉 Your product has been published!");
showPage("home");
}

function placeOrder(){
if(cart.length===0){
alert("Your cart is empty!");
return;
}

const address=document.getElementById("address").value.trim();

if(!address){
alert("Please enter delivery address.");
return;
}

const payment=document.querySelector('input[name="payment"]:checked').value;

const orderID="BS"+Math.floor(1000+Math.random()*9000);
const total=document.getElementById("total").textContent;

document.getElementById("orderList").innerHTML+=`
<div class="order">
<h3>Order #${orderID}</h3>
<p>${cart.length} product(s)</p>
<p>Total: ${total}</p>
<p>Payment: ${payment}</p>
<p>Delivery: ${address}</p>
<strong>Order Placed ✓</strong>
</div>
`;

cart=[];
updateCart();
alert("🎉 Order placed successfully!");
showPage("orders");
}

displayProducts();
updateCart();
