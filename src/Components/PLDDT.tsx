type Props = {
    text: string;
    color: string;
};

function PLDDT({ text, color }: Props) {
    return (
        <div className="d-flex align-items-center gap-2">
            <div
                style={{
                    width: 14,
                    height: 14,
                    backgroundColor: color,
                    borderRadius: 3,
                }}
            />
            <span className="font-monospace small">{text}</span>
        </div>
    );
}

export default PLDDT;
