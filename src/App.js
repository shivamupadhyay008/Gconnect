import React from "react";
import ActivityStatus from "./Components/activity/activityStatus"
import MainCluster from "./Components/maincluster/maincluster";
import RightCluster from "./Components/rightcluster/rightcluster";
import { Counter } from "./features/counter/Counter";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <ActivityStatus/>
      <MainCluster/>
      <RightCluster/>
    </div>
  );
}
