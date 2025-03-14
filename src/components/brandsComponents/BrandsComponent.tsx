import { Brand, useBrands } from "../../pages/brands/BrandsPageContextProvider";
import { Link } from "react-router";
import BrandsForm from "./BrandsForm";
import { FaEdit, FaTrash } from 'react-icons/fa';

type BrandsComponentProps = {
  data: Brand;
};

const BrandsComponent: React.FC<BrandsComponentProps> = ({ data }) => {
  const { getEditBrand, editBrand, deleteBrand } = useBrands();

  if (editBrand && editBrand.id === data.id) {
    return (
      <div className="brand-item-edit">
        <BrandsForm editBrandData={data} />
        <button onClick={() => getEditBrand(null)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="brand-item">
      <h3>
        <Link to={`/brands/${data.id}`}>{data.brand}</Link>
      </h3>
      <div className="controls">
        <button onClick={() => getEditBrand(data)}><FaEdit />Edit</button>
        <button onClick={() => deleteBrand(data.id)}><FaTrash />Delete</button>
      </div>
    </div>
  );
};

export default BrandsComponent;