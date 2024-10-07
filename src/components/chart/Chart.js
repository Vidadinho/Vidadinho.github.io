import React from "react";
import styles from "./Chart.module.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Card from "../card/Card";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false, text: "Order Status Chart" },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  // Create an array of the order statuses
  const orderStatuses = orders.map((item) => item.orderStatus);

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];

  const placed = getOrderCount(orderStatuses, q1);
  const processing = getOrderCount(orderStatuses, q2);
  const shipped = getOrderCount(orderStatuses, q3);
  const delivered = getOrderCount(orderStatuses, q4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 105, 180, 0.6)",
        borderColor: "rgba(255, 20, 147, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
