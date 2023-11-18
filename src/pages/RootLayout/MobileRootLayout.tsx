import CircularProgress from "@mui/material/CircularProgress";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import BottomBar from "./components/BottomBar";

export default function MobileRootLayout() {
  return (
    <>
      <>
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
        <BottomBar />
      </>
    </>
  );
}
