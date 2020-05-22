import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const MOCK_BLOG = {
  likes: 7,
  title: 'This is a great one!',
  author: 'Martti',
  url: 'https://www.test.com',
  user: {
    username: 'Tepi',
    name: 'Teppo Winnipeg',
    id: '5ec52b709d1d9390d859daa7',
  },
  id: '5ec69820cf84e2120661c866',
};

const renderBlog = (blog = MOCK_BLOG, removeBlogHandler = jest.fn(), updateBlogHandler = jest.fn()) => {
  return render(
    <Blog blog={blog} removeBlogHandler={removeBlogHandler} updateBlogHandler={updateBlogHandler} />,
  );
};

// to bypass window.confirm
window.confirm = jest.fn(() => true);

describe('<Blog />', () => {
  describe('content', () => {
    it('should render correct content with author and title', () => {
      const component = renderBlog();

      expect(component.container).toHaveTextContent('This is a great one!, written by: Martti');
    });

    it('should not render url, likes and user by default', () => {
      const component = renderBlog();

      expect(component.container).not.toHaveTextContent('url: https://www.test.com');
      expect(component.container).not.toHaveTextContent('likes: 7');
      expect(component.container).not.toHaveTextContent('added by: Teppo Winnipeg');
    });

    it('should render url, likes and user after clicking view details', () => {
      const component = renderBlog();
      const viewDetailsBtn = component.container.querySelector('button[data-test-details-btn]');

      fireEvent.click(viewDetailsBtn);

      expect(component.container).toHaveTextContent('url: https://www.test.com');
      expect(component.container).toHaveTextContent('likes: 7');
      expect(component.container).toHaveTextContent('added by: Teppo Winnipeg');
    });
  });

  describe('Like blog button', () => {
    it('should call removeBlogHandler once as many times as clicked', () => {
      const updateBlogHandler = jest.fn();
      const component = renderBlog(MOCK_BLOG, jest.fn(), updateBlogHandler);
      const viewDetailsBtn = component.container.querySelector('button[data-test-details-btn]');

      fireEvent.click(viewDetailsBtn);

      const likeBlogBtn = component.container.querySelector('[data-test-like-btn]');

      fireEvent.click(likeBlogBtn);
      expect(updateBlogHandler.mock.calls).toHaveLength(1);

      fireEvent.click(likeBlogBtn);
      expect(updateBlogHandler.mock.calls).toHaveLength(2);
    });
  });

  describe('Remove blog button', () => {
    it('should call removeBlogHandler once', () => {
      const removeBlogHandler = jest.fn();
      const component = renderBlog(MOCK_BLOG, removeBlogHandler);
      const viewDetailsBtn = component.container.querySelector('button[data-test-details-btn]');
      fireEvent.click(viewDetailsBtn);

      const removeBlogBtn = component.container.querySelector('button[data-test-remove-btn]');
      fireEvent.click(removeBlogBtn);

      expect(removeBlogHandler.mock.calls).toHaveLength(1);
    });
  });
});