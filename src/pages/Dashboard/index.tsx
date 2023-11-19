import useMediaSize from "../../shared/hooks/useMediaSize";
import DesktopDashboard from "./DesktopDashboard";
import MobileDashboard from "./MobileDashboard";

export default function Dashboard() {
  const { isMobile } = useMediaSize();

  return <>{isMobile ? <MobileDashboard /> : <DesktopDashboard />}</>;
}
