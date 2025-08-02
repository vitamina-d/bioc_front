import Card, { CardBody } from "./Components/Card";
import List from "./Components/List";
import SelectGenome from "./Components/SelectGenome";
import SequenceViewer from "./Components/SequenceViewer";

function App() {
    const handleSelect = (element: string) => {
        console.log("imprimiendo: ", element);
    };
    return (
        <>
            <Card>
                <SelectGenome />
            </Card>
            <Card>
                <CardBody title="Secuencia" text="" />
                <SequenceViewer sequence="GAGGCAGAGGTCAAAGTGAGCCAAGATCATACCATTGCACTCCAGCCTGGGCAACAAGAGCAAAACTCCATCTTAAAAAAATATATATATATACATATACATACATATATATACACATATATATACATATATACAGATATTATATATGTAAATGTATATATATGTGTATATATATACACATATATATACATATTATAACTA" />
            </Card>
            <Card>
                <CardBody title="Lista" text="lista" />
                <List
                    onSelect={handleSelect}
                    data={["0", "1", "2", "3", "4"]}
                />
            </Card>
        </>
    );
}

export default App;
