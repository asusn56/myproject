import { UseCase } from "../../pages/useCases/UseCasePageProvider";
import UseCaseComponent from "../../components/useCaseComponents/UseCaseComponent";

type UseCaseItemProps = {
  data: UseCase;
};

const UseCaseItem: React.FC<UseCaseItemProps> = ({ data }) => {
  return (
    <div>
      <UseCaseComponent data={data} />
    </div>
  );
};

export default UseCaseItem;