import React, { useEffect, useState } from "react";
import "./Units.scss";
import { Icon } from "@iconify/react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";
import { useForm } from "react-hook-form";
import axios from "../../../../utils/axios";
import instance from "../../../../utils/axios";
import Search from "../../../../assets/images/icons/search.svg";
import { editIcon } from "../../../../assets/images/icons";
import { deleteIcon } from "../../../../assets/images/icons";
import { toast } from "react-toastify";
import EditUnitModal from "./EditUnitModal";

const Units = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [openNewUnitForm, setOpenNewUnitForm] = useState(true);
  const [units, setUnits] = useState([]);
  const [searchUnit, setSearchunit] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingUnit, setSavingUnit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editUnitModal, setEditUnitModal] = useState(false);
  const [editUnitId, setEditUnitId] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onTouched" });

  const onsubmit = async (formData) => {
    const unitData = {
      name: formData.unitName,
      shortName: formData.unitShortName,
      allowDecimal: formData.allowDecimalValue,
    };

    const duplicateUnit = units.find(
      (unit) =>
        unit.name.toLowerCase() === formData.unitName.toLowerCase() ||
        unit.shortName.toLowerCase() === formData.unitShortName.toLowerCase()
    );

    if (duplicateUnit) {
      setErrorMessage(
        `Unit name ${formData.unitName} or ${formData.unitShortName} already exists!`
      );
      return;
    }

    setSavingUnit(true);
    setErrorMessage("");
    try {
      const response = await instance.post(
        `/${localUser._id}/products/units`,
        unitData
      );
      if (response.status === 201) {
        setUnits((prevUnits) => [...prevUnits, response.data.data]);
        toast.success("Unit created successfully");
        reset();
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error creating unit:", error);
    } finally {
      setSavingUnit(false);
    }
  };

  useEffect(() => {
    const getUnits = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/${localUser._id}/products/units`);
        console.log(response.data.data);
        setUnits(response.data.data);
      } catch (error) {
        console.error("Error getting units", error);
      } finally {
        setLoading(false);
      }
    };

    getUnits();
  }, [localUser._id, editUnitModal]);

  const filteredUnits = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchUnit.toLowerCase()) ||
      unit.shortName.toLowerCase().includes(searchUnit.toLowerCase())
  );

  const onEditUnit = (id) => {
    setEditUnitModal(true);
    setEditUnitId(id);
  };

  const deleteUnit = async (id) => {
    try {
      const response = await axios.delete(
        `/${localUser._id}/products/units/${id}`
      );
      if (response.data.status) {
        setUnits((prevUnits) => prevUnits.filter((unit) => unit._id !== id));
        toast.success("Unit deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="units-container">
      <div className="title">
        <h3>Units</h3>
        <button id="export-csv">
          <Icon icon="foundation:page-export-csv" />
          Export as .csv
        </button>
      </div>
      <div className="add-new-unit">
        <div className="heading">
          <p>Add New Unit</p>
          {openNewUnitForm && (
            <Icon
              onClick={() => setOpenNewUnitForm(false)}
              icon="tabler:chevron-up"
              width="24px"
              height="24px"
              color="#3C3B39"
            />
          )}
          {!openNewUnitForm && (
            <Icon
              onClick={() => setOpenNewUnitForm(true)}
              icon="tabler:chevron-down"
              width="24px"
              height="24px"
              color="#3C3B39"
            />
          )}
        </div>
        {openNewUnitForm && (
          <>
            <hr color="#DADADA" />
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="unit-names">
                <Input
                  label="Unit Name"
                  required={true}
                  placeholder="E.g. Kilogram"
                  name="unitName"
                  type="text"
                  register={register("unitName", {
                    required: "Enter a unit name",
                  })}
                  error={errors.unitName}
                />
                <Input
                  label="Unit Short Name"
                  required={true}
                  placeholder="E.g. Kg"
                  name="unitShortName"
                  type="text"
                  register={register("unitShortName", {
                    required: "Enter a unit short name",
                  })}
                  error={errors.unitShortName}
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
                <button
                  className="cancel"
                  onClick={() => setOpenNewUnitForm(false)}
                >
                  Cancel
                </button>
                <Button className="save">
                  {savingUnit ? "Saving.." : "Save"}
                </Button>
              </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
      </div>
      <hr />
      <div className="products-units">
        <p>Products Units</p>
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search Unit"
            onChange={(e) => setSearchunit(e.target.value)}
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
                  Unit Name{" "}
                  <Icon icon="radix-icons:caret-sort" width={24} height={24} />
                </div>
              </th>
              <th>
                <div>
                  Short Name{" "}
                  <Icon icon="radix-icons:caret-sort" width={24} height={24} />
                </div>
              </th>
              <th>
                <div>
                  Allow Decimal{" "}
                  <Icon icon="radix-icons:caret-sort" width={24} height={24} />
                </div>
              </th>
              <th>
                <div>Action </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit) => (
              <tr key={unit._id}>
                <td>{unit.name}</td>
                <td>{unit.shortName}</td>
                <td>{unit.allowDecimal === true ? "Yes" : "No"}</td>
                <td>
                  <div className="actions">
                    <img
                      src={editIcon}
                      alt="Edit"
                      onClick={() => onEditUnit(unit._id)}
                    />
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      onClick={() => deleteUnit(unit._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editUnitModal && (
          <EditUnitModal
            setEditUnitModal={setEditUnitModal}
            localUser={localUser}
            editUnitId={editUnitId}
          />
        )}
        {loading && <p className="no-unit">Loading...</p>}
        {filteredUnits.length === 0 && !loading && (
          <p className="no-unit">No unit </p>
        )}
      </div>
    </div>
  );
};

export default Units;
