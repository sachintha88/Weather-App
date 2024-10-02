import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useWeatherStore } from '../Stores/weatherStore';
import useWeatherData from './hooks';
import OverviewController from './OverviewController';

// Mock the Zustand store
jest.mock('../Stores/weatherStore', () => ({
  useWeatherStore: jest.fn(),
}));

// Mock the custom hook
jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockWeatherStore = {
  currentWeatherData: null,
  city: '',
  setCity: jest.fn(),
};

const mockUseWeatherData = {
  loading: false,
  error: null,
  getWeatherData: jest.fn(),
  setLoading: jest.fn(),
};

describe('OverviewController', () => {
  beforeEach(() => {
    (useWeatherStore as jest.Mock).mockReturnValue(mockWeatherStore);
    (useWeatherData as jest.Mock).mockReturnValue(mockUseWeatherData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form and input field', () => {
    render(<OverviewController />);
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
  });

  test('calls setCity and getWeatherData on form submission', async () => {
    render(<OverviewController />);
    const input = screen.getByPlaceholderText('Enter city name');
    const button = screen.getByRole('button', { name: /get weather/i });

    fireEvent.change(input, { target: { value: 'New York' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWeatherStore.setCity).toHaveBeenCalledWith('New York');
      expect(mockUseWeatherData.getWeatherData).toHaveBeenCalled();
    });
  });

  test('displays loading spinner when loading', () => {
    (useWeatherData as jest.Mock).mockReturnValue({
      ...mockUseWeatherData,
      loading: true,
    });

    render(<OverviewController />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    (useWeatherData as jest.Mock).mockReturnValue({
      ...mockUseWeatherData,
      error: 'Failed to fetch weather data',
    });

    render(<OverviewController />);
    expect(
      screen.getByText('Failed to fetch weather data')
    ).toBeInTheDocument();
  });
});
