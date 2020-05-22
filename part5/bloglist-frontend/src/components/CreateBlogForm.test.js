import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlogForm from './CreateBlogForm';

const createTargetObj = (value) => ({
  target: { value },
});

describe('<CreateBlogForm />', () => {
  it('should call the submit handler with correct inputs', () => {
    const createBlogHandler = jest.fn();

    const component = render(
      <CreateBlogForm createBlogHandler={createBlogHandler} />,
    );

    const titleInput = component.getByLabelText('Title');
    const authorInput = component.getByLabelText('Author');
    const urlInput = component.getByLabelText('Url');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, createTargetObj('Read this'));
    fireEvent.change(authorInput, createTargetObj('Jamo'));
    fireEvent.change(urlInput, createTargetObj('https://www.mock.com'));
    fireEvent.submit(form);

    expect(createBlogHandler.mock.calls).toHaveLength(1);
    expect(createBlogHandler.mock.calls[0][0]).toEqual({
      title: 'Read this',
      author: 'Jamo',
      url: 'https://www.mock.com',
    });
  });
});