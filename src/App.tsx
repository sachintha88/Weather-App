import { QueryClientProvider } from '@tanstack/react-query';
import OverviewController from './OverviewController/OverviewController';
import ThemeProvider from './Theme/ThemeProvider';
import queryClient from './queryClient';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <OverviewController />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
