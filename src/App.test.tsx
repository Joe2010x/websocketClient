import React from 'react';
import { render, fireEvent, RenderResult, act} from '@testing-library/react';
import App from './App';
import { get } from 'https';

test('clicking the second child of div with id "colorBar" changes the background color of the first child of div with className "inputBox" to yellow', () => {
    
const { getByText, getByTestId }: RenderResult = render(<App />);
const colorBar = getByTestId('colorBar');
const secondColor: HTMLElement = colorBar.children[1] as HTMLElement;
const inputBox = getByTestId('inputDiv');

act(() => {
  fireEvent.click(secondColor);
});
expect(inputBox).toHaveStyle({ backgroundColor: "#ffcc70" });
});

