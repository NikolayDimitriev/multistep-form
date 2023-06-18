import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/main";
import CreatePage from "./pages/create";

import { ROUTES } from "./routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.CREATE} element={<CreatePage />} />
          <Route path="*" element={<Navigate to={ROUTES.MAIN} replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
