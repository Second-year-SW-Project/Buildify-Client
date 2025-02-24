import {
  TextField,
  MenuItem,
  Autocomplete,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import React from "react";
import DatePickerAtom from "./date"; // Adjust the import path as necessary

const InputSizeConfig = {
  small: {
    padding: "8px 16px",
    width: "170px",
  },
  medium: {
    padding: "14px 18px",
    width: "180px",
  },
  long: {
    padding: "12px 28px",
    width: "250px",
  },
  large: {
    padding: "16px 40px",
    width: "300px",
  },
};

const Input = ({
  type = "text",
  label,
  options = [],
  inputType = "textField", // 'textField', 'select', 'autocomplete', 'checkbox', 'radio', 'datePicker'
  error,
  helperText,
  variant = "standard", // 'standard', 'outlined', 'filled'
  size = "medium", // New prop for size
  ...props //multiline, rows, maxrows etc
}) => {
  const inputStyles = InputSizeConfig[size] || InputSizeConfig.medium; // Default to medium if size is not found

  if (inputType === "select") {
    return (
      <TextField
        select
        label={label}
        error={!!error}
        helperText={helperText}
        sx={{ padding: inputStyles.padding, width: inputStyles.width }} // Apply styles
        {...props}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  if (inputType === "autocomplete") {
    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            helperText={helperText}
            sx={{ padding: inputStyles.padding, width: inputStyles.width }} // Apply styles
          />
        )}
        {...props}
      />
    );
  }

  if (inputType === "checkbox") {
    const checkboxId = `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox id={checkboxId} {...props} />} // Set the id for the checkbox
          label={label} // This should display the label next to the checkbox
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
    );
  }

  if (inputType === "radio") {
    return (
      <FormControl error={!!error}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup {...props}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Radio value={option.value} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  if (inputType === "datePicker") {
    return (
      <DatePickerAtom
        label={label}
        defaultValue={props.value} // Pass the value prop to DatePickerAtom
        onChange={(date) => {
          if (props.onChange) {
            props.onChange(date);
          }
        }}
      />
    );
  }

  return (
    <TextField
      type={type}
      label={label}
      error={!!error}
      helperText={helperText}
      variant={variant}
      sx={{ padding: inputStyles.padding, width: inputStyles.width }} // Apply styles
      {...props}
    />
  );
};

export default Input;
