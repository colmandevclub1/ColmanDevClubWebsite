import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from './context/RouterContext';

const queryClient = new QueryClient();

const App = () => {
  const { currentRouter } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {currentRouter.router}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
