import React, { useEffect, useState } from "react";
import Modal from "../../../../components/ui/modal/modal";
import { Icon } from "@iconify/react";
import Input from "../../../../components/ui/input/Input";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/button/Button";
import axios from "../../../../utils/axios";
import { toast } from "react-toastify";

const EditUnitModal = ({ setEditUnitModal, localUser, editUnitId }) => {
  const [unitData, setUnitData] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      unitName: "",
      unitShortName: "",
      allowDecimalValue: false,
    },
  });

  useEffect(() => {
    const getUnit = async () => {
      try {
        const response = await axios.get(
          `${localUser._id}/products/units/${editUnitId}`
        );
        setUnitData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getUnit();
  }, [localUser._id, editUnitId]);

  useEffect(() => {
    if (unitData) {
      setValue("unitName", unitData.name);
      setValue("unitShortName", unitData.shortName);
      setValue("allowDecimalValue", unitData.allowDecimal);
    }
  }, [unitData, setValue]);

  useEffect(() => {
    reset({
      unitName: "",
      unitShortName: "",
      allowDecimalValue: false,
    });
    setUnitData({});
  }, [editUnitId, reset]);

  const onsubmit = async (data) => {
    const editedData = {
      name: data.unitName,
      shortName: data.unitShortName,
      allowDecimal: data.allowDecimalValue,
    };

    try {
      const response = await axios.patch(
        `${localUser._id}/products/units/${editUnitId}`,
        editedData
      );
      setUnitData(response.data.data);
      console.log(response.data.data);
      toast.success("Unit edited successfully");
    } catch (error) {
      console.error(error.message);
    } finally {
      setEditUnitModal(false);
    }
  };

  return (
    <Modal>
      <div className="cancel-edit">
        <Icon
          icon="mdi:times"
          width="1.4em"
          height="1.4em"
          onClick={() => setEditUnitModal(false)}
          style={{
            cursor: "pointer",
          }}
        />
      </div>
      {unitData && (
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="unit-names">
            <Input
              label="Unit Name"
              placeholder="E.g. Kilogram"
              name="unitName"
              type="text"
              register={register("unitName")}
            />
            <Input
              label="Unit Short Name"
              placeholder="E.g. Kg"
              name="unitShortName"
              type="text"
              register={register("unitShortName", {
                required: "Enter a unit short name",
              })}
            />
          </div>
          <div className="decimal-value">
            <input
              type="checkbox"
              name="allowDecimalValue"
              {...register("allowDecimalValue")}
            />
            <label>Allow decimal value?</label>
          </div>
          <div className="cta">
            <Button className="save">Save</Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditUnitModal;
