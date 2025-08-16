import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Navigation from "./Components/Navigation";
import Header from "./Components/Header";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/about" element={<Header
                    title="Consulta Genomica"
                    text="Ingrese la fuente, cromosoma y rango para consultar la secuencia."
                    imageSrc="../../public/gene.png"
                />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
