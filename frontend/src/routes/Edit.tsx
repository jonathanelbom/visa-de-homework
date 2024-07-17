import { Box, Button } from '@mui/material';
import {BookForm} from '../components/BookForm';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { MaxWidthBox } from '../components/MaxWidthBox';

export const Edit = () => {
  return (
     <Box component="main">
        <Header title="Edit" action={<Button component={Link} to="/" size='large' variant="outlined">Back</Button>}/>
        <MaxWidthBox
            component="section"
        >
            <BookForm mode="edit"/>
        </MaxWidthBox>
    </Box>
  );
}