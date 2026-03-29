import '@testing-library/jest-dom';

jest.mock('react-chartjs-2', () => ({
    Pie: () => <div data-testid="mock-pie-chart">Mock Pie Chart</div>,
    Bar: () => <div data-testid="mock-bar-chart">Mock Bar Chart</div>,
    Line: () => <div data-testid="mock-line-chart">Mock Line Chart</div>,
}));

jest.mock('chart.js', () => ({
    Chart: {
        register: jest.fn(),
    },
    ArcElement: {},
    Tooltip: {},
    Legend: {},
}));