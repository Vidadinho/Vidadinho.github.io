import React, { useEffect } from "react";
import styles from "./Orders.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import { selectUserID } from "../../../redux/slice/authSlice";
import Loader from "../../loader/Loader";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      // Only store orders that belong to the current user
      const userOrders = data.filter((order) => order.userID === userID);
      dispatch(STORE_ORDERS(userOrders));
    }
  }, [dispatch, data, userID]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className={styles.order}>
      <h2>Your Order History</h2>
      <p>
        Open an order to <b>change order status</b>
      </p>
      <br />
      {isLoading && <Loader />}
      <div className={styles.table}>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Order Amount</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const { id, orderDate, orderTime, orderAmount, orderStatus } =
                  order;
                return (
                  <tr key={id} onClick={() => handleClick(id)}>
                    <td>{index + 1}</td>
                    <td>
                      {orderDate} at {orderTime}
                    </td>
                    <td>{id}</td>
                    <td>{`$${orderAmount}`}</td>
                    <td>
                      <p
                        className={
                          orderStatus === "Delivered"
                            ? styles.delivered
                            : styles.pending
                        }
                      >
                        {orderStatus}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
