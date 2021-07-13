import "./App.css";
import { Provider, useDispatch } from "react-redux";
import { userLogin } from "./Components/login/user.slice";
import { store } from "./app/store";
import ActivityStatus from "./Components/activity/activityStatus";
import MainCluster from "./Components/maincluster/maincluster";
import RightCluster from "./Components/rightcluster/rightcluster";
import { Login } from "./Components";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  const token = localStorage.getItem("G_CONNECT_TOKEN");
  const dispatch = useDispatch();
  console.log(token);
  if (token !== "undefined") {
    dispatch(userLogin({ token }));
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <ChakraProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
            <div className="app-grd">
              <div></div>
              {/* <div className="chl-fs">
                <ActivityStatus />
              </div> */}
              <div className="chl-snd">
                <MainCluster />
              </div>
              <div className="chl-thr">
                <RightCluster />
              </div>
            </div>
          </ChakraProvider>
        </Router>
      </div>
    </Provider>
  );
}
