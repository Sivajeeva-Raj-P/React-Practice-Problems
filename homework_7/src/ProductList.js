import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchProducts = () => {
    fetch("https://worksheet-catalogue.mashupstack.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = (id) => {
    fetch(
      `https://worksheet-catalogue.mashupstack.com/products/${id}`,
      { method: "DELETE" }
    ).then(() => fetchProducts());
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Product Catalog</h2>

      <button onClick={() => navigate("/add")}>Add Product</button>

      <br /><br />

      <input
        placeholder="Search product by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.quantity}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${p.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
