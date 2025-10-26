import {
    Badge,
    Button,
    OverlayTrigger,
    Tooltip,
    type ButtonProps,
} from "react-bootstrap";
import { Icon } from "./Icon";
import type { TypesIcon } from "../config/iconPaths";

type Props = {
    textHover: string;
    sequence?: string;
    typeIcon: TypesIcon;
} & ButtonProps;
//className="d-flex justify-content-end ms-2"
function ButtonOverlay({ textHover, sequence, typeIcon, ...prop }: Props) {
    return (
        <div>
            <OverlayTrigger overlay={<Tooltip>{textHover}</Tooltip>}>
                <span className="d-inline-block">
                    <Button className="align-items-center" {...prop}>
                        <div className="d-flex align-items-start">
                            <Badge bg="secondary" className="me-2">
                                {sequence && sequence.length}
                            </Badge>
                            <Icon type={typeIcon} />
                        </div>
                    </Button>
                </span>
            </OverlayTrigger>
        </div>
    );
}

export default ButtonOverlay;
