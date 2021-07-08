import "./App.css";
import ActivityStatus from "./Components/activity/activityStatus";
import MainCluster from "./Components/maincluster/maincluster";
import RightCluster from "./Components/rightcluster/rightcluster";
import { Login } from "./Components";
import { Counter } from "./features/counter/Counter";
import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
export default function App() {
  return (
    <div className="App">
      <Router>
        <ChakraProvider>
          <Routes>
            <Route path="/login" element={<Login />}/>
          </Routes>
          {/*  */}
          <div className="app-grd">
            {/* <ActivityStatus /> */}
            <div></div>
            <MainCluster />
            <RightCluster />
          </div>
        </ChakraProvider>
      </Router>
    </div>
  );
}
