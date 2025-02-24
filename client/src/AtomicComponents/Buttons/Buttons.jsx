import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Add from '@mui/icons-material/Add';

// import theme from '../theme';

// let theme = createTheme({
// });
// theme = createTheme({
//     palette: {
//         primarypurple: {
//             main: '#961AFD',
//             contrastText: '#FFFFFF',
//         },
//         primaryLight: {
//             main: '#AE47E2',
//             contrastText: '#FFFFFF',
//         },
//         primaryDark: {
//             main: '#7B16AE',
//             contrastText: '#FFFFFF',
//         },
//         secondary: {
//             main: '#FFFFFF',
//             contrastText: '#1C1919',
//         },
//         secondaryLight: {
//             main: '#FFFFFF',
//             contrastText: '#615E5E',
//         },
//         secondaryDark: {
//             main: '#FFFFFF',
//             contrastText: '#961AFD'
//         },
//         ternary: {
//             main: '#1C1919',
//             contrastText: '#FFFFFF',
//         },
//         white: {
//             main: '#FFFFFF'
//         },
//         Red: {
//             main: '#DF1E1E'
//         },
//         purple: {
//             main: '#961AFD'
//         }

//     },

// });

//Button Size initilization
const Button_Config = {
    small: {
        padding: '8px 16px',
        fixedWidth: '170px',
    },
    medium: {
        padding: '14px 18px',
        fixedWidth: '180px',
    },
    long: {
        padding: '12px 28px',
        fixedWidth: '250px',
    },
    large: {
        padding: '16px 40px',
        fixedWidth: '320px',
    }

}

//Common Styles for all buttons
const BaseButton = styled(Button)({
    textTransform: 'none',
    borderRadius: 8,
    borderWidth: '3px',
});

//PrimaryButton

export function PrimaryButton({
    name,
    color,
    isBold,
    isFixed,
    buttonSize,
    fontSize,
    isRounded,
    loading = false,
    isDisabled = false,
    onClick,
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    const borderRadius = isRounded ? '30px' : '8px'; //set rounded Border
    return (
        <div>
            <BaseButton
                variant="contained"
                color={color}
                disabled={isDisabled || loading}
                loading={loading}
                loadingIndicator="Loading…"
                sx={{
                    fontWeight: isBold ? 700 : 400,
                    borderRadius: borderRadius,
                    fontSize: fontSize,
                    padding: sizeConfig.padding,
                    width: isFixed ? sizeConfig.fixedWidth : 'auto'
                }}>
                {name}
            </BaseButton>
        </div >

    );
}

//OutlinedButton
export function OutlinedButton({
    name,
    color,
    isBold,
    isFixed,
    buttonSize,
    fontSize,
    isRounded,
    loading = false,
    isDisabled = false,
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    const borderRadius = isRounded ? '30px' : '8px'; //set rounded Border
    return (
        <div>
            <BaseButton
                variant="outlined"
                color={color}
                disabled={isDisabled || loading}
                loading={loading}
                loadingIndicator="Loading…"
                sx={{
                    bgcolor: 'white',
                    fontWeight: isBold ? 700 : 400,
                    borderRadius: borderRadius,
                    fontSize: fontSize,
                    padding: sizeConfig.padding,
                    width: isFixed ? sizeConfig.fixedWidth : 'auto',
                }}>
                {name}
            </BaseButton>
        </div >

    );
}

//CustomOutlinedButton
export function CustomOutlinedButton({
    name,
    isBold,
    isFixed,
    buttonSize,
    fontSize,
    loading = false,
    isDisabled = false,
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    return (
        <div>
            <ThemeProvider theme={theme}>
                <BaseButton
                    variant="customOutline"
                    disabled={isDisabled || loading}
                    loading={loading}
                    loadingIndicator="Loading…"
                    sx={{
                        fontWeight: isBold ? 700 : 400,
                        fontSize: fontSize,
                        padding: sizeConfig.padding,
                        width: isFixed ? sizeConfig.fixedWidth : 'auto',
                        border: `3px solid ${isDisabled ? '#bdbdbd' : '#961AFD'}`,

                    }}>
                    {name}
                </BaseButton>
            </ThemeProvider>
        </div>
    );
}

//Apply Button
export function ApplyButton({
    loading = false,
    isDisabled = false,
}) {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <BaseButton
                    variant="contained"
                    color="primaryDark"
                    disabled={isDisabled || loading}
                    loading={loading}
                    loadingIndicator="Loading…"
                    sx={{
                        fontWeight: 700,
                        borderRadius: '30px',
                        fontSize: '20px',
                        padding: '8px 18px',
                        width: '350px',
                    }}>
                    Apply
                </BaseButton>
            </ThemeProvider>
        </div>
    );
}

//Upload Button

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

//
export function ImageUploadButton({
    buttonSize,
    fontSize,
    loading = false,
    isDisabled = false,
}) {
    //Create Upload file Function
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if the file type is jpg/jpeg or png
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                console.log('Valid image file selected:', file.name);
                // Here you can add your file handling logic
            } else {
                alert('Please select only JPG or PNG images');
                // Clear the input
                event.target.value = '';
            }
        }
    };
    const sizeConfig = Button_Config[buttonSize] || Button_Config.long; //set Button Size
    return (
        <div>
            <BaseButton
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                color="primary"
                disabled={isDisabled || loading}
                loading={loading}
                loadingPosition="start"
                startIcon={<CloudUploadIcon />}
                style={{ borderRadius: 8, fontWeight: 'bold' }}
                sx={{
                    fontSize: fontSize,
                    padding: sizeConfig.padding
                }}
            >
                Upload
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                />
            </BaseButton>
        </div>

    );
}

//Add Button
export function AddButton({
    name,
    color,
    loading = false,
    isDisabled = false,
    isFixed,
    isBold,
    fontSize,
    buttonSize,
    isRounded
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    const borderRadius = isRounded ? '30px' : '8px'; //set rounded Border
    return (
        <div>
            <ThemeProvider theme={theme}>
                <BaseButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    color={color}
                    disabled={isDisabled || loading}
                    loading={loading}
                    loadingIndicator="Loading..."
                    startIcon={<Add />
                    }
                    style={{ borderRadius: borderRadius }}
                    sx={{
                        fontSize: fontSize,
                        fontWeight: isBold ? 700 : 400,
                        padding: sizeConfig.padding,
                        width: isFixed ? sizeConfig.fixedWidth : 'auto',
                        '& .MuiButton-startIcon': {
                            marginRight: '8px',
                        },
                    }}
                >
                    {name}
                </BaseButton>
            </ThemeProvider>
        </div>

    );
}
