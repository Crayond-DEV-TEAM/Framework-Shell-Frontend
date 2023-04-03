import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@styles/globle.css';

import { lightTheme, theme } from '@core/theme';
import { queryClient } from '@core/utils/api';
import { Button, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import RouterApp from '@router';
// import * as Sentry from '@sentry/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { useMemo, useRef } from 'react';
import { SnacbarClose } from '../../../packages/ui/atoms/snacbarClose';
// function FallbackComponent() {
//   return <div>An error has occurred</div>;
// }

// const myFallback = <FallbackComponent />;

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
    // <Sentry.ErrorBoundary fallback={myFallback} showDialog>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={3000}
          action={(key) => <SnacbarClose key={key} />}
        />
        <CssBaseline />
        <RouterApp />
      </ThemeProvider>
    </QueryClientProvider>
    // </Sentry.ErrorBoundary>
  );
}

export default App;
