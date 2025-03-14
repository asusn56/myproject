  import { useUseCases } from "../../pages/useCases/UseCasePageProvider";
import UseCaseItem from "./UseCaseItem";

  const UseCaseList: React.FC = () => {
    const { useCasesList } = useUseCases();
    
    if (useCasesList.length === 0) {
      return <div>No use cases found.</div>;
    }
    
    return (
      <div className="useCase-list">
        {useCasesList.map((UseCase) => (
          <UseCaseItem key={UseCase.id} data={UseCase} />
        ))}
      </div>
    );
  };

  export default UseCaseList;
