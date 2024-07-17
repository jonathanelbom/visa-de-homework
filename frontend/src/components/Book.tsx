import { Category, EventOutlined, MenuBookOutlined, PersonOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Book as BookType} from "../types";

type LineDisplayProps = {
    label: ReactNode;
    icon: ReactNode;
    fontWeight?: string
}

const LineDisplay = ({label, icon, fontWeight} : LineDisplayProps) => (
  <Box sx={{display: 'flex', flexWrap: 'nowrap', gap: 1}}>
    {icon}
    <Typography component="span" textAlign="start" lineHeight={1.25} {...(fontWeight && {fontWeight})}>{label}</Typography>
  </Box>
)

type BookProps = {
    book: BookType;
    actions: ReactNode
}

export const Book = ({book, actions} : BookProps) => {
    const {title, author, genre, published} = book || {};
    return (
        <Card sx={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, display: 'grid', gridRows: 4, gap: 1, padding: '16px !important'}}>
                <LineDisplay label={title} fontWeight="600" icon={<MenuBookOutlined fontSize="small" sx={{flexShrink: 0}} />}/>
                <LineDisplay label={author} icon={<PersonOutlined fontSize="small" sx={{flexShrink: 0}}/>} />
                <LineDisplay label={<i>{published}</i>} icon={<EventOutlined fontSize="small" sx={{flexShrink: 0}}/>}/>
                <LineDisplay label={genre} icon={<Category fontSize="small" sx={{flexShrink: 0}}/>}/>
            </CardContent>
            {!!actions && actions}
        </Card>
    );
};