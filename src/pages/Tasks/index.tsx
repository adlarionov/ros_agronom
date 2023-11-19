import useMediaSize from "../../shared/hooks/useMediaSize";
import DesktopTasks from "./DesktopTasks";
import MobileTasks from "./MobileTasks";

export default function Tasks() {
  const { isMobile } = useMediaSize();

  return <>{isMobile ? <MobileTasks /> : <DesktopTasks />}</>;
}
