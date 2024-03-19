import { Link, Navigate, useParams } from "react-router-dom";
import { UserState } from "../context/UserContext";
import AccountPageNav from "../components/AccountPageNav";
import axios from "axios";
import { useState } from "react";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  const { ready, user, setUser } = UserState();

  const logout = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      await axios.post("/api/user/logout", {}, config);
      setRedirect("/");
      setUser(null);
    } catch (error) {}
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountPageNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {/* {subpage === "places" && <PlacesPage />} */}
    </div>
  );
}
