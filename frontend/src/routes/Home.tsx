import { Box, Button } from '@mui/material';
import BookList from '../components/BookList';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { Sort } from '../components/Sort';

export const Home = () => {
    return (
        <Box component="main">
            <Header
            title="Books"
            action={
                <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: 2}}>
                    <Sort/>
                    <Button component={Link} to='/books/add' size='large' variant="outlined">Add</Button>
                </Box>
            }
            />
            <BookList />
        </Box>
    );
}