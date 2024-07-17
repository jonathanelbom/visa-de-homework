import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { AppProvider } from './AppProvider.tsx';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					'html, body': {
						margin: 0,
						backgroundColor: '#f5f3f2',
						minHeight: '100vh',
					},
				}}
			/>
				<AppProvider>
					<App />
				</AppProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
