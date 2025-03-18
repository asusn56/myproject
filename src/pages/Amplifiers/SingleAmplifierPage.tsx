import { useParams, useNavigate } from "react-router";
import { useAmplifiers } from "./AmplifierContextProvider";
import AmplifierItem from "../../components/amplifierComponents/AmplifierItem";

export const AmplifierPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getAmplifierById } = useAmplifiers();

    const amplifier = getAmplifierById(id!);
    
    if (!amplifier) {
        return <div>Amplifier not found</div>;
    }

    return (
        <div className="amplifier-item-wrapper">
            <AmplifierItem data={amplifier} />
            <button onClick={() => navigate("/amplifiers")}>Back to List</button>
        </div>
    );
};

export default AmplifierPage;