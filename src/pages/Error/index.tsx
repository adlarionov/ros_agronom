import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EErrorTexts } from "../../shared/enums/EErrorTexts";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getUser } from "../../shared/hooks/useUser";

export default function Error({ errorReason }: { errorReason: string }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (getUser()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box alignItems="center" justifyContent="center" columnGap={4}>
      <Typography variant="h5">Ошибка: {errorReason}</Typography>
      {errorReason === EErrorTexts.Error404 && (
        <Button variant="contained" onClick={handleBackClick}>
          Домой
        </Button>
      )}
    </Box>
  );
}
