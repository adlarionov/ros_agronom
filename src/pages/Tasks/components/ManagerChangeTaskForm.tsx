import Box from "@mui/material/Box";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { typographyDesktop } from "../../../shared/config/typography";
import { useFormik } from "formik";
import ITask from "../../../shared/interfaces/ITask";

const StyledButton = styled(Button)({
  color: "black",
  position: "absolute",
  top: "1.5rem",
  ":hover": {
    backgroundColor: "#F6F7F8",
    boxShadow: "none",
  },
});

const StyledSaveButton = styled(Button)({
  ...typographyDesktop.button,
  color: "white",
  fontWeight: "400",
  padding: "1rem 0",
  boxShadow: "none",
  borderRadius: "6.25rem",
  textTransform: "none",
  ":hover": {
    boxShadow: "none",
  },
});

const TypographyH1Desktop = styled(Typography)({
  ...typographyDesktop.h1,
});

export default function ManagerChangeTaskForm({
  onSubmitForm,
  type,
  task,
}: {
  onSubmitForm: (value: ITask) => void;
  type: "create" | "edit";
  task?: ITask;
}) {
  const navigate = useNavigate();
  const formik = useFormik<ITask>({
    initialValues: {
      id: task ? task.id : 0,
      place_name: task ? task.place_name : "", // FIXME:
      type: task ? task.type : "", // FIXME:
      lat: task ? task.lat : 0.0, // FIXME:
      long: task ? task.long : 0.0, // FIXME:
      duration: task ? task.duration : 0, // FIXME:
      priority: task ? task.priority : "Средний", // FIXME:
      processing_area: task ? task.processing_area : 0, // FIXME:
      start_time: task ? task.start_time : "",
      finish_time: task ? task.finish_time : "",
      is_available: task ? task.is_available : true,
      executor: task ? task.executor : "", // FIXME:
      status: task ? task.status : "",
      description: task ? task.description : "", // FIXME:
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitForm(values);
      navigate("/objectives");
      resetForm();
    },
  });

  return (
    <Box>
      <StyledButton onClick={() => navigate("/objectives")}>
        <ChevronLeftRoundedIcon />
      </StyledButton>
      <TypographyH1Desktop
        marginTop={"1rem"}
        marginBottom={"3rem"}
        textAlign={"center"}
      >
        {type === "create" ? "Добавление задачи" : "Редактирование задачи"}
      </TypographyH1Desktop>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"1.25rem"}
          padding={"0 5rem"}
        >
          <Box
            display={"grid"}
            gap={"1.25rem"}
            gridTemplateColumns={"1fr 1fr 1fr"}
            width={"100%"}
          >
            <OutlinedInput
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Номер"
              disabled
            />
            <OutlinedInput
              id="place_name"
              name="place_name"
              value={formik.values.place_name}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Название поля"
            />
            <OutlinedInput
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Тип задачи"
            />
          </Box>
          <Box
            display={"grid"}
            gap={"1.25rem"}
            gridTemplateColumns={"1fr 1fr 1fr"}
            width={"100%"}
          >
            <FormControl>
              <InputLabel>Приоритет</InputLabel>
              <Select
                sx={{ borderRadius: "0.625rem" }}
                placeholder="Приоритет"
                id="priority"
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                label="Приоритет"
              >
                <MenuItem value="Высокий">Высокий</MenuItem>
                <MenuItem value="Средний">Средний</MenuItem>
                <MenuItem value="Низкий">Низкий</MenuItem>
              </Select>
            </FormControl>
            <OutlinedInput
              id="lat"
              name="lat"
              value={formik.values.lat}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Широта"
            />
            <OutlinedInput
              id="long"
              name="long"
              value={formik.values.long}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Долгота"
            />
          </Box>
          <Box
            display={"grid"}
            gap={"1.25rem"}
            width={"100%"}
            gridTemplateColumns={"1fr 1fr 1fr"}
          >
            <OutlinedInput
              id="duration"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Время на выполнение"
            />
            <OutlinedInput
              id="processing_area"
              name="processing_area"
              value={formik.values.processing_area}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Площадь поля"
            />
            <FormControl>
              <InputLabel>Исполнитель</InputLabel>
              <Select
                sx={{ borderRadius: "0.625rem" }}
                placeholder="Исполнитель"
                id="executor"
                name="executor"
                value={formik.values.executor}
                onChange={formik.handleChange}
                label="Исполнитель"
                defaultValue="Не назначен"
              >
                <MenuItem value="Не назначен">Не назначен</MenuItem>
                <MenuItem value="Александр Петров">Александр Петров</MenuItem>
                <MenuItem value="Екатерина Смирнова">
                  Екатерина Смирнова
                </MenuItem>
                <MenuItem value="Дмитрий Козлов">Дмитрий Козлов</MenuItem>
                <MenuItem value="Ольга Морозова">Ольга Морозова</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            display={"grid"}
            gap={"1.25rem"}
            width={"100%"}
            gridTemplateColumns={"1fr"}
          >
            <OutlinedInput
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Комментарий"
              multiline
              rows={4}
            />
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr"} width={"100%"}>
            <StyledSaveButton variant="contained" type="submit">
              {type === "create" ? "Добавить задачу" : "Сохранить изменения"}
            </StyledSaveButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
