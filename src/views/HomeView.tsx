import { useState } from "react";
import { Card } from "react-bootstrap";
import type { ResponsePublicSummary } from "../types/ResponsePublicSummary";
import {
    GetFullDetail,
} from "../services/PlumberServices";
import { SummaryService } from "../services/PublicServices";
import SequenceViewer from "../Components/SequenceViewer";
import Header from "../Components/Header";
import PercentAccordion from "../Components/PercentAccordion";
import type {
    DataDetail,
    DataFullDetail,
    DataPercent,
    DataSequence,
    ResponsePlumber,
} from "../types/ResponsePlumber";
import InfoDetail from "../Components/InfoDetail";
import ModalFullDetail from "../Components/ModalFullDetail";

interface HomeProps {
    detail: DataDetail | null;
}

function HomeView({ detail }: HomeProps) {    
    const [publicData, setPublicData] = useState<ResponsePublicSummary>();
    const [fullDetail, setFullDetail] = useState<DataFullDetail>();

    const [sequence, setSequence] = useState<DataSequence | null>(null);
    const [percent, setPercent] = useState<DataPercent| null>(null);

    const [modalShow, setModalShow] = useState(false);
    
    if (!detail) return <Card className="p-3 my-3 ">No hay detalle para mostrar</Card>;
    const entrez = detail.entrez;

    //click en Searcher
    const searchFullDetail = async () => {
        setFullDetail(undefined);
        setPublicData(undefined);
        try {
            const publicRes: ResponsePublicSummary = await SummaryService(
                entrez
            );
            console.log(publicRes);
            setPublicData(publicRes);
            const plumberRes: ResponsePlumber<DataFullDetail> =
                await GetFullDetail(entrez);
            console.log(plumberRes.data);
            setFullDetail(plumberRes.data);
            setModalShow(true);
        } catch (err) {
            console.error(err);
        } finally {
            console.error("FINALLY");
        }
    };


    return (
        <Card className="p-3 my-3 ">
            <Header title="Gene" imageSrc="../../public/gene.png" />
            <Card.Body>
                <InfoDetail data={detail} getFull={searchFullDetail} setSequence={setSequence} setPercent={setPercent}  />
                

                {sequence || percent ? ( //scrollIntoView
                    <Card className="shadow  my-3">
                        <Card.Body>
                            <Header
                                title="Sequence"
                                imageSrc={"/public/seq.png"}
                            />
                            {sequence ? <SequenceViewer data={sequence} /> : ""}
                            {percent ? <PercentAccordion data={percent} /> : ""}
                        </Card.Body>
                    </Card>
                ) : (
                    ""
                )}
            </Card.Body>
            <ModalFullDetail
                modalShow={modalShow}
                setModalShow={setModalShow}
                dataPlumber={fullDetail}
                dataPublic={publicData}
            />
        </Card>
    );
}

export default HomeView;
