import { Card, CardFooter } from "react-bootstrap";
import ModalBasic from "./ModalBasic";
import type React from "react";
import BlastxTable from "./BlastxTable";
import type { BlastxReport, Hit } from "../types/DataBlastx";
import BlastxStat from "./BlastxStat";

type Props = {
    blastx: BlastxReport | null;
    setHit: React.Dispatch<React.SetStateAction<Hit | null>>;
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalHits({ blastx, setHit, modalShow, setModalShow}: Props) {
    return (
        <ModalBasic
            modalShow={modalShow}
            setModalShow={setModalShow}
            size={"xl"}
            title={"Result blastx"}
        >
            <Card.Body>
                {blastx && (
                    <BlastxTable
                        hits={blastx?.results.search.hits}
                        setHit={setHit}
                    />
                )}
            </Card.Body>
            <CardFooter>
                {blastx?.results.search.stat && (
                    <BlastxStat data={blastx?.results.search.stat} />
                )}
            </CardFooter>
        </ModalBasic>
    );
}

export default ModalHits;
