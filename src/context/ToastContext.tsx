import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import img from "../assets/gene.png"

type Toast = {
    date: number;
    message: string;
    type?: "primary" | "warning" | "danger" | "secondary";
};

type ToastContextType = {
    showToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("no hay contexto");
    return context;
};

///COMPONENT
type Props = {
    children: ReactNode;
};

export function ToastProvider({ children }: Props) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: Toast["type"] = "secondary") => {
        const date = Date.now();
        const addToast: Toast = { date, message, type };
        setToasts((stack) => [...stack, addToast ]);
        setTimeout(() => {
            setToasts((stack) => stack.filter((toast) => toast.date !== date));
        }, 100000);
    };

    const onClose = (date: number) => {
        setToasts((stack) => stack.filter((toast) => toast.date != date));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer position="top-end" className="position-fixed p-3">
                {toasts.map((toast) => (
                    <Toast
                        animation={true}
                        bg={`bg-${toast.type}`}
                        onClose={() => onClose(toast.date)}
                    >
                        <Toast.Header>
                            <img
                                src={img}
                                width="20"
                                height="20"
                                className="rounded me-1"
                                alt="Logo"
                            />
                            <strong className="me-auto">Message</strong>
                            <small>{toast.date}</small>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}
