let prodName = document.getElementById("prodName");
let prodPrice = document.getElementById("prodPrice");
let prodDesc = document.getElementById("prodDesc");
let Submitt = document.getElementById("Submitt");
let Searrch = document.getElementById("Search");
let koko = document.getElementById("koko");

// Regular Expresion Name
let REName = /^[A-Z][a-z]+$/;
prodName.onkeyup = function () {
  if (REName.test(prodName.value)) {
    prodName.style.border = "3px solid green";
  } else {
    prodName.style.border = "3px solid red";
  }
};
prodName.addEventListener("blur", function () {
  prodName.style.border = "0px";
});
// Regular Expresion price
let REprice = /^[0-9]+$/;

prodPrice.onkeyup = function () {
  if (REprice.test(prodPrice.value)) {
    prodPrice.style.border = "3px solid green";
  } else {
    prodPrice.style.border = "3px solid red";
  }
};
prodPrice.addEventListener("blur", function () {
  prodPrice.style.border = "0px";
});

let arra = [];

// Clear  fields input
function cleaar() {
  prodName.value = "";
  prodPrice.value = "";
  prodDesc.value = "";
}

// Print
function printing() {
  let container = "";
  for (let i = 0; i < arra.length; i++) {
    container += `
        <tr>
        <td>${arra[i].name}</td>
        <td>${arra[i].price}</td>
        <td>${arra[i].disc}</td>
        <th>
          <button onclick="deleting(${i})" class="btn btn-outline-danger btn-sm">Delete </button>
          <button onclick="Updating(${i})" class="btn btn-outline-Warning btn-sm">Update </button>
        </th>
        </tr>   `;
  }
  document.getElementById("demo").innerHTML = container;
}

// return localStorage
if (JSON.parse(localStorage.getItem("data")) != null) {
  arra = JSON.parse(localStorage.getItem("data"));
  printing();
}

// Submitt Button
Submitt.addEventListener("click", function () {
  if (REName.test(prodName.value) && REprice.test(prodPrice.value)) {
    let obj = {
      name: prodName.value,
      price: prodPrice.value,
      disc: prodDesc.value,
    };
    arra.unshift(obj);
    localStorage.setItem("data", JSON.stringify(arra));
    printing();
    cleaar();
  } else {
    window.alert(
      "The Name must start with a capital letter!\n Pric Must be a Number"
    );
  }
});

// Deleting
function deleting(e) {
  arra.splice(e, 1);
  localStorage.setItem("data", JSON.stringify(arra));
  printing();
}

// Updating
function Updating(e) {
  prodName.value = arra[e].name;
  prodPrice.value = arra[e].price;
  prodDesc.value = arra[e].disc;
  arra.splice(e, 1);
  localStorage.setItem("data", JSON.stringify(arra));
  printing();
}

// Search
Searrch.onkeyup = function () {
  let container = "";
  for (let a = 0; a < arra.length; a++) {
    if (
      JSON.stringify(arra[a].name).includes(this.value) ||
      JSON.stringify(arra[a].price).includes(this.value)
    ) {
      container += `
            <tr>
            <td>${arra[a].name.replace(
              this.value,
              `<span>${this.value}</span>`
            )}</td>
            <td>${arra[a].price.replace(
              this.value,
              `<span>${this.value}</span>`
            )}</td>
            <td>${arra[a].disc}</td>
            <th>
              <button onclick="deleting(${a})" class="btn btn-outline-danger btn-sm">Delete </button>
              <button onclick="Updating(${a})" class="btn btn-outline-Warning btn-sm">Update </button>
            </th>
            </tr>   `;
    }
  }
  document.getElementById("demo").innerHTML = container;
};
