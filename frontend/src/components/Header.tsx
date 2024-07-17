import { Box, Typography } from "@mui/material"
import { ReactNode } from "react";
import { MinWidthBox } from "./MinWidthBox";

type HeaderProps = {
    title: string;
    action: ReactNode;
    
}

export const Header = ({title, action}: HeaderProps) => {
    return (
        <Box
            component="header"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: '#fdfbfa',
                borderBlockEnd: '1px solid #a5a3a2',
            }}
        >
            <MinWidthBox
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 4,
                }}
            >
                <Typography variant="h4" component="h1" >{title}</Typography>
                {!!action && action}
            </MinWidthBox>
        </Box>
    )
}