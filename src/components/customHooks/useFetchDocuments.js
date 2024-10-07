import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const useFetchDocuments = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);

  const getDocument = useCallback(async () => {
    try {
      const docRef = doc(db, collectionName, documentID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const obj = {
          id: documentID,
          ...docSnap.data(),
        };
        setDocument(obj);
      } else {
        toast.error("Document not found!");
      }
    } catch (error) {
      toast.error(`Error fetching document: ${error.message}`);
    }
  }, [collectionName, documentID]);

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return { document };
};

export default useFetchDocuments;
