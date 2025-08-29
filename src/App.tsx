import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navigation from "./Components/Navigation";
import HomeView from "./views/HomeView";
import SearchView from "./views/SearchView";
import AlignView from "./views/AlignView";
import UploadView from "./views/UploadView";
import ProteinView from "./views/ProteinView";
import AboutView from "./views/AboutView";
import ComplementView from "./views/ComplementView";
import type { DataDetail } from "./types/ResponsePlumber";

function App() {
    const [search, setSearch] = useState<string>("");
    const [detail, setDetail] = useState<DataDetail | null>(null); //{ entrez: "0", genename: "", genetype: "", symbol: "", alias: []} );

    return (
        <BrowserRouter>
            <Navigation search={search} setSearch={setSearch} setDetail={setDetail}/>
            <Routes>
                <Route path="/home" element={<HomeView detail={detail} />} />
                <Route path="/range" element={<SearchView />} />
                <Route path="/align" element={<AlignView />} />
                <Route path="/upload" element={<UploadView />} />
                <Route path="/protein" element={<ProteinView />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="/complement" element={<ComplementView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
