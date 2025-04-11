import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Add from '@mui/icons-material/Add';


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
    padding,
    onClick,
    loading = false,
    isDisabled = false,
    type
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
                onClick={onClick}
                type={type}
                sx={{
                    fontWeight: isBold ? 700 : 400,
                    borderRadius: borderRadius,
                    fontSize: fontSize,
                    padding: sizeConfig.padding,
                    width: isFixed ? sizeConfig.fixedWidth : 'auto',
                    paddingLeft: padding,
                    paddingRight: padding,
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
    onClick,
    loading = false,
    isDisabled = false,
    type
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
                onClick={onClick}
                type={type}
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

//TextButton
export function TextButton({
    name,
    color,
    isBold,
    isFixed,
    buttonSize,
    fontSize,
    isRounded,
    onClick,
    loading = false,
    isDisabled = false,
    type
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    const borderRadius = isRounded ? '30px' : '8px'; //set rounded Border

    return (
        <div>
            <BaseButton
                variant="text"
                color={color}
                disabled={isDisabled || loading}
                loading={loading}
                loadingIndicator="Loading…"
                onClick={onClick}
                type={type}
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

//CustomOutlinedButton
export function CustomOutlinedButton({
    name,
    isBold,
    isFixed,
    buttonSize,
    fontSize,
    onClick,
    loading = false,
    isDisabled = false,
    type
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    return (
        <div>
            <BaseButton
                variant="customOutline"
                disabled={isDisabled || loading}
                loading={loading}
                loadingIndicator="Loading…"
                onClick={onClick}
                type={type}
                sx={{
                    fontWeight: isBold ? 700 : 400,
                    fontSize: fontSize,
                    padding: sizeConfig.padding,
                    width: isFixed ? sizeConfig.fixedWidth : 'auto',
                    border: `3px solid ${isDisabled ? '#bdbdbd' : '#961AFD'}`,

                }}>
                {name}
            </BaseButton>
        </div>
    );
}

//Apply Button
export function ApplyButton({
    loading = false,
    isDisabled = false,
    onClick,
    type
}) {
    return (
        <div>
            <BaseButton
                variant="contained"
                color="primaryDark"
                disabled={isDisabled || loading}
                loading={loading}
                loadingIndicator="Loading…"
                onClick={onClick}
                type={type}
                sx={{
                    fontWeight: 700,
                    borderRadius: '30px',
                    fontSize: '20px',
                    padding: '8px 18px',
                    width: '350px',
                }}>
                Apply
            </BaseButton>
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
    onClick,
    type
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
                onClick={onClick}
                type={type}
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
    isRounded,
    onClick,
    type
}) {
    const sizeConfig = Button_Config[buttonSize] || Button_Config.medium; //set Button Size
    const borderRadius = isRounded ? '30px' : '8px'; //set rounded Border
    return (
        <div>
            <BaseButton
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                color={color}
                disabled={isDisabled || loading}
                loading={loading}
                loadingIndicator="Loading..."
                onClick={onClick}
                type={type}
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
        </div>

    );
}

//How to Use

//<CustomOutlinedButton  {PrimaryButton, OutlinedButton,CustomOutlinedButton}
//   name="Lasitha" *Required
//   color="primary" {primaryprimary,primaryLight,primaryDark,secondary,secondaryLight,secondaryDark,ternary,white,error,}
//   isBold={true}
//   isFixed={true}
//   buttonSize="medium" {small,medium,large,long}
//   fontSize="20px"
//   isRounded={true}
//   loading={false}
//   isDisabled={false}
// >
// </CustomOutlinedButton>

//<ImageUploadButton
//   buttonSize="long" {small,medium,large,long}
//   fontSize="20px"
//   loading={false}
//   isDisabled={false}
// >
// </ImageUploadButton>

//<AddButton
//   name="Add"
//   color="primary" {primaryprimary,primaryLight,primaryDark,secondary,secondaryLight,secondaryDark,ternary,white,error,}
//   buttonSize="medium" {small,medium,large,long}
//   fontSize="20px"
//   loading={false}
//   isFixed={true}
//   isRounded={true}
//   isDisabled={false}
//>
//</AddButton>

//<AppyButton
//   loading={false}
//   isDisabled={false}
//>
//</AppyButton>

