import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import useFetchDocuments from "../../customHooks/useFetchDocuments";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocuments("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  console.log(order);

  return (
    <>
      <div className={styles.table}>
        <h2>Orders Details</h2>
        <div>
          <Link to="/admin-orders">&larr;Back to Orders</Link>
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
              <p>
                <b>Shipping Address </b>
                {order.shippingAddress ? (
                  <>
                    <br />
                    Address: {order.shippingAddress.line1},{" "}
                    {order.shippingAddress.line2}, {order.shippingAddress.city}
                    <br />
                    State: {order.shippingAddress.state}
                    <br />
                    Country: {order.shippingAddress.country}
                  </>
                ) : (
                  <span>No shipping address provided.</span>
                )}
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
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems &&
                    order.cartItems.map((cart, index) => {
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
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </>
          )}
          <ChangeOrderStatus order={order} id={id} />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
