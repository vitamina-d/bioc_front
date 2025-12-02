import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import img from "../assets/gene.png";

export type Toast = {
    date: number;
    message: string;
    type?: "primary" | "warning" | "danger" | "secondary";
    status: "Success" | "Warning" | "Error";
};
export type ShowToast = (
    message: string,
    status: Toast["status"],
    type?: Toast["type"]
) => void;

type ToastContextType = {
    showToast: ShowToast;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("Toast se está ejecutando fuera del <ToastProvider>");
    return context;
};

///COMPONENT
type Props = {
    children: ReactNode;
};

export const ToastProvider = ({ children }: Props) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (
        message: string,
        status: Toast["status"],
        type: Toast["type"]
    ) => {
        const date = Date.now();
        const addToast: Toast = { date, message, type, status };
        setToasts((stack) => [...stack, addToast]);
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
            <ToastContainer
                position="top-end"
                className="position-fixed p-3"
                style={{ zIndex: 2001 }}
            >
                {toasts.map((toast) => (
                    <Toast
                        key={toast.date}
                        animation={true}
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
                            <strong className="me-auto ">Notification</strong>
                            <small className={`text-${toast.type}`}>
                                {toast.status}
                            </small>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};
