import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Inquiries from "../pages/Inquiries";
import EditInquiry from "../pages/EditInquiry";
import Content from "../pages/Content";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
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
      {
        path: "content",
        element: <App />,
        children: [{ index: true, element: <Content /> }],
      },
    ],
  },
]);
