import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { createNewAmplifier, deleteAmplifier, fetchAllAmplifiers, updateAmplifier } from "../../api/Amplifiers";

export enum AmplifierActionTypes {
    ADD_AMPLIFIER = "ADD_AMPLIFIER",
    FETCH_AMPLIFIERS = "FETCH_AMPLIFIERS",
    SET_EDIT_AMPLIFIER = "SET_EDIT_AMPLIFIER",
    DELETE_AMPLIFIER = "DELETE_AMPLIFIER"
}

export type AmplifierAction =
    | { type: AmplifierActionTypes.ADD_AMPLIFIER; payload: Amplifier }
    | { type: AmplifierActionTypes.FETCH_AMPLIFIERS; payload: Amplifier[] }
    | { type: AmplifierActionTypes.SET_EDIT_AMPLIFIER; payload: Amplifier | null }
    | { type: AmplifierActionTypes.DELETE_AMPLIFIER; payload: string };
    ;
    
export interface createAmplifier {  
    model: string
    brandId: string
    categoryId: string
    useCaseId: string 
    description: string
    imageLink: string
}

export interface Amplifier extends createAmplifier {
    id: string
}

type AmplifierContextType = {
    amplifiersList: Amplifier[]
    editAmplifier: Amplifier | null;
    getEditAmplifier: (amplifier: Amplifier | null) => void;
    addAmplifier: (amplifier: createAmplifier) => void;
    editAmplifierHandler: (updatedAmplifier: Amplifier) => void;
    deleteAmplifierHandler: (id: string) => void;
    getAmplifierById: (id: string) => Amplifier | undefined;
    
}

type AmplifierContextProviderProps = {
    children: ReactNode;
}

type AmplifierState = {
    amplifiers: Amplifier[];
    editAmplifier: Amplifier | null;
};

const initialState: AmplifierState = {
    amplifiers: [],
    editAmplifier: null, 
};

const AmplifierContext = createContext<AmplifierContextType | undefined>(undefined);

export const AmplifierContextProvider: React.FC<AmplifierContextProviderProps> = ({ children }) => {
   
    const reducer = (state: AmplifierState, action: AmplifierAction): AmplifierState => { 
         //  const removeItemId = action.payload
        switch (action.type) {
        case AmplifierActionTypes.FETCH_AMPLIFIERS:
            return {
                ...state,
                amplifiers: action.payload,
            };
        case AmplifierActionTypes.ADD_AMPLIFIER:
            return {
                ...state,
                amplifiers: [...state.amplifiers, action.payload],
            };
        case AmplifierActionTypes.SET_EDIT_AMPLIFIER:
            return {
                ...state,
                editAmplifier: action.payload, 
            };
            case AmplifierActionTypes.DELETE_AMPLIFIER:
             
                return {
                    ...state,
                    amplifiers: state.amplifiers.filter((amplifier) => amplifier.id !== action.payload),
                };
        default:
            return state;
           
    } };

    const [state, dispatch] = useReducer(reducer, initialState)

    const { amplifiers, editAmplifier } = state;

    useEffect(() => {
        const fetchAllAmplifiersData = async () => {
           const data = await fetchAllAmplifiers();
           dispatch({ type: AmplifierActionTypes.FETCH_AMPLIFIERS, payload: data });
        }
        fetchAllAmplifiersData();
    }, []);

    const addAmplifier = async (amplifier: createAmplifier) => {
        try {
            const createdAmplifier = await createNewAmplifier(amplifier);
            dispatch({ type: AmplifierActionTypes.ADD_AMPLIFIER, payload: createdAmplifier });
        } catch (error) {
            console.error("addAmplifier AmplifierContextProvider componente ", error);
        }
    };

    const getEditAmplifier = (amplifier: Amplifier | null) => {
        dispatch({ type: AmplifierActionTypes.SET_EDIT_AMPLIFIER, payload: amplifier });
    };

    const editAmplifierHandler = async (updatedAmplifier: Amplifier) => {
        try {
            const res = await updateAmplifier(updatedAmplifier); 
            const updatedAmplifiers = amplifiers.map((amplifier) => 
                amplifier.id === updatedAmplifier.id ? res : amplifier
            );
            
            dispatch({ type: AmplifierActionTypes.FETCH_AMPLIFIERS, payload: updatedAmplifiers});
            dispatch({ type: AmplifierActionTypes.SET_EDIT_AMPLIFIER, payload: null }); 
        } catch (error) {
            console.error("editAmplifierHandler Error", error);
            
        }
    };
    const deleteAmplifierHandler = async (id: string) => {
        try {
            await deleteAmplifier(id);
            dispatch({ type: AmplifierActionTypes.DELETE_AMPLIFIER, payload: id });
        } catch (error) {
            console.error("deleteAmplifierHandler error", error);
        }
    };
    
    const getAmplifierById = (id: string): Amplifier | undefined => {
       const dtx =  amplifiers.find((amplifier) => amplifier.id === id);
       console.log(dtx);
       
        return dtx;
      
        
      };
      

    

    const ctxValue: AmplifierContextType = {
        amplifiersList: amplifiers,
        editAmplifier: editAmplifier,
        getEditAmplifier, 
        addAmplifier,     
        editAmplifierHandler, 
        deleteAmplifierHandler,
        getAmplifierById
    }

    return (
        <AmplifierContext.Provider value={ctxValue}>
            {children}
        </AmplifierContext.Provider>
    )
}

export default AmplifierContextProvider;

export const useAmplifiers = () => {
    const ctx = useContext(AmplifierContext);

    if (!ctx) {
        throw new Error("useAmplifiers error");
    }

    return ctx;
}