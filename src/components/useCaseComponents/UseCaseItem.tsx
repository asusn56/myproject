import { UseCase, useUseCases } from "../../pages/useCases/UseCasePageProvider";
import { Link } from "react-router";
import UseCaseForm from "./UseCaseForm";
import { FaEdit, FaTrash } from 'react-icons/fa';

type UseCaseItemProps = {
  data: UseCase;
};

const UseCaseItem: React.FC<UseCaseItemProps> = ({ data }) => {
  const { getEditUseCase, editUseCase, deleteUseCaseHandler } = useUseCases();
  
  if (editUseCase && editUseCase.id === data.id) {
    return (
      <div className="useCase-item editing">
        <UseCaseForm editUseCaseData={data} />
        <button onClick={() => getEditUseCase(null)}>Cancel</button>
      </div>
    );
  }
  
  return (
    <div className="useCase-item">
      <h3>
        <Link to={`/useCases/${data.id}`}>{data.useCase}</Link>
      </h3>
      <div className="controls">
        <button onClick={() => getEditUseCase(data)}><FaEdit/>Edit</button>
        <button onClick={() => deleteUseCaseHandler(data.id)}><FaTrash/>Delete</button>
      </div>
    </div>
  );
};

export default UseCaseItem;