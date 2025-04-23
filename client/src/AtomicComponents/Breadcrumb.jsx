import React from "react";
import { styled } from "@mui/material/styles";
import theme from "./theme";

const BreadcrumbLink = styled("a")(({ theme }) => ({
    textDecoration: "none",
    transition: "color 0.3s ease-in-out",
    "&:hover": {
        color: theme.palette.primary700.main, // Uses primary700 for hover effect
    },
}));

const BreadcrumbText = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export default function CustomBreadcrumbs({ paths }) {

    return (
        <nav className="text-lg flex flex-wrap items-center mt-1 gap-2 ml-0.5">
            {paths.map((path, index) => (
                <span key={index} className="flex items-center">
                    {index !== 0 && (
                        <span style={{ color: theme.palette.primary.main }} className="mx-2">
                            {"•"}
                        </span>
                    )}
                    {path.href ? (
                        <BreadcrumbLink href={path.href}>
                            {path.label}
                        </BreadcrumbLink>
                    ) : (
                        <BreadcrumbText>
                            {path.label}
                        </BreadcrumbText>
                    )}
                </span>
            ))}
        </nav>
    );
}
