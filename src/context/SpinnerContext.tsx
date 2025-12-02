import { createContext, useContext, useState, type ReactNode } from "react";
import { Spinner } from "react-bootstrap";

type SpinnerContextType = {
    showSpinner: () => void;
    hideSpinner: () => void;
};

const SpinnerContext = createContext<SpinnerContextType | null>(null);

export const useSpinnerContext = () => {
    const context = useContext(SpinnerContext);
    if (!context)
        throw new Error(
            "Spinner se está ejecutando fuera del <SpinnerProvider>"
        );
    return context;
};

///COMPONENT
type Props = {
    children: ReactNode;
};

export function SpinnerProvider({ children }: Props) {
    const [loading, setLoading] = useState<boolean>(false);

    const showSpinner = () => {
        setLoading(true);
    };
    const hideSpinner = () => {
        setLoading(false);
    };

    return (
        <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
            {children}
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.35)",
                        zIndex: 2000,
                    }}
                >
                    <Spinner animation="border" />
                </div>
            )}
        </SpinnerContext.Provider>
    );
}
