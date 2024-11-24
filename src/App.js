import { React, Fragment, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { pulicRouter, privateRouters, adminRouters } from "./routes";
import { LayoutAdmin, LayoutClient } from "./layouts";
import useAuth from "@/hooks/useAuth";
import GlobalImageViewer from "./components/GlobalImageViewer";

const App = () => {
  const auth = useAuth();
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await auth.checkLogin();
      setCheckLogin(isLoggedIn);
      setIsReady(true);
    };
    checkLoginStatus();
  }, [auth]);

  if (!isReady) return null;
  
  return (
    <>
      <Routes>
        {pulicRouter.map((route, index) => {
          const Page = route.component;

          return <Route key={index} path={route.path} element={<Page />} />;
        })}
        {privateRouters.map((route, index) => {
          if (!checkLogin) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/login" replace />}
              />
            );
          } else {
            let Layout = LayoutClient;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          }
        })}
        {adminRouters.map((route, index) => {
          if (!checkAdmin) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/" replace />}
              />
            );
          } else {
            let Layout = LayoutAdmin;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          }
        })}
      </Routes>
      <GlobalImageViewer />
    </>
  );
};

export default App;
