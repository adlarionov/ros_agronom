import { useEffect } from "react";
import useMediaSize from "../../shared/hooks/useMediaSize";
import DesktopRootLayout from "./DesktopRootLayout";
import MobileRootLayout from "./MobileRootLayout";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const mediaSize = useMediaSize();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/promenade_agrohack/dashboard");
  }, [navigate]);

  return (
    <>
      <>{mediaSize.isMobile ? <MobileRootLayout /> : <DesktopRootLayout />}</>
    </>
  );
}
