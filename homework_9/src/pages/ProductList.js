import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    if (products.length === 0) {
      axios
        .get("https://worksheet-product.mashupstack.com/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => dispatch(setProducts(res.data)))
        .catch(() => alert("Failed to load products"));
    }
  }, [dispatch, token, products.length]);

  return (
    <div>
      <h2>Product List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => navigate(`/product/${p.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
