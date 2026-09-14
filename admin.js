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

  console.log({
    name,
    price,
    category,
    imageFile,
    description
  });
});
