import { Box, Button, CardActions,  } from '@mui/material';
import { ActionType, useAppDispatch, useAppState } from '../AppProvider';
import { Link } from 'react-router-dom';
import { Book } from './Book';
import { MaxWidthBox } from './MaxWidthBox';

const BookList = () => {
  const {books} = useAppState();
  const dispatch = useAppDispatch();
  
  return (
    <MaxWidthBox
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
                  >Edit</Button>
                  <Button
                    size="small"
                    onClick={() => dispatch({
                      type: ActionType.SET_BOOK_TO_DELETE,
                      value: book
                    })}
                  >Delete</Button>
                </CardActions>
              }
            />
          </Box>
        ))}
      </Box>
    </MaxWidthBox>
  );
};

export default BookList;
