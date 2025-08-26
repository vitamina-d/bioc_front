import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navigation from "./Components/Navigation";
import HomeView from "./views/HomeView";
import SearchView from "./views/SearchView";
import AlignView from "./views/AlignView";
import UploadView from "./views/UploadView";
import ProteinView from "./views/ProteinView";
import AboutView from "./views/AboutView";

function App() {
    const [search, setSearch] = useState<string>("");

    return (
        <BrowserRouter>
            <Navigation search={search} setSearch={setSearch}/>
            <Routes>
                <Route path="/home" element={<HomeView />} />
                <Route path="/range" element={<SearchView />} />
                <Route path="/align" element={<AlignView />} />
                <Route path="/upload" element={<UploadView />} />
                <Route path="/protein" element={<ProteinView />} />
                <Route path="/about" element={<AboutView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
