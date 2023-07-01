import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';

describe('Home', () => {
    it('should render top 50 chart buttons for both songs and albums', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const albumButton = screen.getByAltText('albumchart');
        const songButton = screen.getByAltText('songchart');

        expect(albumButton).toBeInTheDocument();
        expect(songButton).toBeInTheDocument();
    });
});