import { useParams, useNavigate } from "react-router";
import { useBrands } from "./BrandsPageContextProvider";
import BrandsComponent from "../../components/brandsComponents/BrandsItem";

export const SingleBrandPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { brandsList } = useBrands();
    
    const brand = brandsList.find(brand => brand.id === id);

    if (!brand) {
        return <div>Brand not found</div>;
    }

    return (
      <div className="brand-item-wrapper">
            <BrandsComponent data={brand} />
            <button onClick={() => navigate("/brands")}>Back to List</button>
            </div>
    );
};

export default SingleBrandPage;