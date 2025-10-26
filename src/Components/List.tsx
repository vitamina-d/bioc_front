import { useState } from "react";

type Props = {
    data: string[];
    onSelect?: (element: string) => void;
};

function List({ data, onSelect }: Props) {
    onSelect = (element: string) => {
        console.log("imprimiendo: ", element);
    };
    data = ["0", "1", "2", "3", "4"];

    const [index, setIndex] = useState(1);

    const handleClick = (i: number, element: string) => {
        setIndex(i);
        onSelect?.(element); //si existe la ejecuta
    };
    return (
        <ul className="list-group">
            {data.map((elem, i) => (
                <li
                    onClick={() => handleClick(i, elem)}
                    key={elem}
                    className={`list-group-item ${index == i && "active"}`}
                >
                    {elem}
                </li>
            ))}
        </ul>
    );
}

export default List;
