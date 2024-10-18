import { TextField } from "@mui/material";

const FormInputField = ({ label, onChange, sx = { textAlign: "center" }, error, type = "text",
}) => {
  return (
    <TextField
      sx={sx}
      label={label}
      type={type}
      onChange={onChange}
      error={error}
    />
  );
};

export default FormInputField;
