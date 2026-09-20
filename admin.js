const SUPABASE_URL = "https://fbsvgzvwzkceyoekhvna.supabase.co";
const SUPABASE_KEY = "sb_publishable_GePnsf15J-bXPZhPrnL5JQ_qdJTMdiA";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Admin Supabase connected");

const productForm = document.getElementById("productForm");
const status = document.getElementById("status");


// ================================
// ADD NEW JERSEY
// ================================

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  status.textContent = "Adding jersey...";

  const name = document.getElementById("productName").value;
  const price = Number(
    document.getElementById("productPrice").value
  );
const categories =
  [...document.getElementById("productCategory").selectedOptions]
    .map(option => option.value);

const category = categories[0] || null;
  const imageFile =
    document.getElementById("productImage").files[0];

  const description =
    document.getElementById("productDescription").value;

  if (!imageFile) {
    status.textContent = "Please choose an image.";
    return;
  }

  const fileName =
    `${Date.now()}-${imageFile.name}`;

  const { error: uploadError } =
    await supabaseClient.storage
      .from("product-images")
      .upload(fileName, imageFile);

  if (uploadError) {
    console.error(uploadError);
    status.textContent = "Image upload failed.";
    return;
  }

  const { data: publicUrlData } =
    supabaseClient.storage
      .from("product-images")
      .getPublicUrl(fileName);

  const imageUrl = publicUrlData.publicUrl;

  console.log("Image uploaded:", imageUrl);

  const { error: insertError } =
    await supabaseClient
      .from("products")
      .insert([
       {
  name: name,
  price: price,
  category: category[0] || null,
  categories: categories,
  image: imageUrl,
  description: description
}
      ]);

  if (insertError) {
    console.error("DATABASE ERROR:", insertError);

    status.textContent =
      `Database error: ${insertError.message}`;

    return;
  }

  status.textContent =
    "Jersey added successfully!";

  productForm.reset();

  loadProductsForAdmin();
});


// ================================
// LOAD PRODUCTS
// ================================

async function loadProductsForAdmin() {

  const productsList =
    document.getElementById("productsList");

  productsList.innerHTML =
    "Loading products...";

  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .order("id", { ascending: true });

  console.log("ADMIN PRODUCTS:", data);
  console.log("ADMIN ERROR:", error);

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

    productDiv.innerHTML = `
      <hr>

      <h3>${product.name}</h3>

      <p>₦${Number(product.price).toLocaleString()}</p>

      <p>${product.category}</p>

      <button onclick="deleteProduct(${product.id})">
        Delete
      </button>
    `;

    productsList.appendChild(productDiv);

  });
}


// ================================
// DELETE PRODUCT
// ================================

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

    console.error(error);

    alert(
      "Could not delete the jersey."
    );

    return;
  }

  alert(
    "Jersey deleted successfully."
  );

  loadProductsForAdmin();
}


// ================================
// LOAD PRODUCTS WHEN PAGE OPENS
// ================================

loadProductsForAdmin();
deleteButton.addEventListener("click", async () => {
  const productId = deleteProduct.value;

  if (!productId) {
    alert("Please select a jersey to delete.");
    return;
  }

  const confirmed = confirm("Are you sure you want to delete this jersey?");

  if (!confirmed) {
    return;
  }

  const { error } = await supabaseClient
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error("DELETE ERROR:", error);
    alert("Jersey could not be deleted.");
    return;
  }

  alert("Jersey deleted successfully!");

  loadProductsForDelete();
});
const editProduct = document.getElementById("editProduct");
const editName = document.getElementById("editName");
const editPrice = document.getElementById("editPrice");
const editCategory = document.getElementById("editCategory");
const editDescription = document.getElementById("editDescription");
const updateButton = document.getElementById("updateButton");

async function loadProductsForEdit() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("EDIT LOAD ERROR:", error);
    return;
  }

  editProduct.innerHTML =
    '<option value="">Select jersey to edit</option>';

  data.forEach((product) => {
    const option = document.createElement("option");

    option.value = product.id;
    option.textContent = product.name;

    editProduct.appendChild(option);
  });
}

loadProductsForEdit();
editProduct.addEventListener("change", async () => {
  const productId = editProduct.value;

  if (!productId) {
    editName.value = "";
    editPrice.value = "";
    editCategory.value = "";
    editDescription.value = "";
    return;
  }

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("EDIT PRODUCT ERROR:", error);
    return;
  }

  editName.value = data.name || "";
  editPrice.value = data.price || "";
 editCategory.value = data.categories || [];
  editDescription.value = data.description || "";
});
updateButton.addEventListener("click", async () => {
  const productId = editProduct.value;

  if (!productId) {
    alert("Please select a jersey to edit.");
    return;
  }

  const { error } = await supabaseClient
    .from("products")
    .update({
  name: editName.value,
  price: Number(editPrice.value),
  category: editCategory.value[0] || null,
  categories: [...editCategory.selectedOptions].map(option => option.value),
  description: editDescription.value
})
    .eq("id", productId);

  if (error) {
    console.error("UPDATE ERROR:", error);
    alert("Jersey could not be updated.");
    return;
  }

  alert("Jersey updated successfully!");

  loadProductsForEdit();
  loadProductsForDelete();
});
