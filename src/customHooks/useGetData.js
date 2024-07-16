import React, { useState, useEffect, useCallback } from "react";
import { db } from '../firebase.config';
import { collection, getDocs } from "firebase/firestore";

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, collectionName);

  const getData = useCallback(async () => {
    setLoading(true);
    const data = await getDocs(collectionRef);
    setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }, [collectionRef]);

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, refetch: getData };
};

export default useGetData;
