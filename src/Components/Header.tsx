import { CardImg } from "react-bootstrap";

type Props = {
    title: string;
    text?: string;
}

function Header({ title, text, imageSrc }: Props & { imageSrc?: string }) {
    return (
        <div className="d-flex align-items-center p-3">
            {imageSrc && (
                <CardImg
                    src={imageSrc}
                    alt="icono"
                    className="me-2 rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
            )}
            <div>
                <h5 className="card-title mb-1">{title}</h5>
                <p className="card-text text-muted ">{text}</p>
            </div>
        </div>
    );
}


export default Header;