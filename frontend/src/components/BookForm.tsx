import { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Alert, Box, Button, TextField } from '@mui/material';
import { ActionType, useAppDispatch, useAppState } from '../AppProvider';
import { useNavigate, useParams } from 'react-router-dom';

type ErrorsType = Record<string, string | null>;

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

const isEmpty = (value: string) => value.trim() === '';
const notYearFormat = (value: string) => /\D/.test(value) || value.length !== 4;

const validate = (key: string, value: string) => {
	const emptyMessage = isEmpty(value)
		? `${labels[key].label} cannot be blank`
		: null;
	
	switch (key) {
		case 'title':
		case 'author':
		case 'genre':
			return emptyMessage;
		case 'published':
			if (emptyMessage) {
				return emptyMessage;
			}
			if (notYearFormat(value)) {
				return 'Year published must in the format YYYY'
			}
			return null;
		default:
			return null;
	}
}

const hasError = (errors: ErrorsType) => Object.values(errors).some((error) => !!error);

export const BookForm = ({mode}: {mode:string}) => {
	const { bookId } = useParams();
	const {books} = useAppState();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selectedBook = useMemo(() => books.find((b) => b.id === bookId) || {id: '', title: '', author: '', published: '', genre: ''}
	, [books, bookId])
	const {title, author, published, genre} = selectedBook;
	const [formErrors, setFormErrors] = useState<ErrorsType>({
			title: null,
			author: null,
			published: null,
			genre: null,
	})
	const [formValues, setFormValues] = useState({
			title,
			author,
			published,
			genre,
	})
  
	// populates form values and reset errors when refreshing a form page
	useEffect(() => {
			if (bookId && selectedBook) {
				setFormValues({
					title,
					author,
					published,
					genre,
				})

				setFormErrors({
					title: null,
					author: null,
					published: null,
					genre: null,
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

		if (formErrors[key]) {
			setFormErrors((prev) => ({
				...prev,
				[key]: null
			}))
		}
	}


	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		// validate data
        event.preventDefault();

		const _formErrors = {...formErrors};
		Object.entries(formValues).forEach(([key, value]) => {
			_formErrors[key] = validate(key, value);
		});
		// set form errors or send request
		if (hasError(_formErrors)) {
			setFormErrors(_formErrors);
		} else {
			sendData();
		}
	};

	const _hasError = useMemo(() => hasError(formErrors), [formErrors]);

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
					// if error, show error state and error message
					{...(formErrors[key] && {
						error: true,
						helperText: formErrors[key]
					})}
				/>
			))}
			</Box>
			
			<Box sx={{marginBlock: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2}}>
				{_hasError && (
					<Alert severity="error">Please fix the error(s) listed above.</Alert>
				)}
				<Button  variant="contained" type="submit">{`${mode === 'edit' ? 'Update' : 'Add'} Book`}</Button>				
			</Box>
		</form>
	);
};

