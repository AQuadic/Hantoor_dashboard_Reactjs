import React from "react";
import { useParams } from "react-router";

const AddBrand = () => {
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const oldValues = {
    image: "aaa",
    name: "car name",
  };

  return <div>{isEdit ? "Edit Brand" : "Add Brand"}</div>;
};

export default AddBrand;
