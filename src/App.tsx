import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import FormLayout from "./layout/FormLayout";
import Info from "./pages/Info";
import Address from "./pages/Address";
import Employment from "./pages/Employment";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import AdditionalInfo from "./pages/AdditionalInfo";
import Review from "./pages/Review";

const App = () => {
  return (
    <BrowserRouter>
      {/* Your application routes */}
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/formlayout" element={<FormLayout/>}>
          <Route path="/formlayout/info" element={<Info/>}/>
          <Route path="/formlayout/address" element={<Address/>}/>
          <Route path="/formlayout/employment" element={<Employment/>}/>
          <Route path="/formlayout/education" element={<Education/>}/>
          <Route path="/formlayout/skills" element={<Skills/>}/>
          <Route path="/formlayout/addinfo" element={<AdditionalInfo/>}/>
          <Route path="/formlayout/review" element={<Review/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;