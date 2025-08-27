import type { DataPlumberAlign } from "../types/ResponsePlumberAlign";
import ButtonBadge from "./ButtonBadge";

interface Props {
    data: DataPlumberAlign;
}

function InfoAlign({ data }: Props) {
    return (
        <div className="d-flex justify-content-end">
            <ButtonBadge text="Score" value={data.score.toString()} />
            <ButtonBadge text="GapOpening" value={data.gapOpening.toString()} />
            <ButtonBadge
                text="GapExtension"
                value={data.gapExtension.toString()}
            />
            <ButtonBadge text="Type" value={data.type} />
        </div>
    );
}

export default InfoAlign;
