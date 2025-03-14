import { useParams, useNavigate } from "react-router";
import Container from "../../components/Container";
import { useBrands } from "./BrandsPageContextProvider";
import BrandsComponent from "../../components/brandsComponents/BrandsComponent";

export const SingleBrandPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { brandsList } = useBrands();
    
    const brand = brandsList.find(b => b.id === id);

    if (!brand) {
        return <div>Brand not found</div>;
    }

    return (
        <Container>
            <BrandsComponent data={brand} />
            <button onClick={() => navigate("/brands")}>Back to List</button>
        </Container>
    );
};

export default SingleBrandPage;