import { React, Fragment, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { pulicRouter, privateRouters, adminRouters } from "./routes";
import { LayoutClient } from "./layouts";
import useAuth from "@/hooks/useAuth";
import GlobalImageViewer from "./components/GlobalImageViewer";
import NotFound from "./components/errors/404";
import { useSelector } from "react-redux";

const App = () => {
  const auth = useAuth();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
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
  }, []);

  useEffect(() => {
    if(user && Object.keys(user).length > 0){
      setCheckAdmin(user.is_admin);
      if(!user.is_login){
        navigate('/profile-avatar', { replace: true });
      }
    }
  }, [user]);

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
        {adminRouters.map((route) => {
          if (!checkAdmin) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to="/" replace />}
              />
            );
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            >
              {route.children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalImageViewer />
    </>
  );
};

export default App;
