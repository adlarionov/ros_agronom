import Box from "@mui/material/Box";
import { typographyDesktop } from "../../../shared/config/typography";
import { Button, Typography, styled } from "@mui/material";
import BadgeStyled from "../../../shared/components/BadgeStyled";
import ITask from "../../../shared/interfaces/ITask";
import { theme } from "../../../app/providers/ThemeProvider/theme";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const TypographyH3Desktop = styled(Typography)({
  ...typographyDesktop.h3,
  marginBottom: "1rem",
  maxWidth: "18rem",
});

const TypographyCaption = styled(Typography)({
  ...typographyDesktop.caption,
  color: "#616161",
});

const StyledButton = styled(Button)({
  background: "none",
  padding: "0",
  width: "10px",
});

export default function ManagerTaskCard({
  task,
  onDelete,
  onEdit,
}: {
  task: ITask;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <Box
      padding={"1.25rem"}
      bgcolor={"#FFF"}
      borderRadius={"1.25rem"}
      marginBottom={"1.25rem"}
      height="fit-content"
    >
      <Box display="flex" alignItems="center" justifyContent={"space-between"}>
        <TypographyH3Desktop>{task.type}</TypographyH3Desktop>
        <Box display="flex">
          <StyledButton
            style={{ color: theme.palette.error.main }}
            onClick={() => onDelete(task.id)}
          >
            <DeleteOutlinedIcon />
          </StyledButton>
          <StyledButton
            onClick={() => onEdit(task.id)}
            style={{ color: "#3657CD" }}
          >
            <EditOutlinedIcon />
          </StyledButton>
        </Box>
      </Box>
      <TypographyCaption marginBottom={"1.5rem"}>
        Координаты: {task.long}, {task.lat}
      </TypographyCaption>
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(4, 1fr)"}
        rowGap="0.5rem"
        marginBottom="1.5rem"
        alignItems="center"
      >
        <TypographyCaption>Время</TypographyCaption>
        <TypographyCaption>Приоритет</TypographyCaption>
        <TypographyCaption>Сотрудник</TypographyCaption>
        <TypographyCaption>Площадь</TypographyCaption>
        <Box
          sx={{
            padding: "0.375rem",
            borderRadius: "1.25rem",
            border: "1px solid #E0E0E0",
            width: "fit-content",
          }}
        >
          <Typography fontSize="0.875rem" color="#000" fontWeight={"500"}>
            {task.duration} минут
          </Typography>
        </Box>
        <BadgeStyled
          status={
            task.priority === "Высокий"
              ? "danger"
              : task.priority === "Средний"
              ? "warning"
              : "success"
          }
          badgeContent={task.priority}
          isIcon={true}
        />
        <Typography fontWeight={"500"}>{task.executor}</Typography>
        <Typography fontWeight={"500"}>{task.processing_area} Га</Typography>
      </Box>
    </Box>
  );
}
