import { useState, SyntheticEvent } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";

import styled from "@mui/material/styles/styled";
import { useLocation, useNavigate } from "react-router-dom";
import getPath from "../../../shared/hooks/getPath";
import EmployeeIcon from "../../../shared/components/Icons/EmployeeIcon";
import DashboardIcon from "../../../shared/components/Icons/DashboardIcon";

const StyledBottomNavigation = styled(BottomNavigation)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "1.5rem 0",
  height: "4.5rem",
  zIndex: 2,
});

const BottomBar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [bottomNavigationValue, setBottomNavigationValue] = useState<string>(
    getPath(currentLocation.pathname)
  );

  const handleBottomNavigationChange = (
    _: SyntheticEvent,
    newValue: string
  ) => {
    setBottomNavigationValue(newValue);
    navigate(newValue);
  };

  return (
    <>
      <StyledBottomNavigation
        showLabels
        value={bottomNavigationValue}
        onChange={handleBottomNavigationChange}
      >
        <BottomNavigationAction
          label="Дашборд"
          value="dashboard"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="Задачи"
          value="tasks"
          icon={<FormatListNumberedRoundedIcon />}
        />
        <BottomNavigationAction
          label="Сотрудники"
          value="employees"
          icon={<EmployeeIcon />}
        />
      </StyledBottomNavigation>
    </>
  );
};

export default BottomBar;
