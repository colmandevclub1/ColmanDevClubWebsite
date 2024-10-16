import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider } from '@mui/material/styles';

import LandingRouter from './lib/landing/LandingRouter';
import ManageRouter from './lib/management/router';
import { theme } from './theme';

const queryClient = new QueryClient();
const manage = false;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {manage ? <ManageRouter /> : <LandingRouter />}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
