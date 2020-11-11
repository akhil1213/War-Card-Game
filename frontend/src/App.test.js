import React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import App from './App';
import Game from '../Game'
import "@testing-library/jest-dom"

afterEach(() => {
  cleanup()
});
test('one turn of game removes one card from each player', () => {
  render(<Game />);
  fireEvent.click(screen.getByTestId("playButton"))
  expect(screen.getByTestId("usersDeckLength").innerHTML).toBe("25")
  expect(screen.getByTestId("compDeckLength").innerHTML).toBe("25")
})
test('user types in credentials and clicks login', () => {
  render(<App />);
  const usernameNode = screen.getByPlaceholderText("Enter Username*")
  const passwordNode = screen.getByPlaceholderText("Enter Password*")
  fireEvent.change(usernameNode, { target: { value: 'test' } })
  fireEvent.change(passwordNode, { target: { value: 'Test123' } })
  expect(usernameNode.value).toBe('test')
  expect(passwordNode.value).toBe('Test123')
  const setLoginButton = screen.getByTestId("setLogin")
  const loginButton = screen.getByTestId("login")
  fireEvent.click(setLoginButton)
  fireEvent.click(loginButton)
});
