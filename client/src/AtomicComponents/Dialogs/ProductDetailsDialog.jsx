import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Typography,
    useMediaQuery,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme';
import axios from 'axios';

const ProductDetailsDialog = ({ open, onClose, productId }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Fetch product data when dialog opens
    useEffect(() => {
        if (open && productId) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${backendUrl}/api/product/${productId}`);
                    setProduct(response.data);
                    setMainImage(response.data?.imgUrls?.[0]?.url);
                    setError(null);
                } catch (err) {
                    setError("Failed to load product details");
                    console.error("Error fetching product:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [open, productId, backendUrl]);

    // Reset state when dialog closes
    useEffect(() => {
        if (!open) {
            setProduct(null);
            setMainImage(null);
            setError(null);
            setLoading(true);
        }
    }, [open]);

    // Product specification logic (same as Itempage.jsx)
    const getProductSpecs = (product) => {
        if (!product) return {};

        let specs = {};

        switch (product.type) {
            case "gpu":
                specs = {
                    spec1: "Brand:",
                    spec2: "Capacity:",
                    spec3: "PCI:",
                    spec4: "Series:",
                    spec5: "Power Connectors:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.vram + " GB",
                    z: product.interfaceType?.toUpperCase(),
                    p: product.series,
                    q: product.powerConnectors,
                    r: product.warranty
                };
                break;

            case "processor":
                specs = {
                    spec1: "Brand:",
                    spec2: "Cores:",
                    spec3: "Threads:",
                    spec4: "Boost Clock:",
                    spec5: "Socket Type:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.coreCount,
                    z: product.threadCount,
                    p: product.boostClock + " GHz",
                    q: product.socketType?.toUpperCase(),
                    r: product.warranty
                };
                break;

            case "ram":
                specs = {
                    spec1: "Brand:",
                    spec2: "Capacity:",
                    spec3: "Type:",
                    spec4: "Speed:",
                    spec5: "Cache:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.memoryCapacity + " GB",
                    z: product.memoryType?.toUpperCase(),
                    p: product.memorySpeed + " MHz",
                    q: product.memoryCapacity + " MB",
                    r: product.warranty
                };
                break;

            case "motherboard":
                specs = {
                    spec1: "Brand:",
                    spec2: "Socket Type:",
                    spec3: "Chipset:",
                    spec4: "Ram slots:",
                    spec5: "Memory Type:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.socketType?.toUpperCase(),
                    z: product.motherboardChipset,
                    p: product.ramSlots,
                    q: product.supportedMemoryTypes,
                    r: product.warranty
                };
                break;

            case "power":
                specs = {
                    spec1: "Brand:",
                    spec2: "Wattage:",
                    spec3: "Efficiency:",
                    spec4: "Modular Type:",
                    spec5: "",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.wattage + "W",
                    z: product.efficiencyRating?.toUpperCase(),
                    p: product.modularType?.toUpperCase(),
                    q: "",
                    r: product.warranty
                };
                break;

            case "storage":
                specs = {
                    spec1: "Brand:",
                    spec2: "Storage Type:",
                    spec3: "Capacity:",
                    spec4: "",
                    spec5: "",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.storageType?.toUpperCase(),
                    z: product.storageCapacity + "GB",
                    p: "",
                    q: "",
                    r: product.warranty
                };
                break;

            case "casing":
                specs = {
                    spec1: "Brand:",
                    spec2: "Supported Motherboard:",
                    spec3: "Max Gpu Length:",
                    spec4: "Max Cooler Height:",
                    spec5: "",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.supportedMotherboardSizes + " Models",
                    z: product.maxGpuLength + "mm",
                    p: product.maxCoolerHeight + "mm",
                    q: "",
                    r: product.warranty
                };
                break;

            case "laptop":
                specs = {
                    spec1: "Brand:",
                    spec2: "Ram:",
                    spec3: "Graphic Card:",
                    spec4: "Storage:",
                    spec5: "Refresh Rate:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.ram + " GB",
                    z: product.graphicCard?.toUpperCase(),
                    p: product.storage + "GB",
                    q: product.refreshRate + "Hz",
                    r: product.warranty
                };
                break;

            case "prebuild":
                specs = {
                    spec1: "Brand:",
                    spec2: "Ram:",
                    spec3: "Graphic Card:",
                    spec4: "Storage:",
                    spec5: "CPU:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.ramSize + " GB",
                    z: product.graphicCard?.toUpperCase(),
                    p: product.storage + " GB HDD",
                    q: product.cpu?.toUpperCase(),
                    r: product.warranty
                };
                break;

            case "monitor":
                specs = {
                    spec1: "Brand:",
                    spec2: "Display Size:",
                    spec3: "Resolution:",
                    spec4: "Panel Type:",
                    spec5: "Refresh Rate:",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.displaySize + "'inch",
                    z: product.resolution,
                    p: product.panelType?.toUpperCase(),
                    q: product.refreshRate + "Hz",
                    r: product.warranty
                };
                break;

            case "expansion_network":
                specs = {
                    spec1: "Brand:",
                    spec2: "Component Type:",
                    spec3: "Interface Type:",
                    spec4: "",
                    spec5: "",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: product.componentType?.toUpperCase(),
                    z: product.interfaceType?.toUpperCase(),
                    p: "",
                    q: "",
                    r: product.warranty
                };
                break;

            default:
                specs = {
                    spec1: "Brand:",
                    spec2: "",
                    spec3: "",
                    spec4: "",
                    spec5: "",
                    spec6: "Warranty:",
                    x: product.manufacturer?.toUpperCase(),
                    y: "",
                    z: "",
                    p: "",
                    q: "",
                    r: product.warranty
                };
                break;
        }

        return specs;
    };

    const specs = getProductSpecs(product);

    if (loading) {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullScreen={fullScreen}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <Typography>Loading product details...</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }

    if (error) {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullScreen={fullScreen}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <Typography color="error">{error}</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }

    if (!product) {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullScreen={fullScreen}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <Typography>Product not found</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: fullScreen ? 0 : 2,
                    maxHeight: '90vh',
                    maxWidth: '50vw',
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div">
                    Product Details
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    {/* Image Section */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Main Image */}
                        <Box
                            sx={{
                                border: 1,
                                borderColor: 'grey.300',
                                borderRadius: 2,
                                p: 2,
                                width: { xs: '100%', md: 300 },
                                height: 300,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2
                            }}
                        >
                            <img
                                src={mainImage || product?.imgUrls?.[0]?.url || "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421085/graph1_zqumzj.png"}
                                alt={product.name}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>

                        {/* Thumbnail Images */}
                        {product?.imgUrls && product.imgUrls.length > 1 && (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                                {product.imgUrls.slice(0, 4).map((img, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            border: 1,
                                            borderColor: mainImage === img.url ? 'primary.main' : 'grey.300',
                                            borderRadius: 1,
                                            p: 0.5,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: 'primary.main'
                                            }
                                        }}
                                        onClick={() => setMainImage(img.url)}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`${product.name} ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Details Section */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
                            {product.name}
                        </Typography>

                        {/* Specifications */}
                        <Box sx={{ mb: 3 }}>
                            {specs.spec1 && specs.x && (
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Box component="span" fontWeight="bold">{specs.spec1}</Box> {specs.x}
                                </Typography>
                            )}
                            {specs.spec2 && specs.y && (
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Box component="span" fontWeight="bold">{specs.spec2}</Box> {specs.y}
                                </Typography>
                            )}
                            {specs.spec3 && specs.z && (
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Box component="span" fontWeight="bold">{specs.spec3}</Box> {specs.z}
                                </Typography>
                            )}
                            {specs.spec4 && specs.p && (
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Box component="span" fontWeight="bold">{specs.spec4}</Box> {specs.p}
                                </Typography>
                            )}
                            {specs.spec5 && specs.q && (
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Box component="span" fontWeight="bold">{specs.spec5}</Box> {specs.q}
                                </Typography>
                            )}
                            {specs.spec6 && specs.r && (
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <Box component="span" fontWeight="bold">{specs.spec6}</Box> {specs.r} Years
                                </Typography>
                            )}
                        </Box>

                        {/* Price */}
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                            {product.price} LKR
                        </Typography>

                        {/* Stock Status */}
                        <Chip
                            label={product.quantity > 10 ? "In Stock" : product.quantity > 0 ? "Low Stock" : "Out of Stock"}
                            color={product.quantity > 10 ? "primary" : product.quantity > 0 ? "info" : "error"}
                            sx={{ mb: 2 }}
                        />

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailsDialog;
