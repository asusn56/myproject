import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { createNewUseCase, fetchAllUseCases, updateUseCase, deleteUseCase  } from "../../api/UseCase";


export enum UseCaseActionTypes {
    ADD_USE_CASE = "ADD_USE_CASE",
    FETCH_USE_CASES = "FETCH_USE_CASES",
    SET_EDIT_USE_CASE = "SET_EDIT_USE_CASE",
    DELETE_USE_CASE = "DELETE_USE_CASE",
}

export type UseCaseAction =
    | { type: UseCaseActionTypes.ADD_USE_CASE; payload: UseCase }
    | { type: UseCaseActionTypes.FETCH_USE_CASES; payload: UseCase[] }
    | { type: UseCaseActionTypes.SET_EDIT_USE_CASE; payload: UseCase | null }
    | { type: UseCaseActionTypes.DELETE_USE_CASE; payload: string };

export interface createUseCase {
    useCase: string;
}

export interface UseCase extends createUseCase {
    id: string;
}

type UseCaseContextType = {
    useCasesList: UseCase[];
    editUseCase: UseCase | null;
    getEditUseCase: (useCase: UseCase | null) => void;
    addUseCase: (useCase: createUseCase) => void;
    editUseCaseHandler: (updatedUseCase: UseCase) => void;
    deleteUseCaseHandler: (id: string) => void;
};

type UseCaseContextProviderProps = {
    children: ReactNode;
};

type UseCaseState = {
    useCases: UseCase[];
    editUseCase: UseCase | null;
};

const initialState: UseCaseState = {
    useCases: [],
    editUseCase: null,
};

const UseCaseContext = createContext<UseCaseContextType | undefined>(undefined);

export const UseCaseContextProvider: React.FC<UseCaseContextProviderProps> = ({ children }) => {

    const reducer = (state: UseCaseState, action: UseCaseAction): UseCaseState => {
        switch (action.type) {
        case UseCaseActionTypes.FETCH_USE_CASES:
            return {
                ...state,
                useCases: action.payload,
            };
        case UseCaseActionTypes.ADD_USE_CASE:
            return {
                ...state,
                useCases: [...state.useCases, action.payload],
            };
        case UseCaseActionTypes.SET_EDIT_USE_CASE:
            return {
                ...state,
                editUseCase: action.payload,
            };
        case UseCaseActionTypes.DELETE_USE_CASE:
            return {
                ...state,
                useCases: state.useCases.filter((useCase) => useCase.id !== action.payload),
            };
        default:
            return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const { useCases, editUseCase } = state;

    useEffect(() => {
        const fetchAllUseCasesData = async () => {
            const data = await fetchAllUseCases();
            dispatch({ type: UseCaseActionTypes.FETCH_USE_CASES, payload: data });
        };
        fetchAllUseCasesData();
    }, []);

    const addUseCase = async (useCase: createUseCase) => {
        try {
            const createdUseCase = await createNewUseCase(useCase);
            dispatch({ type: UseCaseActionTypes.ADD_USE_CASE, payload: createdUseCase });
        } catch (error) {
            console.error("Failed to add use case:", error);
        }
    };

    const getEditUseCase = (useCase: UseCase | null) => {
        dispatch({ type: UseCaseActionTypes.SET_EDIT_USE_CASE, payload: useCase });
    };

    const editUseCaseHandler = async (updatedUseCase: UseCase) => {
        try {
            const res = await updateUseCase(updatedUseCase);
            const updatedUseCases = useCases.map((useCase) =>
                useCase.id === updatedUseCase.id ? res : useCase
            );
            dispatch({ type: UseCaseActionTypes.FETCH_USE_CASES, payload: updatedUseCases });
            dispatch({ type: UseCaseActionTypes.SET_EDIT_USE_CASE, payload: null });
        } catch (error) {
            console.error("Failed to update use case:", error);
            throw new Error("editUseCaseHandler Error");
        }
    };

    const deleteUseCaseHandler = async (id: string) => {
        try {
            await deleteUseCase(id);
            dispatch({ type: UseCaseActionTypes.DELETE_USE_CASE, payload: id });
        } catch (error) {
            console.error("Failed to delete use case:", error);
            throw new Error("deleteUseCaseHandler Error");
        }
    };

    const ctxValue: UseCaseContextType = {
        useCasesList: useCases,
        editUseCase: editUseCase,
        getEditUseCase,
        addUseCase,
        editUseCaseHandler,
        deleteUseCaseHandler,
    };

    return (
        <UseCaseContext.Provider value={ctxValue}>
            {children}
        </UseCaseContext.Provider>
    );
};

export default UseCaseContextProvider;

export const useUseCases = () => {
    const ctx = useContext(UseCaseContext);

    if (!ctx) {
        throw new Error("useUseCases error");
    }

    return ctx;
};
