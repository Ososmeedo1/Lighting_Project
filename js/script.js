let allProducts = [];

const nameInput = document.getElementById('nameInput');
const numberInput = document.getElementById('numberInput');
const priceInput = document.getElementById('priceInput');
const tbody = document.getElementById('tbody');
const saveBtn = document.getElementById('save');
const updateBtn = document.getElementById('update');


if (localStorage.getItem("products") != null) {
  allProducts = JSON.parse(localStorage.getItem("products"));
  display(allProducts);
}



function addProduct() {

  if (nameInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "الرجاء إدخال الأسم",
    });
  }
  else if (numberInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "الرجاء إدخال الكمية",
    });
  }
  else if (priceInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "الرجاء إدخال السعر",
    });
  }
  else {
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "تم إضافة المنتج",
      showConfirmButton: false,
      timer: 1500
    });
    let product = {
      name: nameInput.value,
      number: numberInput.value,
      price: priceInput.value,
    }

    allProducts.push(product)
    display(allProducts)
    clear()
    localStorage.setItem("products", JSON.stringify(allProducts));
  }



}

function display(arr) {
  let container = ``;
  for (let i = 0; i < arr.length; i++) {
    container += `
      <tr>
      <td class="text-center">${i + 1}</td>
      <td class="text-center">${arr[i].name}</td>
      <td class="text-center">${arr[i].number}</td>
      <td class="text-center">${arr[i].price}</td>
      <td class="text-center"><i class="fas fa-trash text-danger cursor-pointer" onclick="deleteProduct(${i})"></i></td>
      <td class="text-center"><i class="fas fa-edit text-warning cursor-pointer" onclick="preUpdate(${i})"></i></td>
    </tr>
    `
  }

  tbody.innerHTML = container;
}

function clear() {
  nameInput.value = '';
  numberInput.value = '';
  priceInput.value = '';
}



function deleteProduct(index) {

  Swal.fire({
    title: "هل أنت متأكد",
    text: "!لن يتم إسترجاعه ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "تم المسح",

        icon: "success"
      });
      allProducts.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(allProducts));
      display(allProducts);
    }
  });


}

let updatedIndex;

function preUpdate(index) {
  updatedIndex = index;
  nameInput.value = allProducts[index].name;
  numberInput.value = allProducts[index].number;
  priceInput.value = allProducts[index].price

  saveBtn.classList.add('d-none')
  updateBtn.classList.remove('d-none')
}

function update() {



  let updatedProduct = {
    name: nameInput.value,
    number: numberInput.value,
    price: priceInput.value
  }

  allProducts.splice(updatedIndex, 1, updatedProduct);
  localStorage.setItem("products", JSON.stringify(allProducts));
  display(allProducts);
  clear();
  saveBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');
}


function search(term) {
  let container = ``;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())) {
      container += `
      <tr>
      <td class="text-center">${i + 1}</td>
      <td class="text-center">${allProducts[i].name}</td>
      <td class="text-center">${allProducts[i].number}</td>
      <td class="text-center">${allProducts[i].price}</td>
      <td class="text-center"><i class="fas fa-trash text-danger cursor-pointer" onclick="deleteProduct(${i})"></i></td>
      <td class="text-center"><i class="fas fa-edit text-warning cursor-pointer" onclick="preUpdate(${i})"></i></td>
    </tr>
      `
    }
  }

  tbody.innerHTML = container;
}