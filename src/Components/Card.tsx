import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function Card(props: Props) {
    const { children } = props;

    return (
        <div className="card" >
            <div className="card-body">{children}</div>
        </div>
    );
}

interface CardBodyProps {
    title: string;
    text?: string;
}

export function CardBody(props: CardBodyProps & { imageSrc?: string }) {
    const { title, text, imageSrc } = props;
    return (
        <div className="d-flex align-items-start mb-2">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="icono"
                    className="me-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
            )}
            <div>
                <h5 className="card-title mb-1">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
}


export default Card;
