import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from "../components/NavBar.jsx";

describe('NavBar', () => {

    //making sure navbar isn't visible on homescreen
    it('should not render on home screen ("/")', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <NavBar />
            </MemoryRouter>
        );

        const navbar = screen.queryByTestId('navbar');
        expect(navbar).toBeNull();
    });
});

