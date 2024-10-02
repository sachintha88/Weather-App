import OverviewController from './OverviewController/OverviewController';
import ThemeProvider from './Theme/ThemeProvider';

function App() {
  return (
    <>
      <ThemeProvider>
        <OverviewController />
      </ThemeProvider>
    </>
  );
}

export default App;
