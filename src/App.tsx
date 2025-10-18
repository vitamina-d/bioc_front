import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import NavComponent from "./Components/NavComponent";
import DetailView from "./views/DetailView";
import AlignView from "./views/AlignView";
import AboutView from "./views/AboutView";
import SearchView from "./views/SearchView";
import type { DataDetail } from "./types/DataPlumber";
import BlastxView from "./views/BlastxView";
import ProteinView from "./views/ProteinView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";

function App() {
    const [detail, setDetail] = useState<DataDetail | null>(null); 

    return (
        <BrowserRouter>
            <NavComponent/>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/detail/:entrezId" element={<DetailView />} />
                <Route
                    path="/search"
                    element={
                        <SearchView detail={detail} setDetail={setDetail}  />
                    }
                />
                <Route path="/align" element={<AlignView />} />
                <Route path="/blastx" element={<BlastxView />} />
                <Route path="/protein" element={<ProteinView />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="/404" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
