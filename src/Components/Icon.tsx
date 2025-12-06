import { iconPaths, type TypesIcon } from "../constant/iconPaths";

type IconProps = {
    type: TypesIcon;
};

export function Icon({ type }: IconProps) {
    const paths = iconPaths[type];

    return (
        <svg width="16" height="16" fill="currentColor">
            {paths.map((d, i) => (
                <path key={i} d={d} />
            ))}
        </svg>
    );
}
