import { useParams, useNavigate } from "react-router";
import { useUseCases } from "./UseCasePageProvider";
import UseCaseComponent from "../../components/useCaseComponents/UseCaseItem";

export const UseCasePage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useCasesList } = useUseCases();
    
    const useCase = useCasesList.find(uc => uc.id === id);

    if (!useCase) {
        return <div>Use Case not found</div>;
    }

    return (
        <div className="useCase-item-wrapper">
            <UseCaseComponent data={useCase} />
            <button onClick={() => navigate("/useCases")}>Back to List</button>
            </div>
    );
};

export default UseCasePage;