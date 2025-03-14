import { Amplifier, useAmplifiers } from "../../pages/Amplifiers/AmplifierContextProvider";
import { useBrands } from "../../pages/brands/BrandsPageContextProvider";
import { useUseCases } from "../../pages/useCases/UseCasePageProvider";
import { useCategories } from "../../pages/categories/CategoryContextProvider";
import AmplifierForm from "./AmplifierForm";
import { Link } from "react-router";
import { FaEdit, FaTrash } from 'react-icons/fa';

type AmplifierComponentProps = {
  data: Amplifier;
};

const AmplifierComponent: React.FC<AmplifierComponentProps> = ({ data }) => {
  const { getEditAmplifier, editAmplifier, deleteAmplifierHandler } = useAmplifiers();
  const { brandsList } = useBrands();
  const { useCasesList } = useUseCases();
  const { categoriesList } = useCategories();

  const brand = brandsList.find((brand) => brand.id === data.brandId);
  const useCase = useCasesList.find((useCase) => useCase.id === data.useCaseId);
  const category = categoriesList.find((category) => category.id === data.categoryId);

  if (editAmplifier && editAmplifier.id === data.id) {
    return (
      <div className="amplifier-item editing">
        <AmplifierForm editAmplifierData={data} />
        <button onClick={() => getEditAmplifier(null)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="amplifier-item">
      <h3>
        <Link to={`/amplifiers/${data.id}`}>{data.model}</Link>
      </h3>
      <image>{data.imageLink && <img src={data.imageLink} alt={data.model} />}</image>
      <p>Brand: {brand ? brand.brand : "Not Found"}</p>
      <p>Category: {category ? category.category : "Not Found"}</p>
      <p>Use Case: {useCase ? useCase.useCase : "Not Found"}</p>
      <p>Description: {data.description}</p>

      <div className="controls">
        <button onClick={() => getEditAmplifier(data)}><FaEdit />Edit</button>
        <button onClick={() => deleteAmplifierHandler(data.id)}><FaTrash />Delete</button>
      </div>
    </div>
  );


};

export default AmplifierComponent;