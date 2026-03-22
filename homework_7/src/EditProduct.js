import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch(`https://worksheet-catalogue.mashupstack.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setQuantity(data.quantity);
      });
  }, [id]);

  const handleUpdate = () => {
    fetch(
      `https://worksheet-catalogue.mashupstack.com/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          category,
          quantity,
        }),
      }
    ).then(() => navigate("/"));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Product</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <br /><br />

      <button onClick={handleUpdate}>Update Product</button>
    </div>
  );
}

export default EditProduct;
