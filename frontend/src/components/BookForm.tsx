import { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { ActionType, useAppDispatch, useAppState } from '../AppProvider';
import { useNavigate, useParams } from 'react-router-dom';

const labels: Record<string, {label: string}> = {
  title: {
    label: 'Title',
  },
  author: {
    label: 'Author',
  },
  published: {
    label: 'Year published'
  },
  genre: {
    label: 'Genre'
  },
}

export const BookForm = ({mode}: {mode:string}) => {
	const { bookId } = useParams();
	const {books} = useAppState();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selectedBook = useMemo(() => books.find((b) => b.id === bookId) || {id: '', title: '', author: '', published: '', genre: ''}
	, [books, bookId])
	const {title, author, published, genre} = selectedBook;
	const [formValues, setFormValues] = useState({
			title,
			author,
			published,
			genre,
	})
  
	// populates form values when refreshing the edit page
	useEffect(() => {
			if (bookId && selectedBook) {
				setFormValues({
					title,
					author,
					published,
					genre,
				})
			}
	}, [books, selectedBook]);

	const sendData = async () => {
		const isEdit = mode === 'edit';
		const actionType = isEdit ? ActionType.UPDATE_BOOK : ActionType.ADD_BOOK;
		try {
			const response = isEdit
				? await axios.put(`/api/books/${selectedBook.id}`, { ...formValues })
				: await axios.post('/api/books', { ...formValues })
			dispatch({
				type: actionType,
				value: response.data
			});
			navigate('/');
		} catch (error) {
			console.error('There was an error adding the book!', error);
		}
	}

	const handleChange = (value: string, key: string) => {
		setFormValues((prev) => {
			return {
				...prev,
				[key]: value,
			};
		})
	}


	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: validate and show errors
		
		sendData()

	};

	return (
		<form onSubmit={handleSubmit} id="edit-add-book">
			<Box sx={{
				display: 'grid', gap: 2, gridTemplateColumns: ['1fr', '1fr', '1fr 1fr']
			}}>
			{Object.entries(formValues).map(([key, value]) => (
				<TextField
					key={key}
					fullWidth
					inputProps={{ sx: {backgroundColor: '#fff' }}}
					id={`${key}-entry`}
					label={labels[key].label || 'Label missing'}
					value={value}
					onChange={({target}) => {
						handleChange(target.value, key);
					}}
				/>
			))}
			</Box>
			
			<Button  variant="contained" type="submit">{`${mode === 'edit' ? 'Update' : 'Add'} Book`}</Button>				
		</form>
	);
};
