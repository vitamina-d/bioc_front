import CompareProteinViewer from "./CompareProteinViewer";

type Props = {
    prediction: string | null;
    reference: string | null;
    pLDDT: number[];
};

function ModalBodyEstructures({ prediction, reference, pLDDT }: Props) {
    return (
        prediction &&
        reference && (
            <CompareProteinViewer
                prediction={prediction}
                reference={reference}
                predictionpLDDT={pLDDT}
            />
        )
    );
}

export default ModalBodyEstructures;
