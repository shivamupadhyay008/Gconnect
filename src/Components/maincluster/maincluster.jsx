import {
  Navbar,
  Followpage,
  Feed,
  ProfilePage,
  Explore,
  Search
} from "../index";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export function PrivateRoute({ isUserLoggedIn, path, ...props }) {
  return isUserLoggedIn ? (
    <Route {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}

export default function MainCluster() {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div>
      <Navbar />
      <Routes>
        <PrivateRoute
          isUserLoggedIn={userData.isUserLoggedIn}
          path="/"
          element={<Feed />}
        />
        <PrivateRoute
          isUserLoggedIn={userData.isUserLoggedIn}
          path="/connection"
          element={<Followpage />}
        />
        <PrivateRoute
          isUserLoggedIn={userData.isUserLoggedIn}
          path="/user/:username"
          element={<ProfilePage />}
        />
        <PrivateRoute
          isUserLoggedIn={userData.isUserLoggedIn}
          path="/explore"
          element={<Explore />}
        />
        <PrivateRoute
          isUserLoggedIn={userData.isUserLoggedIn}
          path="/search"
          element={<Search />}
        />
      </Routes>
    </div>
  );
}
