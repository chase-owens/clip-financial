import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Inquiries from "../pages/Inquiries";
import EditInquiry from "../pages/EditInquiry";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: "inquiries",
    element: <App />,
    children: [{ index: true, element: <Inquiries /> }],
  },
  {
    path: "inquiries/:inquiryId",
    element: <App />,
    children: [{ index: true, element: <EditInquiry /> }],
  },
]);
