import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <main>
      <div className="flex flex-col items-center justify-center p-2">
        <div className="flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-950 p-2">
          <Tabs
            tabs={["DDA", "Bressenham"]}
            selectedTab={
              location.pathname.includes("bressenham") ? "Bressenham" : "DDA"
            }
            onChange={(tab) => navigate(`/${tab.toLowerCase()}`)}
          />
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
