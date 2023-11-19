// @ts-nocheck
import Box from "@mui/material/Box";
import { Button, Stack, Typography, styled } from "@mui/material";
import { DashboardCard } from "../../shared/components/DashboardCard";
import { ITaskStatus } from "../../shared/interfaces/ITask";
import getTime from "../../shared/hooks/getTime";
import { theme } from "../../app/providers/ThemeProvider/theme";
import { typographyDesktop } from "../../shared/config/typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";

const StyledTypography = styled(Typography)({
  ...typographyDesktop.h1,
  marginTop: "1rem",
});

const DashboardContent = styled(Box)({
  marginTop: "2.5rem",
});

export default function MobileDashboard() {
  const navigate = useNavigate();
  const taskStatus: { data: ITaskStatus } = {
    data: {
      finished: 1,
      not_finished: 2,
      planned: 3,
    },
  }; // FIXME: mocked fake data
  const data = [
    {
      label: "Выезд на точку",
      value: 12,
      color: "#8EEE2E",
    },
    { label: "Обучение агентов", value: 16, color: "#003790" },
    { label: "Доставка карт", value: 13, color: "#FC5055" },
  ];

  const today = getTime();

  const handleAddTask = () => {
    navigate("/promenade_agrohack/objectives?create=true");
  };

  return (
    <Box marginBottom={"6rem"}>
      <Stack
        flexDirection={"row"}
        alignItems={"end"}
        justifyContent={"space-between"}
        width={"95%"}
        margin={"0 auto"}
      >
        <StyledTypography>Дашборд</StyledTypography>
        <Button
          onClick={handleAddTask}
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: "10rem",
            ":hover": {
              background: theme.palette.primary.dark,
            },
          }}
        >
          <AddRoundedIcon htmlColor="white" />
        </Button>
      </Stack>
      <DashboardContent>
        <Stack gap={"1rem"} margin={"0 auto"} maxWidth={"95%"}>
          <DashboardCard
            title="Задач запланировано"
            count={taskStatus.data ? taskStatus.data.planned : 0}
            date={today}
          />
          <DashboardCard
            title="Задачи выполнено"
            count={taskStatus.data ? taskStatus.data.finished : 0}
            date={today}
            color={theme.palette.primary.main}
          />
          <DashboardCard
            title="Задач не выполнено"
            count={taskStatus.data ? taskStatus.data.not_finished : 0}
            date={today}
            color="#CD3636"
          />
        </Stack>
        <Stack marginTop={"2rem"} gap={"1rem"}>
          <StyledTypography margin={"0 auto"}>Графики</StyledTypography>
          <Box bgcolor={"white"} borderRadius={"2rem"}>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["1", "2", "3", "4", "5", "6"],
                  label: "Сотрудник",
                  categoryGapRatio: 0.5,
                  barGapRatio: 0.1,
                  tickLabelStyle: {
                    fontSize: 10,
                    color: theme.palette.common.black,
                  },
                  borderRadius: "4px",
                },
              ]}
              series={[
                {
                  data: [100, 90, 125, 125, 125, 125],
                  color: theme.palette.primary.main,
                  label: "KPI",
                },
              ]}
              height={300}
            />
          </Box>
          <Box bgcolor={"white"} borderRadius={"2rem"}>
            <Typography marginTop={"0.5rem"} textAlign={"center"}>
              Количество задач за месяц
            </Typography>
            <BarChart
              dataset={data}
              xAxis={[
                {
                  dataKey: "label",
                  scaleType: "band",
                  categoryGapRatio: 0.5,
                  barGapRatio: 0.1,
                  tickLabelStyle: {
                    fontSize: 10,
                    color: theme.palette.common.black,
                  },
                  borderRadius: "4px",
                },
              ]}
              series={[
                {
                  dataKey: "value",
                  color: theme.palette.primary.light,
                },
              ]}
              height={300}
            />
          </Box>
        </Stack>
      </DashboardContent>
    </Box>
  );
}
