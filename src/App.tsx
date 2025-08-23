import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import SearchView from "./views/SearchView";
import AboutView from "./views/AboutView";
import HomeView from "./views/HomeView";
import AlignView from "./views/AlignView";
import UploadView from "./views/UploadView";
import DetailView from "./views/DetailView";
import ProteinView from "./views/ProteinView";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/home" element={<HomeView />} />
                <Route path="/detail" element={<DetailView />} />
                <Route path="/search" element={<SearchView />} />
                <Route path="/align" element={<AlignView />} />
                <Route path="/upload" element={<UploadView />} />
                <Route path="/protein" element={<ProteinView />} />
                <Route path="/about" element={<AboutView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
