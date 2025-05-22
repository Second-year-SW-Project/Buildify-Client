import React, { useState, useEffect } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
    Box,
    Button,
    Paper,
} from '@mui/material';
import axios from 'axios';

const OrderStepper = ({ activeStep, setActiveStep, orderId, orderCreatedAt, onStatusChange, orderStatus }) => {
    const [loading, setLoading] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [stepTimestamps, setStepTimestamps] = useState({});

    const steps = [
        {
            label: 'Order Placed',
            description: 'Your order has been successfully placed and is being processed.',
            status: 'Pending'
        },
        {
            label: 'Processing',
            description: 'Your Order is being processed and prepared for shipment.',
            status: 'Successful'
        },
        {
            label: 'Shipped',
            description: 'Your Order has been shipped and is on its way.',
            status: 'Shipped'
        },
        {
            label: 'Delivered',
            description: '',
            status: 'Delivered'
        },
    ];

    // Fetch order timestamps when component mounts or activeStep changes
    useEffect(() => {
        const fetchOrderTimestamps = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/checkout/order/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.Success && response.data.data) {
                    const orderData = response.data.data;

                    // Initialize timestamps with all steps
                    const initialTimestamps = {
                        Pending: new Date(orderData.createdAt),
                        ...(orderData.stepTimestamps || {})
                    };

                    // Check and set null for timestamps before 2000
                    Object.keys(initialTimestamps).forEach(key => {
                        if (initialTimestamps[key]) {
                            const timestamp = new Date(initialTimestamps[key]);
                            if (timestamp.getFullYear() < 2000) {
                                initialTimestamps[key] = null;
                            }
                        }
                    });

                    // Ensure all step timestamps are properly set
                    steps.forEach(step => {
                        if (!initialTimestamps[step.status]) {
                            initialTimestamps[step.status] = null;
                        }
                    });

                    setStepTimestamps(initialTimestamps);

                    // If any step timestamp is missing in database, save it
                    const missingTimestamps = {};
                    steps.forEach(step => {
                        if (!orderData.stepTimestamps?.[step.status]) {
                            missingTimestamps[step.status] = initialTimestamps[step.status];
                        }
                    });

                    if (Object.keys(missingTimestamps).length > 0) {
                        await axios.patch(`${backendUrl}/api/checkout/product-orders/${orderId}`, {
                            stepTimestamp: missingTimestamps
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching order timestamps:', error);
            }
        };
        fetchOrderTimestamps();
    }, [orderId, backendUrl, activeStep]);

    const formatDateTime = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleNext = async () => {
        try {
            setLoading(true);
            const nextStep = activeStep + 1;
            const currentStep = steps[nextStep - 1];
            const nextStepStatus = steps[nextStep - 1].status;
            const currentTime = new Date();

            // Update both status and timestamp
            const response = await axios.patch(`${backendUrl}/api/checkout/product-orders/${orderId}`, {
                status: nextStepStatus,
                ...(activeStep !== 0 && {
                    stepTimestamp: {
                        [currentStep.status]: currentTime
                    }
                })
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.data) {
                // Only update timestamps if not on the first step
                if (activeStep !== 0) {
                    setStepTimestamps(prev => ({
                        ...prev,
                        [currentStep.status]: currentTime
                    }));
                }
                setActiveStep(nextStep);
                // Call onStatusChange with next step's status
                onStatusChange(nextStepStatus);
            }
        } catch (error) {
            console.error('Error updating order step:', error);
            toast.error('Failed to update order status');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = async () => {
        try {
            setLoading(true);
            const prevStep = activeStep - 1;
            const currentStep = steps[prevStep];
            const currentTime = new Date();

            // Update both status and timestamp
            const response = await axios.patch(`${backendUrl}/api/checkout/product-orders/${orderId}`, {
                status: currentStep.status,
                stepTimestamp: {
                    [currentStep.status]: currentTime,
                    // Delete the timestamp of the step we're going back from
                    [steps[activeStep].status]: null,
                    [steps[prevStep].status]: null
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.data) {
                // Update local state
                setStepTimestamps(prev => ({
                    ...prev,
                    [currentStep.status]: currentTime,
                    [steps[activeStep].status]: null
                }));
                setActiveStep(prevStep);
                // Call onStatusChange with previous step's status
                onStatusChange(currentStep.status);
            }
        } catch (error) {
            console.error('Error updating order step:', error);
            toast.error('Failed to update order status');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        try {
            setLoading(true);
            const currentTime = new Date();
            const firstStep = steps[0];

            // Reset to first step and update both status and timestamp
            const response = await axios.patch(`${backendUrl}/api/checkout/product-orders/${orderId}`, {
                status: firstStep.status,
                stepTimestamp: {
                    [firstStep.status]: currentTime
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (response.data) {
                // Update local state
                setStepTimestamps(prev => ({
                    ...prev,
                    [firstStep.status]: currentTime
                }));
                setActiveStep(0);
                // Call onStatusChange with first step's status
                onStatusChange(firstStep.status);
            }
        } catch (error) {
            console.error('Error resetting order step:', error);
            toast.error('Failed to reset order status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label} disabled={orderStatus === 'Canceled'}>
                        <StepLabel
                            optional={
                                <Typography variant="caption" color="textSecondary">
                                    {stepTimestamps[step.status] ? formatDateTime(stepTimestamps[step.status]) : ''}
                                </Typography>
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                    disabled={index === steps.length - 1 || orderStatus === 'Canceled'}
                                >
                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                {index > 1 && orderStatus !== 'Delivered' && (
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={orderStatus === 'Canceled'}
                                    >
                                        Back
                                    </Button>
                                )}
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/* {activeStep === steps.length && orderStatus !== 'Refunded' && (
                <Paper round elevation={0} sx={{ p: 3 }}>
                    <Button onClick={handleReset} disabled={orderStatus === 'Canceled'}>
                        Reset
                    </Button>
                </Paper>
            )} */}

        </Box>
    );
};

export default OrderStepper;
