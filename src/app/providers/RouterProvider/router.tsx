import { createBrowserRouter } from "react-router-dom";
import { EErrorTexts } from "../../../shared/enums/EErrorTexts.tsx";

import LoginPage from "../../../pages/Login/index.tsx";
import RootLayout from "../../../pages/RootLayout/index.tsx";
import Error from "../../../pages/Error/index.tsx";
import DashboardPage from "../../../pages/Dashboard/index.tsx";
import ManagerTaskPage from "../../../pages/Tasks/index.tsx";
import EmployeePage from "../../../pages/EmployeePage/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/promenade_agrohack/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/promenade_agrohack/objectives",
        element: <ManagerTaskPage />,
      },
      {
        path: "/promenade_agrohack/employees",
        element: <EmployeePage />,
      },
    ],
    errorElement: <Error errorReason={EErrorTexts.Error404} />,
  },
  { path: "*", element: <Error errorReason={EErrorTexts.Error404} /> },
]);
