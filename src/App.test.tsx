import React from 'react';
import { render, fireEvent, RenderResult, act} from '@testing-library/react';
import App from './App';
import { get } from 'https';

test('clicking the second color of div with id "colorBar" changes the background color of the div "inputBox" to "#ffcc70"', () => {
    
const { getByText, getByTestId }: RenderResult = render(<App />);
const colorBar = getByTestId('colorBar');
const secondColor: HTMLElement = colorBar.children[1] as HTMLElement;
const inputBox = getByTestId('inputDiv');

act(() => {
  fireEvent.click(secondColor);
});
expect(inputBox).toHaveStyle({ backgroundColor: "#ffcc70" });
});

