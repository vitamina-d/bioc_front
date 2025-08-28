import type { DataAlign } from "../types/ResponsePlumber";
import ButtonBadge from "./ButtonBadge";

interface Props {
    data: DataAlign;
}

function InfoAlign({ data }: Props) {
    return (
        <div className="d-flex justify-content-end">
            <ButtonBadge text="Score" value={data.score.toString()} />
        </div>
    );
}

export default InfoAlign;
