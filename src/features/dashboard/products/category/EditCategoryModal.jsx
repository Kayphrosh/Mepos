import React, { useEffect, useState } from "react";
import Modal from "../../../../components/ui/modal/modal";
import { Icon } from "@iconify/react";
import Input from "../../../../components/ui/input/Input";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/button/Button";
import axios from "../../../../utils/axios";

const EditCategoryModal = ({
  setEditCategoryModal,
  localUser,
  editCategoryId,
}) => {
  const [categoryData, setCategoryData] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      categoryName: "",
      categoryDescription: "",
      categoryRackNumber: "",
    },
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          `${localUser._id}/products/categories/${editCategoryId}`
        );
        setCategoryData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getCategory();
  }, [localUser._id, editCategoryId]);

  useEffect(() => {
    if (categoryData) {
      setValue("categoryName", categoryData.name);
      setValue("categoryDescription", categoryData.description);
      setValue("categoryRackNumber", categoryData.categoryRackNumber);
    }
  }, [categoryData, setValue]);

  useEffect(() => {
    reset({
      categoryName: "",
      categoryDescription: "",
      categoryRackNumber: "",
    });
    setCategoryData({});
  }, [editCategoryId, reset]);

  const onsubmit = async (data) => {
    const editedData = {
      name: data.categoryName,
      description: data.categoryDescription,
      rackNumber: data.categoryRackNumber,
    };

    try {
      const response = await axios.patch(
        `${localUser._id}/products/categories/${editCategoryId}`,
        editedData
      );
      setCategoryData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setEditCategoryModal(false);
    }
  };

  return (
    <Modal>
      <div className="cancel-edit">
        <Icon
          icon="mdi:times"
          width="1.4em"
          height="1.4em"
          onClick={() => setEditCategoryModal(false)}
          style={{
            cursor: "pointer",
          }}
        />
      </div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Input
          label="Category Name"
          placeholder="E.g. Ingredients"
          name="categoryName"
          type="text"
          register={register("categoryName")}
        />
        <Input
          label="Description"
          placeholder="Short description"
          name="categoryDescription"
          type="text"
          register={register("categoryDescription")}
        />
        <Input
          label="Rack Number"
          placeholder="E.g. Rack 12"
          name="categoryRackNumber"
          type="text"
          register={register("categoryRackNumber")}
        />
        <div className="cta">
          <Button type="submit" className="save">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
