import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Login, NavigationBar, Register, ScrollToTop } from "../pages";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Category, MyFavourite, SearchContent } from "../pages/UI";

const Routes = () => {
  const { token } = useAuth();
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    // {
    //   path: "/category",
    //   element: <Category />,
    // },
    {
      path: "/category",
      element: <Category />,
    },
    {
      path: "/searchResult",
      element: <SearchContent />,
    },

    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/profile",
          element: <MyFavourite />,
        },
        {
          path: "/logout",
          element: <div>logout</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default Routes;
