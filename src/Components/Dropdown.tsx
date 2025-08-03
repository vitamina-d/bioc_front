import type { ReactNode } from "react";

type optionsReq = {
    label: string,
    value: string,
}[]

type Props = {
    setItem: React.Dispatch<React.SetStateAction<string>>,
    options: optionsReq,
    children: ReactNode
};

function Dropdown({ children, setItem, options }: Props) {
    return (
            <div className="input-group mb-3 w-auto" >
                <label
                    className="input-group-text"
                >
                    {children}
                </label>
                <select id="chrInput" className="form-select" onChange={(e) => setItem(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {options.map((elem, i) => (
                        <option
                            key={i}
                            value={elem.value}
                        >
                            {elem.label}
                        </option>
                    ))}
                </select>
            </div>
    );
}

export default Dropdown;

