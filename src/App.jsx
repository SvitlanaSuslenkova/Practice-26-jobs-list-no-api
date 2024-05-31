import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChallengeBy from "./components/ChallengeBy";
import JobsPage from "./pages/JobsPage";
import Error from "./components/Error/Error";

import "./reset.css";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="main-div">
          <Routes>
            <Route index element={<JobsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ChallengeBy />
      <Error />
    </>
  );
}

export default App;
