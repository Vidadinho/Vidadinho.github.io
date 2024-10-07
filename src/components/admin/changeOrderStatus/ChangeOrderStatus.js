import React, { useState } from "react";
import styles from "./ChangeOrderStatus.module.scss";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import { doc, setDoc, Timestamp } from "firebase/firestore"; // Changed collection to doc
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveOrder = async (e, id) => {
    // Made saveOrder async
    setIsLoading(true);

    e.preventDefault();
    if (!status) {
      // Added validation for status
      toast.error("Please select a status.");
      setIsLoading(false);
      return;
    }

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      const orderRef = doc(db, "orders", id); // Create a document reference
      await setDoc(orderRef, orderConfig); // Use await with setDoc

      setIsLoading(false);
      toast.success("Order status saved successfully!");
      navigate("/checkout-success");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
    console.log("order saved");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => saveOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  --Choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>{" "}
    </>
  );
};

export default ChangeOrderStatus;
