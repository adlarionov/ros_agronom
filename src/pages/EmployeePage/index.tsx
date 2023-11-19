import useMediaSize from "../../shared/hooks/useMediaSize";
import DesktopEmployeePage from "./DesktopEmployeePage";
import MobileEmployeePage from "./MobileEmployeePage";

export default function EmployeePage() {
  const { isMobile } = useMediaSize();

  return <>{isMobile ? <MobileEmployeePage /> : <DesktopEmployeePage />}</>;
}
