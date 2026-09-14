const SUPABASE_URL = "https://fbsvgzvwzkceyoekhvna.supabase.co";
const SUPABASE_KEY = "sb_publishable_GePnsf15J-bXPZhPrnL5JQ_qdJTMdiA";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Admin Supabase connected");

const productForm = document.getElementById("productForm");
const status = document.getElementById("status");

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  status.textContent = "Adding jersey...";

  const name = document.getElementById("productName").value;
  const price = Number(document.getElementById("productPrice").value);
  const category = document.getElementById("productCategory").value;
  const imageFile = document.getElementById("productImage").files[0];
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
  const { error: insertError } = await supabaseClient
  .from("products")
  .insert([
    {
      name: name,
      price: price,
      category: category,
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

status.textContent = "Jersey added successfully!";

productForm.reset();
async function loadProductsForAdmin() {
  const productsList = document.getElementById("productsList");

  productsList.innerHTML = "Loading products...";

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    productsList.innerHTML = "Could not load products.";
    return;
  }

  if (!data || data.length === 0) {
    productsList.innerHTML = "No products found.";
    return;
  }

  productsList.innerHTML = "";

  data.forEach(product => {
    const productDiv = document.createElement("div");

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

loadProductsForAdmin();
});
