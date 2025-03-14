import { Amplifier } from "../../pages/Amplifiers/AmplifierContextProvider";
import AmplifierComponent from "./AmplifierComponent";

type AmplifierItemProps = {
  data: Amplifier;
};

const AmplifierItem: React.FC<AmplifierItemProps> = ({ data }) => {
  return (
    <div className="amplifier-item">
      <AmplifierComponent data={data} />
    </div>
  );
};

export default AmplifierItem;