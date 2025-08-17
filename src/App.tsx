import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Search from "./views/Search";
import Home from "./views/Home";
import Sequence from "./views/Sequence";
import Align from "./views/Align";
import Upload from "./views/Upload";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/sequence" element={<Sequence />} />
                <Route path="/align" element={<Align />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
