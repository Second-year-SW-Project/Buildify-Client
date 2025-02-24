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
import theme from "../theme";

// const InputSizeConfig = {
//   small: {
//     fixedWidth: "370px",
//   },
//   medium: {
//     width: "180px",
//   },
//   long: {
//     width: "250px",
//   },
//   large: {
//     width: "300px",
//   },
// };
//const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size

export function InputFiled({
  label,
  type,
  width = "180px",
  color,
  variant,
  fontSize = "16px",
  helperText,
  error
}) {
  if (type === "select") {
    return (
      <TextField
        inputType={type}
        label={label}
        fontSize={fontSize}
        color={color}
        variant={variant}
        width={width}
        helperText={helperText}
        error={!!error}
        sx={{
          width: width,
          '& .MuiInputBase-input': {
            fontSize: fontSize || '16px', // Use provided fontSize, or size-based fontSize, or default
          },
          '& .MuiInputLabel-root': {
            fontSize: (fontSize || '16px'), // Making label slightly smaller than input text
          },
          "& .& .MuiFilledInput-root": {
            "& fieldset": {
              borderWidth: 2, // Default border color
            },
          }
        }} />
    );
  }
}


// const Input = ({
//   type = "text",
//   label,
//   options = [],
//   inputType = "textField", // 'textField', 'select', 'autocomplete', 'checkbox', 'radio', 'datePicker'
//   error,
//   helperText,
//   variant = "standard", // 'standard', 'outlined', 'filled'
//   size = "medium", // New prop for size
//   ...props //multiline, rows, maxrows etc
// }) => {
//   const inputStyles = InputSizeConfig[size] || InputSizeConfig.medium; // Default to medium if size is not found

//   if (inputType === "select") {
//     return (
//       <TextField
//         select
//         label={label}
//         error={!!error}
//         helperText={helperText}
//         sx={{ padding: inputStyles.padding, width: inputStyles.width }} // Apply styles
//         {...props}
//       >
//         {options.map((option, index) => (
//           <MenuItem key={index} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//     );
//   }

//   if (inputType === "autocomplete") {
//     return (
//       <Autocomplete
//         options={options}
//         getOptionLabel={(option) => option.label}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={label}
//             error={!!error}
//             helperText={helperText}
//             sx={{ padding: inputStyles.padding, width: inputStyles.width }} // Apply styles
//           />
//         )}
//         {...props}
//       />
//     );
//   }

//   if (inputType === "checkbox") {
//     const checkboxId = `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;

//     return (
//       <FormGroup>
//         <FormControlLabel
//           control={<Checkbox id={checkboxId} {...props} />} // Set the id for the checkbox
//           label={label} // This should display the label next to the checkbox
//         />
//         {helperText && <FormHelperText>{helperText}</FormHelperText>}
//       </FormGroup>
//     );
//   }

//   if (inputType === "radio") {
//     return (
//       <FormControl error={!!error}>
//         <FormLabel>{label}</FormLabel>
//         <RadioGroup {...props}>
//           {options.map((option, index) => (
//             <FormControlLabel
//               key={index}
//               control={<Radio value={option.value} />}
//               label={option.label}
//             />
//           ))}
//         </RadioGroup>
//         {helperText && <FormHelperText>{helperText}</FormHelperText>}
//       </FormControl>
//     );
//   }

//   if (inputType === "datePicker") {
//     return (
//       <DatePickerAtom
//         label={label}
//         defaultValue={props.value} // Pass the value prop to DatePickerAtom
//         onChange={(date) => {
//           if (props.onChange) {
//             props.onChange(date);
//           }
//         }}
//       />
//     );
//   }

//   return (
//     <TextField
//       type={type}
//       label={label}
//       error={!!error}
//       helperText={helperText}
//       variant={variant}
//       sx={{ padding: inputStyles.padding, width: inputStyles.width }} // Apply styles
//       {...props}
//     />
//   );
// };

