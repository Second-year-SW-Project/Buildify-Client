import { Typography } from "@mui/material";
import Iconset from "../Icons/Iconset";
import theme from "../theme";

export function ProductCard({ name, type, src, id }) {
    return (
        <div className="flex items-center space-x-3">
            <div>
                <img className="max-w-20 max-h-20" src={src} alt="image" />
            </div>
            <div>
                <Typography variant="body2" fontWeight="bold" style={{
                    wordBreak: "break-word", // Allow breaking long words
                    whiteSpace: "normal", // Enable wrapping
                }}>{name}</Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">{type}</Typography>
            </div>
        </div>
    );
}

export function GameCard({ name, type, src }) {
    return (
        <div className="flex items-center space-x-3">
            <div>
                <img className="max-w-14 max-h-14" src={src} alt="image" />
            </div>
            <div>
                <Typography variant="body2" fontWeight="bold" style={{
                    wordBreak: "break-word", // Allow breaking long words
                    whiteSpace: "normal", // Enable wrapping
                }}>{name}</Typography>
            </div>
        </div>
    );
}

export function TopProductCard({ name, orderCount, src, sales, rate }) {
    return (
        <div className="flex flex-row items-center">
            <div className="flex justify-center items-center">
                <img className="max-w-16 max-h-16" src={src} alt="image" />
            </div>
            <div className="flex flex-col">
                <Typography variant="body2" fontWeight="bold" style={{
                    wordBreak: "break-word", // Allow breaking long words
                    whiteSpace: "normal", // Enable wrapping
                }}>{name}</Typography>
                <div className="flex flex-row items-center space-x-1">
                    <Iconset type="attachMoney" fontSize="30px" color="primary"></Iconset>
                    <Typography variant="caption" color="ternary">Sales: {sales} LKR</Typography>
                    <Iconset type="star" fontSize="30px" color="warning"></Iconset>
                    <Typography variant="caption" fontWeight="bold" >{rate}</Typography>
                </div>
            </div>
        </div>
    );
}