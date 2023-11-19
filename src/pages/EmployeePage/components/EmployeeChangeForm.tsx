import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  styled,
} from "@mui/material";
import Button from "@mui/material/Button";
import { typographyDesktop } from "../../../shared/config/typography";
import { useFormik } from "formik";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useNavigate } from "react-router-dom";
import IWorker from "../../../shared/interfaces/IWorker";

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

export default function EmployeeChangeForm({
  type,
  onSubmitForm,
  employee,
}: {
  type: "create" | "edit";
  onSubmitForm: (values: IWorker) => void;
  employee?: IWorker;
}) {
  const navigate = useNavigate();

  const formik = useFormik<IWorker>({
    initialValues: {
      id: employee ? employee.id : 0, // FIXME: Add global state
      name: employee ? employee.name : "",
      speciality: employee ? employee.speciality : [],
      kpi: employee ? employee.kpi : 0,
      lat: employee ? employee.lat : 0.0,
      long: employee ? employee.long : 0.0,
    },
    onSubmit: (values, { resetForm }) => {
      console.log("on submit form", values);
      onSubmitForm(values);
      console.log(values);
      navigate("/employees");
      resetForm();
    },
  });

  return (
    <Box>
      <StyledButton onClick={() => navigate("/employees")}>
        <ChevronLeftRoundedIcon />
      </StyledButton>
      <TypographyH1Desktop
        marginTop={"1rem"}
        marginBottom={"3rem"}
        textAlign={"center"}
      >
        {type === "create"
          ? "Добавление сотрудника"
          : "Редактирование сотрудника"}
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
            gridTemplateColumns={"1fr 2fr"}
            width={"100%"}
          >
            <OutlinedInput
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
              sx={{
                borderRadius: "0.625rem",
              }}
              placeholder="Номер"
              disabled
            />
            <OutlinedInput
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              sx={{ borderRadius: "0.625rem" }}
              placeholder="ФИО"
            />
          </Box>
          <Box
            display={"grid"}
            gap={"1.25rem"}
            gridTemplateColumns={"2fr 1fr"}
            width={"100%"}
          >
            <FormControl>
              <InputLabel>Специальность</InputLabel>
              <Select
                sx={{ borderRadius: "0.625rem" }}
                id="speciality"
                name="speciality"
                value={formik.values.speciality}
                onChange={formik.handleChange}
                multiple
                label="Специальность"
              >
                <MenuItem value="Обработка почвы">Обработка почвы</MenuItem>
                <MenuItem value="Защита растений">Защита растений</MenuItem>
                <MenuItem value="Посев">Посев</MenuItem>
              </Select>
            </FormControl>
            <OutlinedInput
              sx={{ borderRadius: "0.625rem" }}
              placeholder="KPI"
              id="kpi"
              name="kpi"
              value={formik.values.kpi}
              onChange={formik.handleChange}
              disabled
            />
          </Box>
          <Box
            display={"grid"}
            gap={"1.25rem"}
            gridTemplateColumns={"1fr 1fr"}
            width={"100%"}
          >
            <OutlinedInput
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Долгота"
              id="long"
              name="long"
              value={formik.values.long}
              onChange={formik.handleChange}
            />
            <OutlinedInput
              sx={{ borderRadius: "0.625rem" }}
              placeholder="Широта"
              id="lat"
              name="lat"
              value={formik.values.lat}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr"} width={"100%"}>
            <StyledSaveButton variant="contained" type="submit">
              {type === "create"
                ? "Добавить сотрудника"
                : "Сохранить изменения"}
            </StyledSaveButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
