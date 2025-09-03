import apiClient from './client';

export function getAllMovies() {
  return apiClient.get('/movie/getall');
}

export function getUpcomingMovies() {
  return apiClient.get('/up/getall');
}
