import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { ProteinRanks } from "../types/ResponseFolding";

type Props = {
    data: ProteinRanks;
    selectRankToCompare: (rank: string) => void;
};

function TableRanks({ data, selectRankToCompare }: Props) {
    //const data = { "1": 7.8, "2": 4.97, "3": 4.71, "4": 5.85, "5": 6.44 };
    var min: number = 100;
    const ranks = Object.entries(data).map(([key, value]) => {
        if (value < min) {
            min = value;
        }
        return { key: key, value: value };
    });
    console.log(ranks);

    return (
        <div className="d-flex justify-content-between me-3">
            {ranks.map((r) => (
                <OverlayTrigger
                    key={r.key}
                    overlay={<Tooltip>{"compare"}</Tooltip>}
                >
                    <span className="d-inline-block">
                        <Button
                            onClick={() => selectRankToCompare(r.key)}
                            variant={r.value === min ? "primary" : "secondary"}
                            className="align-items-center font-monospace"
                            size="sm"
                        >
                            <div className="d-flex align-items-center">
                                Rank_{r.key}
                                <Badge bg="dark" className="ms-2">
                                    {r.value}%
                                </Badge>
                            </div>
                        </Button>
                    </span>
                </OverlayTrigger>
            ))}
        </div>
    );
}

export default TableRanks;
