const nucleotideColors: Record<string, string> = {
  A: "text-primary",
  C: "text-danger",
  G: "text-success",
  T: "text-warning",
};

type Props = {
    sequence: string;
};

function SequenceViewer({ sequence }: Props) {
  return (
    <div className="p-3 bg-light rounded border">
      {sequence.split("").map((nuc: string, index: number) => (
        <span
          key={index}
          className={`fw-bold ${nucleotideColors[nuc] || "text-secondary"} mx-1`}
        >
          {nuc}
        </span>
      ))}
    </div>
  );
}

export default SequenceViewer;
