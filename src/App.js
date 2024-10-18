import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';

import LandingRouter from './lib/landing/LandingRouter';
import ManageRouter from './lib/management/router';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const manage = false;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {manage ? <ManageRouter /> : <LandingRouter />}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
