import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./style.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase.config"; // Import storage
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!productName || !description || !price || !category) {
      setError("Please fill in all required fields");
      return;
    }

    if (productName.length > 50) {
      setError("Product name must be less than 50 characters");
      return;
    }

    if (description.length > 200) {
      setError("Description must be less than 200 characters");
      return;
    }

    if (price > 10000000) {
      setError("Price must be less than 10 million");
      return;
    }

    if (productImage && productImage.size > 500 * 1024) {
      setError("Image size must be less than 500KB");
      return;
    }

    setIsLoading(true);
    setError("");

    const getSlug = (str)=> {
      return str.trim().toLowerCase().replace(/\s+/g, '-')
    }

    try {
      const storageRef = ref(storage, `productImages/${Date.now() + productImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, productImage);

      uploadTask.on(
        'state_changed',
        // Progress Handler (Optional)
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        // Error Handler
        (error) => {
          toast.error('Images not uploaded');
          setIsLoading(false);
        },
        // Completion Handler 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await addDoc(collection(db, 'products'), {
                productName: productName,
                shortDescription: shortDescription,
                description: description,
                category: category,
                price: price,
                imgUrl: downloadURL,
                slug : getSlug(productName),
              });

              // Reset state, show success message
              setProductName("");
              setDescription("");
              setShortDescription("");
              setPrice(0);
              setCategory("");
              setProductImage(null);
              setPreview(null);
              setIsLoading(false);
              toast.success("Product added successfully!");
            } catch (error) {
              console.error("Error adding product:", error);
              toast.error("Failed to add product. Please try again.");
              setIsLoading(false);
            }
          });
        }
      );

    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 500 * 1024) {
      setError("File size must be less than 500KB");
      return;
    }

    setProductImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="add_product_form">
      <Container>
        <Row>
          <Col lg="12">
            <form onSubmit={handleSubmit}>
              <div className="add_product_header ">
                <h3>Add Product</h3>
                {error && <p className="error">{error}</p>}
              </div>
              <div className="left_side">
                <div className="form_group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="form_group">
                  <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="form_group">
                  <input
                    type="text"
                    placeholder="Short Description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className="form_group">
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form_group">
                  <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Timber">Timber</option>
                    <option value="Essential Oils">Essential Oils</option>
                  </select>
                </div>
              </div>
              <div className="right_side">
                <div className="form_group">
                  <input
                    type="file"
                    name="productImage"
                    id="productImage"
                    onChange={handleImageUpload}
                  />
                  {preview && <img src={preview} alt="Product Preview" />}
                </div>
              </div>
              <div className="submit_button">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding Product..." : "Add Product"}
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;