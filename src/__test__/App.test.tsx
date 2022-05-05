import { act } from '@testing-library/react';
import App from '../App';
import { CountryDetails } from '../components/CountryDetails';
import { Home } from '../components/Home';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from '../utils/testUtils';

describe('Test App Router', () => {
    test('should render app componet', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByTestId('app-component-test-id');
    });

    test('should Render Home component with path "/"', () => {
        componentRenderByMemoryRouter('/', <Home />);
        toBeExpectByText('Weather App');
    });

    test('should render CountryDetails component with path "/details/:name"', () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            componentRenderByMemoryRouter('/details/BD', <CountryDetails />);
        });
        toBeExpectByText('Country Details');
    });
    test('should render 404 page', () => {
        componentRenderByMemoryRouter(
            '/details/BD/hjgsdfjghsdjfg',
            <App />
        );
        toBeExpectByText('404 Page Not Found');
    });
});
