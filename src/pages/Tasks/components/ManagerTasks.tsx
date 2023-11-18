import { Box, Typography } from "@mui/material";
import { Tabs } from "@mui/base/Tabs";
import { Tab } from "@mui/base/Tab";
import { TabsList } from "@mui/base/TabsList";
import Button from "@mui/material/Button";
import { typographyDesktop } from "../../../shared/config/typography";
import { styled } from "@mui/material";
import { useState } from "react";
import { theme } from "../../../app/providers/ThemeProvider/theme";
import TaskTab from "./TaskTab";
import BadgeStyled from "../../../shared/components/BadgeStyled";
import ManagerTaskCard from "./ManagerTaskCard";
import { tasks } from "../../../shared/tasksDummy";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { DashboardCard } from "../../../shared/components/DashboardCard";
import { useNavigate } from "react-router-dom";
import { ITableData } from "../../../shared/components/Table/components/TableData";
import getTime from "../../../shared/hooks/getTime";
import { ITaskStatus } from "../../../shared/interfaces/ITask";
import TasksService from "../../../shared/services/tasksService";
import useSWR from "swr";
import RequestError from "../../../shared/components/RequestError";

const DashboardContent = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  rowGap: "1rem",
  columnGap: "2rem",
  marginTop: "2.5rem",
  marginBottom: "2.5rem",
});

const StyledTab = styled(Tab)({
  background: "none",
  border: "none",
});

const StyledButton = styled(Button)({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: "4.6875rem",
  boxShadow: " 0px 4px 3px 0px rgba(0, 0, 0, 0.02)",
  padding: "0.625rem 0.9375rem",
});

const getTasksStatus: () => Promise<ITaskStatus> = async () => {
  return await TasksService.getTasksStatusInfo();
};

export default function ManagerTasks({
  onCreate,
}: {
  onCreate: (value: string) => void;
  additionalTasks: ITableData[];
}) {
  const today = getTime();
  const [tabIndex, setTabIndex] = useState<number | string>(1);
  const navigate = useNavigate();

  // const taskStatus = useSWR<ITaskStatus>(
  //   "/workers/tasks_status_info",
  //   getTasksStatus
  // );

  const taskStatus: { data: ITaskStatus } = {
    data: { finished: 1, not_finished: 2, planned: 3 }, // FIXME: mocked data
  };

  const handleClickCreateTask = () => {
    navigate({
      search: "?create=true",
    });
    onCreate("?create=true");
  };

  // if (taskStatus.error) {
  //   console.error(taskStatus.error);
  //   return (
  //     <RequestError
  //       errorDescription={taskStatus.error}
  //       reload={taskStatus.mutate}
  //     />
  //   );
  // }

  return (
    <>
      <Typography sx={{ ...typographyDesktop.h1 }}>Задачи</Typography>
      <DashboardContent>
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
      </DashboardContent>
      <Box style={{ marginBottom: "2rem" }}>
        <Tabs
          defaultValue={1}
          value={tabIndex}
          onChange={(_, value) => {
            if (value) setTabIndex(value);
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginBottom="1.25rem"
          >
            <TabsList
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              {tabIndex === 1 ? (
                <StyledTab
                  value={1}
                  sx={{
                    borderBottom: "2px solid #FC5055",
                    paddingBottom: "0.5rem",
                  }}
                >
                  Задачи на сегодня
                </StyledTab>
              ) : (
                <StyledTab
                  value={1}
                  sx={{
                    paddingBottom: "0.5rem",
                  }}
                >
                  Задачи на сегодня
                </StyledTab>
              )}
            </TabsList>
            {tabIndex === 1 && (
              <>
                <AddRoundedIcon htmlColor="white" />
                <StyledButton onClick={handleClickCreateTask}>
                  Создать задачу
                </StyledButton>
              </>
            )}
          </Box>
          <TaskTab value={1}>
            <Box>
              <Box
                marginBottom="1.25rem"
                display={"grid"}
                columnGap="1.5rem"
                gridTemplateColumns={"repeat(2, 1fr)"}
              >
                <BadgeStyled
                  badgeContent="Выполнено"
                  status="success"
                  isIcon={true}
                />
                <BadgeStyled
                  badgeContent="Не выполнено"
                  status="danger"
                  isIcon={true}
                />
              </Box>
              <Box
                marginBottom="1.25rem"
                display={"grid"}
                columnGap="1.5rem"
                gridTemplateColumns={"repeat(2, 1fr)"}
              >
                <ManagerTaskCard task={tasks[0]} size="big" />
                <Box display="flex" flexDirection="column">
                  {tasks.slice(1).map((task) => (
                    <ManagerTaskCard task={task} size="small" key={task.id} />
                  ))}
                </Box>
              </Box>
            </Box>
          </TaskTab>
        </Tabs>
      </Box>
    </>
  );
}
