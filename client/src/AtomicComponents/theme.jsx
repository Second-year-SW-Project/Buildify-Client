import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8A00FC",
    },
    primary100: {
      main: "#F4E6FF",
    },
    primary200: {
      main: "#E8CCFE",
    },
    primary300: {
      main: "#DCB3FF",
    },
    primary400: {
      main: "#D099FE",
    },
    primary500: {
      main: "#C580FE",
    },
    primary600: {
      main: "#B966FD",
    },
    primary700: {
      main: "#AE4DFD",
    },
    primary800: {
      main: "#A133FD",
    },
    primary900: {
      main: "#961AFD",
    },
    dark1: {
      main: "#4D0A6E",
    },
    dark2: {
      main: "#1F012D",
    },
    opacity10: {
      main: "rgba(138, 0, 252, 0.1)",
    },
    opacity20: {
      main: "rgba(138, 0, 252, 0.2)",
    },
    opacity30: {
      main: "rgba(138, 0, 252, 0.3)",
    },
    opacity40: {
      main: "rgba(138, 0, 252, 0.4)",
    },
    opacity50: {
      main: "rgba(138, 0, 252, 0.5)",
    },
    opacity60: {
      main: "rgba(138, 0, 252, 0.6)",
    },
    opacity70: {
      main: "rgba(138, 0, 252, 0.7)",
    },
    opacity80: {
      main: "rgba(138, 0, 252, 0.8)",
    },
    opacity90: {
      main: "rgba(138, 0, 252, 0.9)",
    },
    black: {
      main: "#1C1919",
    },
    black900: {
      main: "#333030",
    },
    black800: {
      main: "#494747",
    },
    black700: {
      main: "#615E5E",
    },
    black600: {
      main: "#777575",
    },
    black500: {
      main: "#8E8C8C",
    },
    black400: {
      main: "#A4A3A3",
    },
    black300: {
      main: "#BBBABA",
    },
    black200: {
      main: "#D2D1D1",
    },
    black100: {
      main: "#E9E8E8",
    },
    blackopacity10: {
      main: "rgba(28, 25, 25, 0.1)",
    },
    blackopacity20: {
      main: "rgba(28, 25, 25, 0.2)",
    },
    blackopacity30: {
      main: "rgba(28, 25, 25, 0.3)",
    },
    blackopacity40: {
      main: "rgba(28, 25, 25, 0.4)",
    },
    blackopacity50: {
      main: "rgba(28, 25, 25, 0.5)",
    },
    blackopacity60: {
      main: "rgba(28, 25, 25, 0.6)",
    },
    blackopacity70: {
      main: "rgba(28, 25, 25, 0.7)",
    },
    blackopacity80: {
      main: "rgba(28, 25, 25, 0.8)",
    },
    blackopacity90: {
      main: "rgba(28, 25, 25, 0.9)",
    },
    white: {
      main: "#FFFFFF",
    },
    white10: {
      main: "rgba(255, 255, 255, 0.1)",
    },
    white20: {
      main: "rgba(255, 255, 255, 0.2)",
    },
    white30: {
      main: "rgba(255, 255, 255, 0.3)",
    },
    white40: {
      main: "rgba(255, 255, 255, 0.4)",
    },
    white50: {
      main: "rgba(255, 255, 255, 0.5)",
    },
    white60: {
      main: "rgba(255, 255, 255, 0.6)",
    },
    white70: {
      main: "rgba(255, 255, 255, 0.7)",
    },
    white80: {
      main: "rgba(255, 255, 255, 0.8)",
    },
    white90: {
      main: "rgba(255, 255, 255, 0.9)",
    },
    white: {
      main: '#FFFFFF'
    },
    error: {
      main: "#D91E18",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#FF9400",
    },
    info: {
      main: "#2C87C3",
    },
    primaryprimary: {
      main: '#961AFD',
      contrastText: '#FFFFFF',
    },
    primaryLight: {
      main: '#B966FD',
      contrastText: '#FFFFFF',
    },
    primaryDark: {
      main: '#7B16AE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#1C1919',
    },
    secondaryLight: {
      main: '#FFFFFF',
      contrastText: '#615E5E',
    },
    secondaryDark: {
      main: '#FFFFFF',
      contrastText: '#961AFD'
    },
    ternary: {
      main: '#1C1919',
      contrastText: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "customOutline" },
          style: {
            textTransform: "none",
            border: `2px solid #961AFD`,
            color: "#961AFD",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            borderWidth: "3px",
            "&:hover": {
              backgroundColor: "#F8F4FF",
            },
          },
        },
      ],
    },
  },
});

export default theme;

// how to use colors
// InputProps={{
//   style: {
//     color: theme.palette.error.main, // Text color
//   },
// }}
// sx={{
//   mb: 2,
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: theme.palette.blacks.main, // Default border color
//     },
//     "&:hover fieldset": {
//       borderColor: theme.palette.primary.main, // Border color on hover
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: theme.palette.primary[600], // Border color when focused (change to desired color)
//     },
//   },
//   "& .MuiInputLabel-root": {
//     color: theme.palette.blacks.main, // Default label color
//   },
//   "& .MuiInputLabel-root.Mui-focused": {
//     color: theme.palette.success.main, // Label color when focused (change to desired color)
//   },
// }}

// or

//  color="error"
