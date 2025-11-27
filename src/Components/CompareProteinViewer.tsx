import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";

type Props = {
    prediction: string;
    predictionpLDDT: number[];
    reference: string | null;
    style?: "stick" | "cartoon" | "line" | "sphere"; //renderizado
    size?: "sm";
};

function CompareProteinViewer({
    prediction,
    predictionpLDDT,
    reference,
    style = "cartoon",
    size,
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
            const model = viewer.getModel(0);
            const atoms = model.selectedAtoms({});
            // pLDDT a cada atom
            atoms.forEach((atom, idx) => {
                const p = predictionpLDDT[idx] ?? 0;
                atom.b = p; // (0;100)
            });
            viewer.setStyle(
                { model: 0 },
                {
                    cartoon: {
                        colorscheme: {
                            prop: "b", // en atom.b esta el pLDDT
                            gradient: "linear",
                            min: 0,
                            max: 100,
                            colors: ["blue", "aquamarine", "yellow", "coral"],
                        },
                    },
                }
            );
        }

        //1. REFRENCE
        if (reference != null) {
            //viewer.addModel(reference, "pdb");
            //viewer.setStyle({ model: 1 }, { [style]: { color: "lightgray" } });
        }

        viewer.zoomTo();
        viewer.render();
    }, [prediction, reference, style]);

    return (
        <div
            ref={htmlElem}
            style={{
                width: "100%",
                height: size === "sm" ? "200px" : "400px",
                position: "relative",
            }}
        />
    );
}

export default CompareProteinViewer;

/*
90–100: azul
70–89: cian
50–69: amarillo
<50: rojo
*/
