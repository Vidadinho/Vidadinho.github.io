import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocuments from "../../components/customHooks/useFetchDocuments";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocuments("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  console.log(order);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr;Back to Orders</Link>
          <br />
          {order === null ? (
            <img src={spinnerImg} alt="loading..." style={{ width: "50px" }} />
          ) : (
            <>
              <p>
                <b>Order ID </b>
                {order.id}
              </p>
              <p>
                <b>Order Amount </b>${order.orderAmount}
              </p>
              <p>
                <b>Order Status </b>
                {order.orderStatus}
              </p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((cart, index) => {
                    const { id, name, price, imageURL, cartQuantity } = cart;
                    return (
                      <tr key={id}>
                        <td>
                          <b>{index + 1}</b>
                        </td>
                        <td>
                          <b>
                            <p>{name}</p>
                          </b>
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>${price}</td>
                        <td>{cartQuantity}</td>
                        <td>${(price * cartQuantity).toFixed(2)}</td>
                        <td className={styles.icons}>
                          <Link to={`/review-product/${id}`}>
                            <button className="--btn --btn-primary">
                              Review Product
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
