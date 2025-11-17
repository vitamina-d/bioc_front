import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavComponent from "./Components/NavComponent";
import DetailView from "./views/DetailView";
import AlignView from "./views/AlignView";
import AboutView from "./views/AboutView";
import SearchView from "./views/SearchView";
import BlastxView from "./views/BlastxView";
import ProteinView from "./views/ProteinView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";
import { ToastProvider } from "./context/ToastContext";
import { SpinnerProvider } from "./context/SpinnerContext";
import Footer from "./Components/Footer";

function App() {
    return (
        <BrowserRouter>
            <NavComponent />
            <ToastProvider>
                <SpinnerProvider>
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route
                            path="/detail/:entrezId"
                            element={<DetailView />}
                        />
                        <Route path="/search" element={<SearchView />} />
                        <Route path="/align" element={<AlignView />} />
                        <Route path="/blastx" element={<BlastxView />} />
                        <Route path="/protein" element={<ProteinView />} />
                        <Route path="/about" element={<AboutView />} />
                        <Route path="/404" element={<NotFoundView />} />
                    </Routes>
               {/* <Footer />*/}
                </SpinnerProvider>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;
