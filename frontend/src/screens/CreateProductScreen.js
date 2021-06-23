import React, { useEffect, useState, useRef } from "react";
import { Form, Select, Button, TextArea } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoriesAction,
  createNewProductAction,
} from "../actions/productsActions";
import { checkProductDetails } from "../Configurations/productConifgure";
import styled from "styled-components";
import MessageComponent from "../Components/MessageComponents/MessageComponent";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateProductScreen = () => {
  const history = useHistory();
  const categories = useSelector((state) => state.categories.categories);
  const { error, success, loading } = useSelector(
    (state) => state.createdProduct
  );

  const [catNames, setCatNames] = useState([]);
  const [imgName, setImgName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedPath, setUploadedPath] = useState("");
  const [formError, setFormError] = useState("");
  const [cloudName, setCloudName] = useState("");

  const dispatch = useDispatch();
  const upload_input = useRef(null);

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const getCloudinaryName = async () => {
      const { data } = await axios.get("/api/products/cloudinary-profile");
      setCloudName(data.cloudName);
    };

    getCloudinaryName();
  }, []);

  useEffect(() => {
    if (success) {
      history.goBack();
      dispatch({
        type: "PRODUCT_CREATE_RESET",
      });
    }
  }, [success, history, dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      const cats = categories.map((cat) => {
        return {
          key: cat.name,
          value: cat.name,
          text: cat.name,
        };
      });

      setCatNames(cats);
    }
  }, [categories]);

  const [productDetails, setProductDetails] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    countInStock: "",
    image: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleCategoryChange = (e, data) => {
    setProductDetails({
      ...productDetails,
      category: data.value,
    });
  };

  const handleImageChange = async (e) => {
    setUploading(true);
    const image = e.target.files[0];
    setImgName(image.name);
    const fileData = new FormData();
    fileData.append("file", image);
    fileData.append("upload_preset", "emporium_unsigned");
    fileData.append("folder", "EmporiumApplication/Products/");

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    try {
      const { data } = await axios.post(url, fileData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      setUploadedPath(data.eager[0].secure_url);
      setProductDetails({
        ...productDetails,
        image: data.eager[0].secure_url,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setFormError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response
      );
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = checkProductDetails(productDetails);
    console.log(error);
    if (!error) {
      dispatch(createNewProductAction(productDetails));
    } else {
      setFormError(error.validationError);
    }
  };

  return (
    <MainContainer>
      <h3> Enter Product Details </h3>
      <hr />
      <FormContainer>
        {formError !== "" && <MessageComponent content={error} />}
        <Form loading={loading} onSubmit={handleSubmit}>
          <label>Product Name: </label>
          <input
            placeholder="Product Name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
          />

          <label>Select Product Category: </label>
          <Select
            placeholder="Select Product Category"
            onChange={handleCategoryChange}
            options={catNames}
          />

          <label>Brand: </label>
          <input
            placeholder="Product Name"
            name="brand"
            value={productDetails.brand}
            onChange={handleChange}
          />

          <label htmlFor="image">Select Porduct Image :</label>
          <input
            type="file"
            id="image"
            className="image-input"
            name="myfile"
            onChange={handleImageChange}
            ref={upload_input}
          ></input>

          <div className="upload-image">
            <Button
              type="button"
              className="upload-btn"
              circular
              icon="cloud upload"
              loading={uploading}
              onClick={() => upload_input.current.click()}
            />
            &nbsp;
            {productDetails.image !== "" && imgName}
            {uploadedPath !== "" && (
              <img
                src={uploadedPath}
                className="uploaded-prod-image"
                alt="new-product"
                width="30px"
              />
            )}
          </div>

          <label> Product Desciption: </label>
          <TextArea
            placeholder="Enter product description"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
          />

          <label>Count In Stock: </label>
          <input
            type="number"
            placeholder="Count in stock"
            name="countInStock"
            value={productDetails.countInStock}
            onChange={handleChange}
          />

          <label>Price: </label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
          />
          <Button type="submit" fluid className="submit-btn" color="orange">
            Create Product
          </Button>
        </Form>
      </FormContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 1rem 2rem;

  hr {
    border-top: none;
  }
`;

const FormContainer = styled.div`
  margin-top: 15px;

  label {
    display: inline-block;
    margin: 10px 0 !important;
  }

  .ui.selection.dropdown {
    display: block;
  }

  .image-input {
    display: none;
  }

  .submit-btn {
    margin-top: 10px;
  }

  .upload-image {
    display: flex;
    align-items: center;
  }

  .uploaded-prod-image {
    margin-left: 20px;
  }
`;

export default CreateProductScreen;
