import { FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "../../pages/About/About";
import Steps from "../../pages/Steps/Steps";
import Step from "../../pages/Steps/Step/Step";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "step",
        element: <Steps />,
        children: [
          {
            path: ":step",
            element: <Step />,
          },
        ],
      },
    ],
  },
]);

const Routes: FC = () => <RouterProvider router={routes} />;

export default Routes;
