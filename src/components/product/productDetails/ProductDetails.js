import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h2>product details</h2>
    </div>
  );
};

export default ProductDetails;
