import { Brand } from "../../pages/brands/BrandsPageContextProvider";
import BrandsComponent from "./BrandsComponent";

type BrandItemProps = {
  data: Brand;
};

const BrandItem: React.FC<BrandItemProps> = ({ data }) => {
  return (
    <div>
      <BrandsComponent data={data} />
    </div>
  );
};

export default BrandItem;