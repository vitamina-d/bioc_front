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
                <Route path="/search" element={<Header
                    title="Buscar Gen"
                    text="subtitle."
                    imageSrc="../../public/gene.png"
                />} />
                <Route path="/sequence" element={<Header
                    title="Obtener secuencia"
                    text="subtitle."
                    imageSrc="../../public/gene.png"
                />} />
                <Route path="/align" element={<Header
                    title="Alinear"
                    text="subtitle."
                    imageSrc="../../public/gene.png"
                />} />
                <Route path="/upload" element={<Header
                    title="Subir FASTA"
                    text="subtitle."
                    imageSrc="../../public/gene.png"
                />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
