import { Box, Button, Chip, Typography, styled } from "@mui/material";
import { typographyDesktop } from "../../config/typography";
import { useState } from "react";
import BadgeStyled from "../BadgeStyled";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { theme } from "../../../app/providers/ThemeProvider/theme";
import React from "react";
import IWorker from "../../interfaces/IWorker";
import WorkersService from "../../services/workersService";

const TypographyCaption = styled(Typography)({
  ...typographyDesktop.caption,
  color: "#616161",
});

const StyledButton = styled(Button)({
  background: "none",
  padding: "0",
  width: "fit-content",
  height: "fit-content",
});

export default function TableEmployees({
  columns,
  additionalEmployees,
  onEdit,
}: {
  columns: string[];
  additionalEmployees: IWorker[];
  onEdit: (value: string) => void;
}) {
  const [employeesList, setEmployeesList] =
    useState<IWorker[]>(additionalEmployees);

  const deleteRow = async (employeeId: number) => {
    await WorkersService.deleteById(employeeId);
  };

  const handleDeleteRow = (employeeId: number) => {
    deleteRow(employeeId);
    const employees = employeesList.filter((employee) => {
      return employee.id !== employeeId;
    });
    setEmployeesList(employees);
  };

  const handleEditEmployee = (employeeId: number) => {
    onEdit(`?editEmployee=${employeeId}`);
  };

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={`
    0.25fr
    1fr
    1fr
    0.25fr
    0.25fr
  `}
      bgcolor={"#FFF"}
      paddingX={"1.5rem"}
      paddingY={"1.25rem"}
      borderRadius={"0.625rem"}
      gap="1.5rem"
    >
      {columns.map((column) => (
        <TypographyCaption key={column}>{column}</TypographyCaption>
      ))}
      {employeesList
        .sort((a, b) => a.id - b.id)
        .map((employee) => (
          <React.Fragment key={employee.id}>
            <Typography>{employee.id}</Typography>
            <Typography>{employee.name}</Typography>
            <Box display={"flex"} gap={"0.25rem"}>
              {employee.speciality.map((spec) => (
                <Chip key={Math.random()} label={spec} />
              ))}
            </Box>
            <Box>
              <BadgeStyled
                status={
                  employee.kpi <= 50
                    ? "danger"
                    : employee.kpi <= 75
                    ? "warning"
                    : "success"
                }
                badgeContent={`${employee.kpi}%`}
                isIcon={false}
              />
            </Box>
            <Box display="flex">
              <StyledButton
                style={{ color: theme.palette.error.main }}
                onClick={() => handleDeleteRow(employee.id)}
              >
                <DeleteOutlinedIcon />
              </StyledButton>
              <StyledButton
                onClick={() => handleEditEmployee(employee.id)}
                style={{ color: "#3657CD" }}
              >
                <EditOutlinedIcon />
              </StyledButton>
            </Box>
          </React.Fragment>
        ))}
    </Box>
  );
}
