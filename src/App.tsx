import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import authRoutes from "./routes/DashboardRoutes";

function App() {
  return (
    <main className="App">
      <Toaster position="top-center" />

      <Routes>
        {authRoutes.map((route, idx: number) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </main>
  );
}

export default App;
