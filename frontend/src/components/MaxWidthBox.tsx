import { Box } from "@mui/material";
import { ElementType, ReactNode } from "react";

type MinWidthBoxProps = {
    component?: ElementType,
    children: ReactNode;
    sx?: object;
}
export const MaxWidthBox = ({children, sx = {}, component}: MinWidthBoxProps) => (
     <Box
        {...(component && {component})}
        sx={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '2rem',
            ...sx
        }}
    >{children}</Box>
)