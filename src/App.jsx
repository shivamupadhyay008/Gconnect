import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { userLogin, tokenHandler } from "./Components/login/user.slice";
import { store } from "./app/store";
import MainCluster from "./Components/maincluster/maincluster";
import RightCluster from "./Components/rightcluster/rightcluster";
import { Login, SideNav } from "./Components";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
export default function App() {
  const token = localStorage.getItem("G_CONNECT_TOKEN");
  const dispatch = useDispatch();
  if (token) {
    dispatch(tokenHandler());
    dispatch(userLogin({ token }));
  }
  return (
    <Provider store={store}>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <div className="app-grd">
            <div className="chl-fs">
              <SideNav />
            </div>
            <div className="chl-snd">
              <MainCluster />
            </div>
            <div className="chl-thr">
              <RightCluster />
            </div>
          </div>
        </div>
      </ChakraProvider>
    </Provider>
  );
}
