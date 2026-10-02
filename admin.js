```javascript
const SUPABASE_URL = "https://fbsvgzvwzkceyoekhvna.supabase.co";
const SUPABASE_KEY = "sb_publishable_GePnsf15J-bXPZhPrnL5JQ_qdJTMdiA";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Admin Supabase connected");


// ========================================
// ELEMENTS
// ========================================

const productForm = document.getElementById("productForm");
const status = document.getElementById("status");

const productCategory =
  document.getElementById("productCategory");

const deleteProductSelect =
  document.getElementById("deleteProduct");

const deleteButton =
  document.getElementById("deleteButton");

const editProduct =
  document.getElementById("editProduct");

const editName =
  document.getElementById("editName");

const editPrice =
  document.getElementById("editPrice");

const editCategory =
  document.getElementById("editCategory");

const editDescription =
  document.getElementById("editDescription");

const updateButton =
  document.getElementById("updateButton");


// ========================================
// ADD NEW JERSEY
// ========================================

productForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  status.textContent = "Adding jersey...";


  const name =
    document.getElementById("productName").value.trim();

  const price =
    Number(document.getElementById("productPrice").value);


  // GET ALL SELECTED CATEGORIES
  const categories =
    [...productCategory.selectedOptions]
      .map(option => option.value);


  const imageFile =
    document.getElementById("productImage").files[0];


  const description =
    document.getElementById("productDescription").value.trim();


  // ========================================
  // VALIDATION
  // ========================================

  if (categories.length === 0) {
    status.textContent =
      "Please select at least one category.";

    return;
  }


  if (!imageFile) {
    status.textContent =
      "Please choose an image.";

    return;
  }


  // ========================================
  // UPLOAD IMAGE
  // ========================================

const fileName =
  Date.now() + "-" + imageFile.name;


  const { error: uploadError } =
    await supabaseClient.storage
      .from("product-images")
      .upload(fileName, imageFile);


  if (uploadError) {

    console.error(uploadError);

    status.textContent =
      "Image upload failed.";

    return;
  }


  const { data: publicUrlData } =
    supabaseClient.storage
      .from("product-images")
      .getPublicUrl(fileName);


  const imageUrl =
    publicUrlData.publicUrl;


  console.log("Image uploaded:", imageUrl);


  // ========================================
  // SAVE PRODUCT
  // ========================================

  const { error: insertError } =
    await supabaseClient
      .from("products")
      .insert([
        {
          name: name,

          price: price,

          // Main/original category
          category: categories[0],

          // ALL categories
          categories: categories,

          image: imageUrl,

          description: description
        }
      ]);


  if (insertError) {

    console.error(
      "DATABASE ERROR:",
      insertError
    );

    status.textContent =
      `Database error: ${insertError.message}`;

    return;
  }


  status.textContent =
    "Jersey added successfully!";


  productForm.reset();


  await loadProductsForAdmin();

  await loadProductsForEdit();

  await loadProductsForDelete();

});


// ========================================
// LOAD EXISTING PRODUCTS
// ========================================

async function loadProductsForAdmin() {

  const productsList =
    document.getElementById("productsList");


  productsList.innerHTML =
    "Loading products...";


  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .order("id", {
        ascending: true
      });


  console.log(
    "ADMIN PRODUCTS:",
    data
  );

  console.log(
    "ADMIN ERROR:",
    error
  );


  if (error) {

    console.error(error);

    productsList.innerHTML =
      "Could not load products.";

    return;
  }


  if (!data || data.length === 0) {

    productsList.innerHTML =
      "No products found.";

    return;
  }


  productsList.innerHTML = "";


  data.forEach(product => {

    const productDiv =
      document.createElement("div");


    const categories =
      Array.isArray(product.categories)
        ? product.categories.join(", ")
        : product.category || "None";


    productDiv.innerHTML = `

      <hr>

      <h3>${product.name}</h3>

      <p>
        ₦${Number(product.price).toLocaleString()}
      </p>

      <p>
        Categories: ${categories}
      </p>

      <button
        type="button"
        onclick="deleteProduct(${product.id})"
      >
        Delete
      </button>

    `;


    productsList.appendChild(
      productDiv
    );

  });

}


// ========================================
// DELETE PRODUCT
// ========================================

async function deleteProduct(id) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this jersey?"
    );


  if (!confirmed) {
    return;
  }


  const { error } =
    await supabaseClient
      .from("products")
      .delete()
      .eq("id", id);


  if (error) {

    console.error(
      "DELETE ERROR:",
      error
    );

    alert(
      "Could not delete the jersey."
    );

    return;
  }


  alert(
    "Jersey deleted successfully."
  );


  await loadProductsForAdmin();

  await loadProductsForEdit();

  await loadProductsForDelete();

}


// ========================================
// LOAD DELETE DROPDOWN
// ========================================

async function loadProductsForDelete() {

  if (!deleteProductSelect) {
    return;
  }


  const { data, error } =
    await supabaseClient
      .from("products")
      .select("id, name")
      .order("id", {
        ascending: true
      });


  if (error) {

    console.error(
      "DELETE LOAD ERROR:",
      error
    );

    return;
  }


  deleteProductSelect.innerHTML =
    '<option value="">Select jersey to delete</option>';


  data.forEach(product => {

    const option =
      document.createElement("option");


    option.value =
      product.id;


    option.textContent =
      product.name;


    deleteProductSelect.appendChild(
      option
    );

  });

}


// ========================================
// DELETE USING DROPDOWN
// ========================================

deleteButton.addEventListener(
  "click",
  async () => {

    const productId =
      deleteProductSelect.value;


    if (!productId) {

      alert(
        "Please select a jersey to delete."
      );

      return;
    }


    await deleteProduct(
      productId
    );

  }
);


// ========================================
// LOAD PRODUCTS FOR EDIT
// ========================================

async function loadProductsForEdit() {

  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .order("id", {
        ascending: true
      });


  if (error) {

    console.error(
      "EDIT LOAD ERROR:",
      error
    );

    return;
  }


  editProduct.innerHTML =
    '<option value="">Select jersey to edit</option>';


  data.forEach(product => {

    const option =
      document.createElement("option");


    option.value =
      product.id;


    option.textContent =
      product.name;


    editProduct.appendChild(
      option
    );

  });

}


// ========================================
// LOAD SELECTED PRODUCT INTO EDIT FORM
// ========================================

editProduct.addEventListener(
  "change",
  async () => {

    const productId =
      editProduct.value;


    if (!productId) {

      editName.value = "";

      editPrice.value = "";

      [...editCategory.options]
        .forEach(option => {
          option.selected = false;
        });

      editDescription.value = "";

      return;
    }


    const { data, error } =
      await supabaseClient
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();


    if (error) {

      console.error(
        "EDIT PRODUCT ERROR:",
        error
      );

      return;
    }


    editName.value =
      data.name || "";


    editPrice.value =
      data.price || "";


    // ========================================
    // SELECT ALL SAVED CATEGORIES
    // ========================================

    const savedCategories =
      Array.isArray(data.categories)
        ? data.categories
        : data.category
          ? [data.category]
          : [];


    [...editCategory.options]
      .forEach(option => {

        option.selected =
          savedCategories.includes(
            option.value
          );

      });


    editDescription.value =
      data.description || "";

  }
);


// ========================================
// UPDATE PRODUCT
// ========================================

updateButton.addEventListener(
  "click",
  async () => {

    const productId =
      editProduct.value;


    if (!productId) {

      alert(
        "Please select a jersey to edit."
      );

      return;
    }


    const categories =
      [...editCategory.selectedOptions]
        .map(option => option.value);


    if (categories.length === 0) {

      alert(
        "Please select at least one category."
      );

      return;
    }


    const { error } =
      await supabaseClient
        .from("products")
        .update({

          name:
            editName.value.trim(),

          price:
            Number(editPrice.value),

          // Main/original category
          category:
            categories[0],

          // ALL categories
          categories:
            categories,

          description:
            editDescription.value.trim()

        })
        .eq("id", productId);


    if (error) {

      console.error(
        "UPDATE ERROR:",
        error
      );

      alert(
        "Jersey could not be updated."
      );

      return;
    }


    alert(
      "Jersey updated successfully!"
    );


    await loadProductsForEdit();

    await loadProductsForDelete();

    await loadProductsForAdmin();

  }
);


// ========================================
// INITIAL LOAD
// ========================================

loadProductsForAdmin();

loadProductsForEdit();

loadProductsForDelete();
```
