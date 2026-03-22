import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !price || !category || !quantity) {
      alert("All fields are required");
      return;
    }

    fetch("https://worksheet-catalogue.mashupstack.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        category,
        quantity,
      }),
    }).then(() => navigate("/"));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />

      <br /><br />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default AddProduct;
