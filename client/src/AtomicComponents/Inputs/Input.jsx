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
  textFieldClasses,
} from "@mui/material";
import React from "react";
import theme from "../theme";

export function InputField({
  label,
  type = "text",
  width = "180px",
  color,
  variant,
  fontSize = "16px",
  helperText,
  error,
  row,
  rows,
  size,
  options = [],
  labelPlacement,
  defaultValue,
  padding,
  fullWidth,
  margin,
  outlinedActive,
}) {
  if (type === "text") {
    return (
      <TextField
        type={type}
        label={label}
        fontSize={fontSize}
        padding={padding}
        margin={margin}
        color={color}
        variant={variant}
        width={width}
        helperText={helperText}
        error={!!error}
        defaultValue={defaultValue}
        fullWidth={fullWidth}
        rows={rows}
        style={{
          margin: margin,
        }}
        InputLabelProps={
          variant === "standard" || outlinedActive ? { shrink: true } : {}
        }
        sx={{
          width: fullWidth ? "100%" : width,
          "@media (max-width:600px)": {
            width: "80%",
          },
          "& .MuiInputBase-input": {
            fontSize: fontSize || "16px",
            padding: padding, // Use provided fontSize, or size-based fontSize, or default
          },
          "& .MuiInputLabel-root": {
            fontSize: fontSize || "16px", // Making label slightly smaller than input text
          },
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderWidth: 2,
              borderRadius: 2,
            },
          },
        }}
      />
    );
  }

  if (type === "select") {
    return (
      <TextField
        select
        label={label}
        fontSize={fontSize}
        color={color}
        variant={variant} // 'standard', 'outlined', 'filled'
        error={!!error}
        helperText={helperText}
        sx={{
          width: width,
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderWidth: 2,
              borderRadius: 2,
            },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  if (type === "autocomplete") {
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
            sx={{ width: width }}
          />
        )}
      />
    );
  }

  if (type === "checkbox") {
    //size small large
    return (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox size={size} color={color} />} // Set the id for the checkbox
          label={label} // This should display the label next to the checkbox
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
    );
  }

  if (type === "radio") {
    //size small large
    return (
      <FormControl error={!!error}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup row={row}>
          {options.map((option, index) => (
            <FormControlLabel
              labelPlacement={labelPlacement} //end or bottom
              key={index}
              control={<Radio size={size} value={option.value} color={color} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

// Usage:

// for textField
// <InputField label="First Name" type="text" />
// fontsize 14px or 16px
// variant - Standard, Outlined, Filled
// error
// width
// helperText

// for select
// <InputField
//   label="Country"
//   type="select"
//   options={[
//     { value: "usa", label: "USA" },
//     { value: "canada", label: "Canada" },
//   ]}
// />
// variant - Standard, Outlined, Filled
// error
// width
// helperText

// for autocomplete
// <InputField
//   label="Country"
//   type="autocomplete"
//   options={[
//     { value: "usa", label: "USA" },
//     { value: "canada", label: "Canada" },
//   ]}
// />
// width
// helperText

// for checkbox
// <InputField label="I agree" type="checkbox" />
// width
// helperText
// size - small or large
// color

// for radio
// <InputField
// label="Choose fruit" type="radio"
// options={[
//   { value: "apple", label: "Apple" },
//   { value: "banana", label: "Banana" },
// ]}
// />
// helperText
// color
// row - horizontal
// labelPlacement - end or bottom
// size - small or large
