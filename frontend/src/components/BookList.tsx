import { Box, Button, CardActions,  } from '@mui/material';
import { useAppState } from '../AppProvider';
import { Link } from 'react-router-dom';
import { Book } from './Book';
import { MinWidthBox } from './MinWidthBox';

const BookList = () => {
  const {books} = useAppState();
  
  return (
    <MinWidthBox
      component="section"
    >
      <Box
        component="ul"
        sx={{
          padding: 0,
          margin: 0,
          listStyleType: 'none',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat( auto-fit, minmax(220px, 1fr) )',
        }}
      >
        {books.map((book) => (
          <Box component='li' key={book.id} >
            <Book
              book={book}
              actions={
                <CardActions sx={{flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <Button component={Link} size="small"
                    to={`books/${book.id}`}
                    sx={{
                      position: 'static',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                      }
                    }}
                  >Edit</Button>
                  <Button
                    size="small"
                  >Delete</Button>
                </CardActions>
              }
            />
          </Box>
        ))}
      </Box>
    </MinWidthBox>
  );
};

export default BookList;
