import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "./Icon";

type Props = {
    prediction: string | null;
    reference: string | null;
    filenames: {
        prediction: string;
        reference: string;
    };
};

function DownloadButtons({ prediction, reference, filenames }: Props) {
    const downloadFile = (pdb: string, filename: string) => {
        const blob = new Blob([pdb], { type: "chemical/x-pdb" }); //memoria o { type: "text/plain" }
        const url = URL.createObjectURL(blob); //enlace de descarga

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className="d-flex justify-content-between">
            {prediction && (
                <OverlayTrigger
                    overlay={<Tooltip>Download Prediction</Tooltip>}
                >
                    <Button
                        variant="light"
                        size="sm"
                        onClick={() =>
                            downloadFile(
                                prediction,
                                filenames.prediction ?? "prediction.pdb"
                            )
                        }
                    >
                        <Icon type={"download"} />
                        {" "}PREDICTION
                    </Button>
                </OverlayTrigger>
            )}
            {reference && (
                <OverlayTrigger overlay={<Tooltip>Download Reference</Tooltip>}>
                    <Button
                        variant="light"
                        size="sm"
                        className="ms-2"
                        onClick={() =>
                            downloadFile(
                                reference,
                                filenames.reference ?? "reference.pdb"
                            )
                        }
                    >
                        <Icon type={"download"} />
                        {" "}REFERENCE
                    </Button>
                </OverlayTrigger>
            )}
        </div>
    );
}

export default DownloadButtons;
