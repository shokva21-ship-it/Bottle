
const bikes = [
  { name: "Mountain Bike X1", price: 799, old: 999, discount: 20, image: "photo-1576435728678-68d0fbf94e91" },
  { name: "Road Bike R2", price: 1099, old: 1299, discount: 15, image: "photo-1532298229144-0ec0c57515c7" },
  { name: "Trail Bike T3", price: 749, old: 999, discount: 25, image: "photo-1544191696-102dbdaeeaa0" },
  { name: "Sport Bike F1", price: 449, old: 549, discount: 18, image: "photo-1511994298241-608e28f14fde" },
  { name: "Racing Bike C1", price: 349, old: 419, discount: 17, image: "photo-1485965120184-e220f721d03e" },
  { name: "Hybrid Bike H1", price: 599, old: 769, discount: 22, image: "photo-1507035895480-2b3156c31fc8" },
  { name: "Electric Bike E1", price: 1299, old: 1599, discount: 19, image: "photo-1571068316344-75bc76f77890" },
  { name: "Mountain Bike X2", price: 849, old: 1009, discount: 16, image: "photo-1596495577886-d920f1fb7238" },
  { name: "Road Bike P1", price: 949, old: 1199, discount: 21, image: "photo-1532298229144-0ec0c57515c7" },
  { name: "Trail Bike T1", price: 699, old: 809, discount: 14, image: "photo-1576435728678-68d0fbf94e91" },
  { name: "Fat Bike F2", price: 899, old: 1169, discount: 23, image: "photo-1544191696-102dbdaeeaa0" },
  { name: "Sport Bike S1", price: 549, old: 649, discount: 15, image: "photo-1511994298241-608e28f14fde" },
  { name: "Adventure Bike A1", price: 1199, old: 1499, discount: 20, image: "photo-1507035895480-2b3156c31fc8" },
  { name: "Speed Bike S2", price: 999, old: 1249, discount: 20, image: "photo-1532298229144-0ec0c57515c7" },
  { name: "Pro Mountain M1", price: 1399, old: 1699, discount: 18, image: "photo-1576435728678-68d0fbf94e91" },
  { name: "Urban Bike U1", price: 399, old: 499, discount: 20, image: "photo-1485965120184-e220f721d03e" },
];

const grid = document.getElementById("products-grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
const cartCount = document.getElementById("cart-count");

let cart = 0;

function showBikes(list) {
    grid.innerHTML = "";

    empty.style.display = list.length ? "none" : "block";

    list.forEach((bike, index) => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <span class="discount">-${bike.discount}%</span>

            <div class="product-image">
                <img src="https://images.unsplash.com/${bike.image}?auto=format&fit=crop&w=700&q=85" alt="${bike.name}">
            </div>

            <div class="product-info">
                <h3>${bike.name}</h3>

                <div class="rating">
                    ★★★★★ <small>4.9 (${120 + index * 13})</small>
                </div>

                <div class="product-bottom">
                    <div>
                        <span class="price">$${bike.price.toLocaleString("en-US")}</span>
                        <span class="old-price">$${bike.old.toLocaleString("en-US")}</span>
                    </div>

                    <button class="add-cart" data-index="${index}">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

showBikes(bikes);

grid.addEventListener("click", function (e) {
    const button = e.target.closest(".add-cart");

    if (button) {
        cart++;
        cartCount.textContent = cart;

        button.innerHTML = '<i class="fa-solid fa-check"></i> Added';
        button.style.background = "#fff";
        button.style.color = "#ed001b";

        setTimeout(() => {
            button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';
            button.style.background = "";
            button.style.color = "";
        }, 1200);
    }
});

search.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = bikes.filter(bike =>
        bike.name.toLowerCase().includes(value)
    );

    showBikes(filtered);
});

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("show");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
    });
});

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Thank you for subscribing to BikePro!");

    this.reset();
});
