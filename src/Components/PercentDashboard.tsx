type Props = {
    sequence: string;
};

function PercentDashboard({ sequence }: Props) {
    return <div className="rounded my-3">{sequence && <h1>PERCENT</h1>}</div>;
}

export default PercentDashboard;
