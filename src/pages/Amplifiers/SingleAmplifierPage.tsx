import { useParams, useNavigate } from "react-router";
import Container from "../../components/Container";
import { useAmplifiers } from "./AmplifierContextProvider";
import AmplifierComponent from "../../components/amplifierComponents/AmplifierComponent";

export const AmplifierPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getAmplifierById } = useAmplifiers();

    const amplifier = getAmplifierById(id!);
    
    if (!amplifier) {
        return <div>Amplifier not found</div>;
    }

    return (
        <Container>
            <AmplifierComponent data={amplifier} />
            <button onClick={() => navigate("/amplifiers")}>Back to List</button>
        </Container>
    );
};

export default AmplifierPage;