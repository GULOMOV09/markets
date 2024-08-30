import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Productid from "./Components/Productid";
import Basket from "./Components/Basket";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="/" element={<HomeLayout />} />
                        <Route path="/Basket" element={<Basket />} />
                        <Route path="/:productid" element={<Productid />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
