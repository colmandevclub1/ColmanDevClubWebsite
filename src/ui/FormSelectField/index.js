import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormSelectField = ({ label, onChange, options, error, type }) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        onChange={onChange}
        sx={{ color: "white" }}
        label={label}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option} divider>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelectField;
