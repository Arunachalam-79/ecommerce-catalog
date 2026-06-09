const productContainer =
document.getElementById("products");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const loader =
document.getElementById("loader");

const modal =
document.getElementById("modal");

const modalBody =
document.getElementById("modalBody");

const closeBtn =
document.querySelector(".close");

let products = [];

async function fetchProducts(){

try{

loader.style.display="block";

const response =
await fetch(
"https://fakestoreapi.com/products"
);

if(!response.ok){

throw new Error(
"Failed to fetch products"
);

}

products =
await response.json();

displayProducts(products);

loadCategories();

}
catch(error){

loader.innerHTML =
"Error loading products";

console.error(error);

}
finally{

loader.style.display="none";

}

}

function displayProducts(items){

productContainer.innerHTML="";

items.forEach(product=>{

const card =
document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${product.image}">

<h3>${product.title}</h3>

<p class="price">
$${product.price}
</p>

<p>
${product.category}
</p>

<button onclick="showDetails(${product.id})">
View Details
</button>

`;

productContainer.appendChild(card);

});

}

function loadCategories(){

const categories =
[
...new Set(
products.map(
product=>product.category
)
)
];

categories.forEach(category=>{

const option =
document.createElement("option");

option.value=category;

option.textContent=category;

categoryFilter.appendChild(option);

});

}

searchInput.addEventListener("input",filterProducts);

categoryFilter.addEventListener(
"change",
filterProducts
);

function filterProducts(){

const search =
searchInput.value.toLowerCase();

const category =
categoryFilter.value;

const filtered =
products.filter(product=>{

const matchTitle =
product.title
.toLowerCase()
.includes(search);

const matchCategory =
category==="all" ||
product.category===category;

return matchTitle &&
matchCategory;

});

displayProducts(filtered);

}

function showDetails(id){

const product =
products.find(
item=>item.id===id
);

modal.style.display="block";

modalBody.innerHTML=`

<h2>${product.title}</h2>

<img
src="${product.image}"
style="
width:200px;
display:block;
margin:auto;
">

<p>
<strong>Price:</strong>
$${product.price}
</p>

<p>
<strong>Category:</strong>
${product.category}
</p>

<p>
${product.description}
</p>

`;

}

closeBtn.onclick=()=>{

modal.style.display="none";

};

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

};

fetchProducts();
