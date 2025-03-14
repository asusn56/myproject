import { useParams, useNavigate } from "react-router";
import Container from "../../components/Container";
import { useUseCases } from "./UseCasePageProvider";
import UseCaseComponent from "../../components/useCaseComponents/UseCaseComponent";

export const UseCasePage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useCasesList } = useUseCases();
    
    const useCase = useCasesList.find(uc => uc.id === id);

    if (!useCase) {
        return <div>Use Case not found</div>;
    }

    return (
        <Container>
            <UseCaseComponent data={useCase} />
            <button onClick={() => navigate("/useCases")}>Back to List</button>
        </Container>
    );
};

export default UseCasePage;