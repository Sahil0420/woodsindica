import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase.config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import useGetData from "../../customHooks/useGetData";
import { ref, deleteObject } from "firebase/storage";

import "./style.css";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { data, loading, refetch } = useGetData("products");
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const deleteProducts = async (id) => {
    try {
      const productDocRef = doc(db, "products", id);
      const productDoc = await getDoc(productDocRef);

      if (productDoc.exists()) {
        const productData = productDoc.data();
        const imageUrl = productData.imgUrl;

        await deleteDoc(productDocRef);

        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }
        toast.success("Deleted Product Successfully");
        refetch();
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.error("Error deleting product : ", error);
      toast.error("Failed to delete product . Please try again");
    }
  };

  return (
    <section>
      <div className="allproduct_container">
        <div className="allproduct_column">
          <div className="info_heading">
              <p>Image</p>
              <p>Name</p>
              <p>Category</p>
              <p>Price</p>
              <p>Action</p>
          </div>
          <div className="gallery">
            {loading ? (
              <h3 style={{ textAlign: "center" }}>
                Fetching All Items from the store . . . .{" "}
              </h3>
            ) : (
              productsData.map((item) => (
                <div key={item.id} className="allproduct_bar">
                  <td className="allproduct_img">
                    <img src={item.imgUrl} alt="" />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <motion.button
                      onClick={() => {
                        deleteProducts(item.id);
                      }}
                      whileHover={{ scale: 0.9 }}
                      className="product_btn"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </motion.button>
                  </td>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
