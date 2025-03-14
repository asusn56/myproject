import { useState, useEffect } from "react";
import { Amplifier, useAmplifiers } from "../../pages/Amplifiers/AmplifierContextProvider";
import { useUseCases } from "../../pages/useCases/UseCasePageProvider";
import { useBrands } from "../../pages/brands/BrandsPageContextProvider";
import { useCategories } from "../../pages/categories/CategoryContextProvider";

type AmplifierFormProps = {
  editAmplifierData?: Amplifier;
};

const AmplifierForm: React.FC<AmplifierFormProps> = ({ editAmplifierData }) => {
  const { addAmplifier, getEditAmplifier, editAmplifierHandler } = useAmplifiers();
  const { useCasesList } = useUseCases();
  const { brandsList } = useBrands();
  const { categoriesList } = useCategories();

  const [amplifierData, setamplifierData] = useState({
    model: "",
    brandId: "",
    categoryId: "",
    useCaseId: "",
    description: "",
    imageLink: "",
  });

  useEffect(() => {
    if (!editAmplifierData) {
      setamplifierData(prev => ({
        ...prev,
        categoryId: "",
      }));
    }
  }, [categoriesList]);

  useEffect(() => {
    if (editAmplifierData) {
      setamplifierData({
        model: editAmplifierData.model,
        brandId: editAmplifierData.brandId,
        categoryId: editAmplifierData.categoryId,
        useCaseId: editAmplifierData.useCaseId,
        description: editAmplifierData.description,
        imageLink: editAmplifierData.imageLink,
      });
    }
  }, [editAmplifierData]);


  const amplifierDataHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setamplifierData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (editAmplifierData) {

      const updatedAmplifier: Amplifier = {
        ...editAmplifierData,
        ...amplifierData
      };
      editAmplifierHandler(updatedAmplifier);
    } else {
      addAmplifier(amplifierData);
    }


    setamplifierData({
      model: "",
      brandId: "",
      categoryId: "",
      useCaseId: "",
      description: "",
      imageLink: "",
    });


    getEditAmplifier(null);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="model">Model</label>
        <input id="model" type="text" name="model" value={amplifierData.model} onChange={amplifierDataHandler} required />
      </div>

      <div className="form-control">
        <label htmlFor="brandId">Brand</label>
        <select id="brandId" name="brandId" value={amplifierData.brandId} onChange={amplifierDataHandler} required>
          <option value="">Select  Brand</option>
          {brandsList.map((brand) => (
           <option key={brand.id} value={brand.id}>{brand.brand}</option>
          ))}
        </select>
      </div>


      <div className="form-control">
        <label htmlFor="categoryId">Category</label>
        <select id="categoryId" name="categoryId" value={amplifierData.categoryId} onChange={amplifierDataHandler} required>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>{category.category}</option>
          ))}
        </select>
      </div>



      <div className="form-control">
        <label htmlFor="useCaseId">Use Case</label>
        <select id="useCaseId" name="useCaseId" value={amplifierData.useCaseId} onChange={amplifierDataHandler} required>
          {useCasesList.map((useCase) => (
            <option key={useCase.id} value={useCase.id}>{useCase.useCase}</option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={amplifierData.description} onChange={amplifierDataHandler} required />
      </div>

      <div className="form-control">
        <label htmlFor="imageLink">Image URL</label>
        <input id="imageLink" type="text" name="imageLink" value={amplifierData.imageLink} onChange={amplifierDataHandler} />
      </div>

      <button type="submit">{editAmplifierData ? 'Edit' : 'Save'}</button>

    </form>
  );
};

export default AmplifierForm;