import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";

type Props = {
    prediction: string | null;
    predictionpLDDT: number[] | null;
    reference: string | null;
    style: "stick" | "cartoon" | "line" | "sphere"; 
    showReference: boolean;
};

function CompareProteinViewer({
    prediction,
    predictionpLDDT,
    reference,
    style = "cartoon",
    showReference,
}: Props) {
    const htmlElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!htmlElem.current) return;

        const viewer = $3Dmol.createViewer(htmlElem.current, {
            backgroundColor: "white",
            antialias: true,
            disableFog: true,
        });

        //0. PREDICTION
        if (prediction != null) {
            viewer.addModel(prediction, "pdb");
            // pLDDT a cada atom
            if (predictionpLDDT != null) {
                const model = viewer.getModel(0);
                const atoms = model.selectedAtoms({});
                atoms.forEach((atom, idx) => {
                    const p = predictionpLDDT[idx] ?? 0;
                    atom.b = p; // (0;100)
                });
                
            }
            viewer.setStyle(
                { model: 0 },
                {
                    [style]: {
                        colorscheme: {
                            prop: "b", // en atom.b esta el pLDDT
                            gradient: "linear",
                            min: 0,
                            max: 100,
                            colors: ["#0053D6", "#65CBF3", "#FFDB13", "#FF7D45"],
                        },
                    },
                }
            );
        }

        //1. REFRENCE
        if (showReference && reference != null) {
            viewer.addModel(reference, "pdb");
            viewer.setStyle({ model: 1 }, { [style]: { color: "#C0C0C0" } });
        }

        viewer.zoomTo();
        viewer.render();
    }, [prediction, reference, showReference, style]);

    return (
        <div
            ref={htmlElem}
            style={{
                width: "100%",
                height: "400px",
                position: "relative",
            }}
        />
    );
}

export default CompareProteinViewer;
