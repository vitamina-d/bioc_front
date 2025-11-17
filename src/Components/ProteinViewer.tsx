import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";

type Props = {
    prediction: string;
    predictionpLDDT: number[];
    reference: string | null;
    style?: "stick" | "cartoon" | "line" | "sphere"; //renderizado
    size?: "sm";
};

function ProteinViewer({
    size,
    prediction,
    predictionpLDDT,
    reference,
    style = "cartoon",
}: Props) {
    const htmlElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!htmlElem.current) return;

        const viewer = $3Dmol.createViewer(htmlElem.current, {
            backgroundColor: "white",
            antialias: true,
            disableFog: true,
        });


        viewer.addModel(prediction, "pdb");
        const model = viewer.getModel(0);
        const atoms = model.selectedAtoms({});

        atoms.forEach((atom, idx) => {
            atom.b = predictionpLDDT[idx] ?? 0; // pLDDT a cada atom
        });

        viewer.setStyle(
            { model: 0 },
            {
                cartoon: {
                    color: "spectrum", 
                },
            }
        );

        /*
90–100: azul
70–90: cian
50–70: amarillo
<50: rojo
        */
        //viewer.setStyle({ model: modelIndex }, { [style]: { color: "red" } });
        

            viewer.addModel(reference, "pdb");
            viewer.setStyle(
                { model: 1 },
                { [style]: { color: "red" } }
            );

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

export default ProteinViewer;
