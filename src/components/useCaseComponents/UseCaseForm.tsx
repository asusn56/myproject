import { useState, useEffect } from "react";
import { UseCase, useUseCases } from "../../pages/useCases/UseCasePageProvider";

type UseCaseFormProps = {
  editUseCaseData?: UseCase;
};

const UseCaseForm: React.FC<UseCaseFormProps> = ({ editUseCaseData }) => {
  const { addUseCase, getEditUseCase, editUseCaseHandler } = useUseCases();

  const [useCaseData, setuseCaseData] = useState({
    useCase: "",
  });

  useEffect(() => {
    if (editUseCaseData) {
      setuseCaseData({
        useCase: editUseCaseData.useCase,
      });
    }
  }, [editUseCaseData]);

  const useCaseHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuseCaseData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (editUseCaseData) {
      const updatedUseCase: UseCase = {
        ...editUseCaseData,
        ...useCaseData,
      };
      editUseCaseHandler(updatedUseCase);
    } else {
      addUseCase(useCaseData);
    }

    setuseCaseData({
      useCase: "",
    });

    getEditUseCase(null);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="useCase">Add New Use Case: </label>
        <input id="useCase" type="text" name="useCase" value={useCaseData.useCase} onChange={useCaseHandler} required />
      </div>

      <button type="submit">{editUseCaseData ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default UseCaseForm;
