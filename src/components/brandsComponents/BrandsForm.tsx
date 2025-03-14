import { useState, useEffect } from "react";
import { useBrands, Brand } from "../../pages/brands/BrandsPageContextProvider";

type BrandFormProps = {
  editBrandData?: Brand;
};

const BrandForm: React.FC<BrandFormProps> = ({ editBrandData }) => {
  const { addBrand, getEditBrand, editBrandHandler } = useBrands();
  
  const [brandsData, setbrandsData] = useState({
    brand: "",
  });

  useEffect(() => {
    if (editBrandData) {
      setbrandsData({
        brand: editBrandData.brand,
      });
    }
  }, [editBrandData]);

  const brandsDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setbrandsData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (editBrandData) {
      const updatedBrand: Brand = {
        ...editBrandData,
        ...brandsData,
      };
      editBrandHandler(updatedBrand);
    } else {
      addBrand(brandsData);
    }

    setbrandsData({
      brand: "",
    });
    getEditBrand(null);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="brand">Brand</label>
        <input id="brand"  type="text" name="brand" value={brandsData.brand} onChange={brandsDataHandler} required/>
      </div>
      <button type="submit">{editBrandData ? "Edit" : "Save"}</button>
    </form>
  );
};

export default BrandForm;
