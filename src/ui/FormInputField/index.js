import { TextField } from "@mui/material";
import { checkEnglishName } from "../../utils/index";

const FormInputField = ({ label, onChange, sx = { textAlign: "center" }, error, type = "text", email, name
}) => {
  return (

    <TextField
      sx={sx}
      label={label}
      type={type}
      defaultValue={label === "Full Name (English)" ? checkEnglishName(name) : label === "Email" ? email : ""}
      onChange={onChange}
      error={error}
    />
  );
};

export default FormInputField;
