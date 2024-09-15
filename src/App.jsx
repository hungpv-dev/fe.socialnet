import { React, Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { pulicRouter, privateRouters, adminRouters } from "./routes";
import { LayoutAdmin, LayoutClient } from "./layouts";
// import { useState, useEffect } from "react";

const App = () => {
  // const [checkLogin, setCheckLogin] = useState(false);
  const checkAdmin = true;
  const checkLogin = true;
  
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setCheckLogin(!!token);
  // }, []);

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
    </>
  );
};

export default App;
