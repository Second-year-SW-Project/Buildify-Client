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
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';


export function InputField({
  label,
  type = "text",
  width = "180px",
  rows,
  color = "primary",
  variant = "outlined",
  fontSize = "16px",
  helperText,
  Placeholder,
  error,
  value,
  Auto,
  onChange = null,
  row = false,
  size = "medium",
  options = [],
  labelPlacement = "end",
  disabled = false,
}) {
  if (type === "text") {
    return (
      <TextField
        type={type}
        label={label}
        fontSize={fontSize}
        variant={variant}
        color={color}
        width={width}
        disabled={disabled}
        helperText={helperText}
        error={!!error}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: 0,

                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
                {Placeholder}
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: width,
          marginBottom: "10px",
          "& .MuiInputBase-input": {
            fontSize: fontSize || "16px",
          },
          "& .MuiInputLabel-root": {
            fontSize: fontSize || "16px",
          },
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderWidth: 1,
              borderRadius: 1,
            },
          },
        }}
      />
    );
  }

  if (type === "textarea") {
    return (
      <TextField
        type={type}
        multiline
        label={label}
        fontSize={fontSize}
        color={color}
        rows={rows}
        disabled={disabled}
        helperText={helperText}
        error={!!error}
        sx={{
          width: width,
          marginBottom: "10px",
          "& .MuiInputBase-input": {
            fontSize: fontSize || "16px",
          },
          "& .MuiInputLabel-root": {
            fontSize: fontSize || "16px",
          },
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderWidth: 1,
              borderRadius: 2,
            },
          },
        }}
      />
    );
  }

  if (type === "number") {
    return (
      <TextField
        type={type}
        label={label}
        fontSize={fontSize}
        variant={variant}
        color={color}
        width={width}
        slotProps={{
          inputLabel: {
            shrink: { Auto },
          },
        }}
        disabled={disabled}
        helperText={helperText}
        sx={{
          width: width,
          "& .MuiInputBase-input": {
            fontSize: fontSize || "16px",
          },
          "& .MuiInputLabel-root": {
            fontSize: fontSize || "16px",
          },
          "& .MuiInputBase-root": {
            "& fieldset": {
              borderWidth: 1,
              borderRadius: 1,
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
        value={value}
        onChange={(e) => {
          if (onChange)
            onChange(e.target.value);
        }}
        variant={variant}
        color={color}
        disabled={disabled}
        error={!!error}
        helperText={helperText}
        sx={{ width }}
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
        value={options.find((opt) => opt.value === value) || null}
        onChange={(_, newValue) => {
          onChange(newValue ? newValue.value : "");
        }}

        disabled={disabled}
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

  if (type === "searchinput") {
    return (
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(_, newValue) => {
          onChange(newValue ? newValue.value : "");
        }}

        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
            error={!!error}
            helperText={helperText}
            sx={{ width: width }}
          />
        )}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={(e) => {
                if (onChange)
                  onChange(e.target.checked);
              }}
              size={size}
              color={color}
              disabled={disabled}
            />
          }
          label={label}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
    );
  }

  if (type === "radio") {
    return (
      <FormControl error={!!error} disabled={disabled}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup row={row} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Radio size={size} value={option.value} color={color} />}
              label={option.label}
              labelPlacement={labelPlacement}
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
// size - small or large
