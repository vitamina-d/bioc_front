import Card, { CardBody } from "./Components/Card";
import List from "./Components/List";
import SelectGenome from "./Components/SelectGenome";

function App() {

    return (
        <Card>
            <CardBody title="Cromosoma" text="Ingrese cromosoma y rango" />
            <List data={["0", "1", "2", "3", "4"]}/>
            <SelectGenome />
        </Card>
    );
}

export default App;
