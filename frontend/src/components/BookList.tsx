import { Box, Button, CardActions,  } from '@mui/material';
import { ActionType, useAppDispatch, useAppState } from '../AppProvider';
import { Link } from 'react-router-dom';
import { Book } from './Book';
import { MaxWidthBox } from './MaxWidthBox';
import { Book as BookType} from '../types';
import { useMemo } from 'react';

type BookFields = 'title' | 'author' | 'genre' | 'published' | 'updated'
type SortFunc = (a: BookType, b: BookType) => number;

const ascending = (key: BookFields) => (a: BookType, b: BookType) => a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
const descending = (key: BookFields) => (a: BookType, b: BookType) => a[key].toLowerCase() > b[key].toLowerCase() ? -1 : 1;

const sortFuncMap: Record<string, (key: BookFields) => (a: BookType, b: BookType) => number > = {
  'title': ascending,
  'author': ascending,
  'genre': ascending,
  'published': ascending,
  'updated': descending,
}

const BookList = () => {
  const {books, sortedBy} = useAppState();
  const dispatch = useAppDispatch();

  const sortedBooks = useMemo(() => books.sort((sortFuncMap[sortedBy])(sortedBy as BookFields) as SortFunc), [sortedBy, books])
  
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
        {sortedBooks.map((book) => (
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
