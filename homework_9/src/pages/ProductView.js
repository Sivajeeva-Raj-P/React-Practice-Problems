import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductView() {
  const { id } = useParams();
  const products = useSelector((state) => state.products.list);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h3>Product not found</h3>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p><b>Description:</b> {product.description}</p>
      <p><b>Price:</b> {product.price}</p>
      <p><b>Quantity:</b> {product.quantity}</p>
    </div>
  );
}

export default ProductView;
