import { useState } from "react";

function Range() {
    const [start, setStart] = useState("700000");
    const [end, setEnd] = useState("702000");
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
                        value={start}
                        onChange={(e) => {
                            return setStart(e.target.value);
                        }}
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
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}

export default Range;
