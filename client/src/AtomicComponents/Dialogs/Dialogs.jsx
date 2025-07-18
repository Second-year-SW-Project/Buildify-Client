import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../theme';
import { PrimaryButton } from '../Buttons/Buttons';

export default function DialogAlert({ Title, message, Agree, Disagree, open, handleClose, handleAgree, loading = false }) {

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id={"responsive-dialog-title"}>
                {Title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {!loading && (
                    <PrimaryButton onClick={handleClose} name={Disagree} fontSize="16px" buttonSize="small" isBold={1} color="secondaryDark">
                    </PrimaryButton>
                )}
                <PrimaryButton onClick={handleAgree} name={Agree} fontSize="16px" buttonSize="small" isBold={1} color="error" loading={loading}>
                </PrimaryButton>
            </DialogActions>
        </Dialog>

    );
}
