import axios from 'axios';
import { fetchPosts, fetchPostById } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API tests', () => {
  it('should fetch a list of posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Test Post 1' },
      { id: 2, title: 'Test Post 2' },
    ];

    // Mock axios.get to resolve with mock data
    mockedAxios.get.mockResolvedValue({ data: mockPosts });

    const posts = await fetchPosts();
    expect(posts).toEqual(mockPosts);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });

  it('should fetch a single post by ID', async () => {
    const mockPost = { id: 1, title: 'Test Post 1' };

    // Mock axios.get to resolve with mock data
    mockedAxios.get.mockResolvedValue({ data: mockPost });

    const post = await fetchPostById(1);
    expect(post).toEqual(mockPost);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
  });

});
