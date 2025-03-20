import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Divider,
  Switch,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../Store/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct

const SecuritySettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState({
    secret: '',
    qrCode: '',
    verificationCode: ''
  });

  // Password Change Handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/change-password',
        passwordForm,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    }
  };

  // 2FA Setup Handler
  const handleTwoFactorToggle = async () => {
    if (!twoFactorEnabled) {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/users/2fa/setup',
          {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              withCredentials: true
            }
          }
        );
        
        setTwoFactorData({
          secret: response.data.secret,
          qrCode: response.data.qrCode,
          verificationCode: ''
        });
        setTwoFactorDialogOpen(true);
      } catch (error) {
        toast.error('Failed to setup 2FA');
      }
    } else {
      try {
        await axios.post(
          'http://localhost:8000/api/v1/users/2fa/disable',
          {},
          {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              withCredentials: true
            }
          },
        );
        
        setTwoFactorEnabled(false);
        toast.success('2FA disabled successfully');
      } catch (error) {
        toast.error('Failed to disable 2FA');
      }
    }
  };

  // 2FA Verification Handler
  const verifyTwoFactor = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/2fa/verify',
        {
          code: twoFactorData.verificationCode,
          secret: twoFactorData.secret
        },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(response.data.user));
      setTwoFactorEnabled(true);
      setTwoFactorDialogOpen(false);
      toast.success('2FA enabled successfully');
    } catch (error) {
      toast.error('Invalid verification code');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>Security Settings</Typography>
        <Divider sx={{ mb: 4 }} />

        {/* Password Change Section */}
        <Box component="form" onSubmit={handlePasswordChange} sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(p => ({...p, currentPassword: e.target.value}))}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(p => ({...p, newPassword: e.target.value}))}
                required
                inputProps={{ minLength: 8 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(p => ({...p, confirmPassword: e.target.value}))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* 2FA Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Two-Factor Authentication
            <Switch
              checked={twoFactorEnabled}
              onChange={handleTwoFactorToggle}
              color="primary"
              sx={{ ml: 2 }}
            />
          </Typography>

          <Dialog 
            open={twoFactorDialogOpen} 
            onClose={() => setTwoFactorDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                py: 4 
              }}>
                {twoFactorData.QRCodeCanvas && (
                  <>
                    <QRCode 
                      value={twoFactorData.QRCodeCanvas}
                      size={256}
                      level="H"
                      includeMargin
                    />
                    <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                      Scan this QR code with your authenticator app
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Or enter secret key: {twoFactorData.secret}
                    </Typography>
                  </>
                )}
                
                <TextField
                  fullWidth
                  label="Verification Code"
                  value={twoFactorData.verificationCode}
                  onChange={(e) => setTwoFactorData(d => ({...d, verificationCode: e.target.value}))}
                  sx={{ mt: 3 }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]{6}' }}
                />
                
                <Button 
                  variant="contained" 
                  onClick={verifyTwoFactor}
                  sx={{ mt: 2, width: '100%' }}
                  disabled={!twoFactorData.verificationCode}
                >
                  Verify and Enable 2FA
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecuritySettings;
