import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/input/Input";
import "./category.scss";
import axios from "../../../../utils/axios";
import Search from "../../../../assets/images/icons/search.svg";
import { editIcon } from "../../../../assets/images/icons";
import { deleteIcon } from "../../../../assets/images/icons";
import { toast } from "react-toastify";
import EditCategoryModal from "./EditCategoryModal";

const ProductCategory = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [openNewCategory, setOpenNewCategory] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onTouched" });

  const onsubmit = async (formData) => {
    const categoriesData = {
      name: formData.categoryName,
      description: formData.categoryDescription,
      rackNumber: formData.categoryRackNumber,
    };

    const duplicateCategory = categories.find(
      (category) =>
        category.name.toLowerCase() === formData.categoryName.toLowerCase()
    );

    if (duplicateCategory) {
      setErrorMessage(`Category name ${formData.categoryName} already exists!`);
      return;
    }

    console.log(categoriesData);
    setSavingCategory(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `/${localUser._id}/products/categories`,
        categoriesData
      );
      if (response.status === 201) {
        console.log("response data", response.data.data);
        setCategories((prevCategories) => [
          ...prevCategories,
          response.data.data,
        ]);
        toast.success("Category created successfully");
        reset();
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setSavingCategory(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/${localUser._id}/products/categories`
        );
        console.log(response.data.data);
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [localUser._id, editCategoryModal]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchCategories.toLowerCase())
  );

  const onEditCategory = (id) => {
    setEditCategoryModal(true);
    setEditCategoryId(id);
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `/${localUser._id}/products/categories/${id}`
      );
      if (response.data.status) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="category-container">
      <div className="title">
        <h3>Categories</h3>
        <button id="export-csv">
          <Icon icon="foundation:page-export-csv" />
          Export as .csv
        </button>
      </div>
      <div className="add-new-category">
        <div className="heading">
          <p>Add New Category</p>
          {openNewCategory && (
            <Icon
              onClick={() => setOpenNewCategory(false)}
              icon="tabler:chevron-up"
              width="24px"
              height="24px"
              color="#3C3B39"
            />
          )}
          {!openNewCategory && (
            <Icon
              onClick={() => setOpenNewCategory(true)}
              icon="tabler:chevron-down"
              width="24px"
              height="24px"
              color="#3C3B39"
            />
          )}
        </div>
        {openNewCategory && (
          <>
            <hr color="#DADADA" />
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="categories-data">
                <Input
                  label="Category Name"
                  required={true}
                  placeholder="E.g. Ingredients"
                  name="categoryName"
                  type="text"
                  register={register("categoryName", {
                    required: "Enter a category",
                  })}
                  error={errors.categoryName}
                />
                <Input
                  label="Description"
                  placeholder="Short description"
                  name="categoryDescription"
                  type="text"
                  register={register("categoryDescription")}
                />
              </div>
              <div className="categories-data-2">
                <Input
                  label="Rack Number"
                  required={true}
                  placeholder="E.g. Rack 12"
                  name="categoryRackNumber"
                  type="text"
                  register={register("categoryRackNumber", {
                    required: "Enter a rack number",
                  })}
                  error={errors.categoryRackNumber}
                />
                <div className="cta">
                  <button
                    className="cancel"
                    type="button"
                    onClick={() => setOpenNewCategory(false)}
                  >
                    Cancel
                  </button>
                  <Button type="submit" className="save">
                    {savingCategory ? "Saving" : "Save"}
                  </Button>
                </div>
              </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
      </div>
      <hr />
      <div className="products-categories">
        <p>Products Categories</p>
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search category"
            onChange={(e) => setSearchCategories(e.target.value)}
          />
          <button>
            <img src={Search} alt="" />
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>
                <div>
                  Unit Name
                  <Icon icon="radix-icons:caret-sort" width={24} height={24} />
                </div>
              </th>
              <th>
                <div>
                  Description
                  <Icon icon="radix-icons:caret-sort" width={24} height={24} />
                </div>
              </th>
              <th>
                <div>Action </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <div className="actions">
                    <img
                      src={editIcon}
                      alt="Edit"
                      onClick={() => onEditCategory(category._id)}
                    />
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      onClick={() => deleteCategory(category._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editCategoryModal && (
          <EditCategoryModal
            setEditCategoryModal={setEditCategoryModal}
            localUser={localUser}
            editCategoryId={editCategoryId}
          />
        )}
        {loading && <p className="no-unit">Loading...</p>}
        {filteredCategories.length === 0 && !loading && (
          <p className="no-unit">No category named {`${searchCategories}`}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
