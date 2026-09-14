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
});
