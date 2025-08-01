type Props = {
    options: string[];
};

function Dropdown({ options }: Props) {
    return (
        <>
            <div className="input-group mb-3">
                <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                >
                    Cromosoma
                </label>
                <select className="form-select" id="inputGroupSelect01">
                    <option value="">Seleccione...</option>
                    {options.map((elem, i) => (
                        <option key={i} value={elem}>{elem}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default Dropdown;
