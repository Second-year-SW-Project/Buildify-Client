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
import React, { useRef, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";

export function InputField({
  label = null,
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
  name,
  Auto,
  onChange = null,
  row = false,
  size = "medium",
  options = [],
  labelPlacement = "end",
  disabled = false,
  showRequiredHelper = false,
}) {
  if (type === "text") {
    return (
      <TextField
        type={type}
        multiline
        label={label}
        fontSize={fontSize}
        variant={variant}
        value={value}
        name={name}
        color={color}
        rows={rows}
        width={width}
        disabled={disabled}
        helperText={
          showRequiredHelper && !value
            ? <span style={{ color: "red", fontWeight: 500, fontStyle: 'italic' }}>*Required</span>
            : helperText
        }
        error={!!error}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
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

  // <p style={{ whiteSpace: 'pre-wrap' }}>{product.description}</p>

  if (type === "number") {
    const inputRef = useRef();

    useEffect(() => {
      const input = inputRef.current;
      if (input) {
        const stopPageScroll = (e) => {
          e.stopPropagation(); // Allow input scroll, block page scroll
        };

        input.addEventListener("wheel", stopPageScroll);

        return () => {
          input.removeEventListener("wheel", stopPageScroll);
        };
      }
    }, []);
    return (
      <TextField
        inputRef={inputRef}
        type={type}
        label={label}
        fontSize={fontSize}
        value={value ?? ""}
        variant={variant}
        color={color}
        width={width}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        inputProps={{
          min: 0,
        }}
        slotProps={{
          inputLabel: {
            shrink: { Auto },
          },
        }}
        disabled={disabled}
        helperText={
          showRequiredHelper && (value === "" || value === undefined)
            ? <span style={{ color: "red", fontWeight: 500, fontStyle: 'italic' }}>*Required</span>
            : helperText
        }
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

  if (type === "select") {
    return (
      <TextField
        select
        label={label}
        fontSize={fontSize}
        variant={variant}
        color={color}
        value={value}
        disabled={disabled}
        error={!!error}
        size={size}
        helperText={
          showRequiredHelper && !value
            ? <span style={{ color: "red", fontWeight: 500, fontStyle: 'italic' }}>*Required</span>
            : helperText
        }
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        sx={{ width, marginBottom: "10px" }}
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
                type: "search",
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
                if (onChange) onChange(e.target.checked);
              }}
              size={size}
              color={color}
              disabled={disabled}
            />
          }
          label={label}
          value={value}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormGroup>
    );
  }

  if (type === "radio") {
    return (
      <FormControl error={!!error} disabled={disabled}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          row={row}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
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
