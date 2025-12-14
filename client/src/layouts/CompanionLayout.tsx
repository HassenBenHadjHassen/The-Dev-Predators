import { Outlet } from "react-router-dom";
import CompanionAvatar from "../components/Companion/CompanionAvatar";

export default function CompanionLayout() {
  return (
    <div className="relative min-h-screen">
      <Outlet />
      <CompanionAvatar />
    </div>
  );
}
