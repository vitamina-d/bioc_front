import type { Stat } from "../types/DataBlastx";
import ButtonBadge from "./ButtonBadge";

type Props = {
    data?: Stat;
};

function BlastxStat({ data }: Props) {
    return (
        data && (
            <>
                <div
                    style={{
                        border: "1px solid #ccc",
                    }}
                    className="d-flex justify-content-evenly mt-3"
                >
                    <ButtonBadge
                        text={"db_len"}
                        value={data.db_len.toString()}
                    />
                    <ButtonBadge
                        text={"db_num"}
                        value={data.db_num.toString()}
                    />
                    <ButtonBadge
                        text={"eff_space"}
                        value={data.eff_space.toString()}
                    />
                    <ButtonBadge
                        text={"entropy"}
                        value={data.entropy.toString()}
                    />
                    <ButtonBadge
                        text={"hsp_len"}
                        value={data.hsp_len.toString()}
                    />
                    <ButtonBadge text={"kappa"} value={data.kappa.toString()} />
                    <ButtonBadge
                        text={"lambda"}
                        value={data.lambda.toString()}
                    />
                </div>
            </>
        )
    );
}

export default BlastxStat;
