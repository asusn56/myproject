import { useBrands } from "../../pages/brands/BrandsPageContextProvider";
import BrandItem from "./BrandsItem";

const BrandsList: React.FC = () => {
  const { brandsList } = useBrands();

  if (brandsList.length === 0) {
    return <div>No brands found.</div>;
  }

  return (
    <div className="brands-list">
      {brandsList.map((brand) => (
        <BrandItem key={brand.id} data={brand} />
      ))}
    </div>
  );
};

export default BrandsList;
