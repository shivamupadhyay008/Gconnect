import "./App.css";
import ActivityStatus from "./Components/activity/activityStatus";
import MainCluster from "./Components/maincluster/maincluster";
import RightCluster from "./Components/rightcluster/rightcluster";
import { Login } from "./Components";
import { Counter } from "./features/counter/Counter";
import { ChakraProvider } from "@chakra-ui/react";
export default function App() {
  return (
    <div className="App">
      <ChakraProvider>
        {/* <Login /> */}
        <div className="app-grd">
          {/* <ActivityStatus /> */}
          <div></div>
          <MainCluster />
          <RightCluster />
        </div>
      </ChakraProvider>
    </div>
  );
}
