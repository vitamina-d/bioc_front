
type Props = {
    setStart: React.Dispatch<React.SetStateAction<string>>, 
    setEnd: React.Dispatch<React.SetStateAction<string>>,
};

function Range( { setStart, setEnd }: Props ) {

        return (
        <>
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="startInput" className="form-label">
                        Desde
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="startInput"
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>
                <div className="col">
                    <label htmlFor="endInput" className="form-label">
                        Hasta
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="endInput"
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}

export default Range;
