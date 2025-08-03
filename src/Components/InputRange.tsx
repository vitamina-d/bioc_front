import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    number: string; 
    setNumber: React.Dispatch<React.SetStateAction<string>>;
};

function InputRange({ children, number, setNumber }: Props) {
    return (
        <>
            <div className="input-group mb-3 w-auto">
                <label className="input-group-text">{children}</label>
                <input
                    type="number"
                    className="form-control"
                    id="inputRange"
                    placeholder={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
        </>
    );
}

export default InputRange;
