import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/Index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>,
);
