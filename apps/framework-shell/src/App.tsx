import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@styles/globle.css';

import { lightTheme, theme } from '@core/theme';
import { queryClient } from '@core/utils/api';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import RouterApp from '@router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { useMemo } from 'react';

function App() {
  const muiTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode: 'light',
          ...(lightTheme?.palette ?? {}),
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={3000}
        />
        <CssBaseline />
        <RouterApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
