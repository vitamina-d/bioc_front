
interface HeaderProps {
    title: string;
    text?: string;
}

function Header(props: HeaderProps & { imageSrc?: string }) {
    const { title, text, imageSrc } = props;
    return (
        <div className="d-flex align-items-start mb-2 p-3">
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


export default Header;