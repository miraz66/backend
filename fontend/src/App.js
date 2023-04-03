import Header from "./Components/Header";
import AllEmployes from "./pages/AllEmployes";
import About from "./pages/About";
import Customers from "./pages/Customers";
import Project from "./pages/Project";
import Dictionary from "./pages/Dictionary";
import Definition from "./Components/Definition";
import NotFound from "./Components/NotFound";
import Customer from "./pages/Customer";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<AllEmployes />} />
          <Route path="/about" element={<About />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<Customer />} />

          <Route path="/projects" element={<Project />} />

          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/dictionary/:search" element={<Definition />} />
          
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
