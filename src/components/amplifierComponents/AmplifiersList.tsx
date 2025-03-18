
import { Link } from "react-router";
import { useAmplifiers } from "../../pages/Amplifiers/AmplifierContextProvider";
import AmplifierItem from "./AmplifierItem";

const AmplifierList: React.FC = () => {
  const { amplifiersList } = useAmplifiers();
  
  if (amplifiersList.length === 0) {
    return <div>No amplifiers found.L</div>;
  }
  
  return (
   
    <div className="amplifier-list">
       <Link to='/createAmplifier'>Add New Amplifier</Link>

      {amplifiersList.map((amplifier) => (
        <AmplifierItem key={amplifier.id} data={amplifier} />
      ))}
    </div>
    
  );
};

export default AmplifierList;