import type { FormEventHandler, ReactNode } from "react";

interface Props {
    children: ReactNode;
    isLoading: boolean;
    onClick: FormEventHandler
}

function Button({ children, isLoading, onClick }: Props) {
    return (
        <>
            <button
                type="button"
                className={`btn mb-3 btn-${
                    isLoading ? "secondary" : "primary"
                }`}
                disabled={isLoading}
                onClick={onClick}
            >
                {isLoading ? "Cargando..." : children}
            </button>
        </>
    );
}

export default Button;
