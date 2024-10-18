import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FormSelectField = ({ label, onChange, options, error, sx = { textAlign: "center" },
  type }) => {
  return (
    <FormControl fullWidth error={error} sx={sx}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        onChange={onChange}
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
