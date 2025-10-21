import Header from "../Components/Header";
import PlotAlign from "../Components/Plots/PlotAlign";
import { useState } from "react";
import AlignSequences from "../Components/AlignSequences";
import ButtonBadge from "../Components/ButtonBadge";
import type { DataAlign } from "../types/DataPlumber";
import { CardBody, Container } from "react-bootstrap";
import img from "../assets/gene.png";

function AlignView() {
    const [dataAlign, setDataAlign] = useState<DataAlign>();

    return (
        <Container fluid className="mt-3">
            <Header title="Alinear" text="subtitle." imageSrc={img} />
            <CardBody>
                <AlignSequences setDataAlign={setDataAlign} />
                {dataAlign ? (
                    <>
                        <PlotAlign data={dataAlign} />
                        <div className="d-flex justify-content-end">
                            <ButtonBadge
                                text="Score"
                                value={dataAlign.score.toString()}
                            />
                        </div>
                    </>
                ) : (
                    ""
                )}
            </CardBody>
        </Container>
    );
}

export default AlignView;
