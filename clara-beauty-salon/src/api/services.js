import apiClient from './client'

/**
 * API untuk layanan salon
 */
export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  getById: (id) => apiClient.get(`/services/${id}`),
  getByCategory: (category) => apiClient.get(`/services?category=${category}`),
}

/**
 * API untuk booking / reservasi
 */
export const bookingAPI = {
  create: (data) => apiClient.post('/bookings', data),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  cancel: (id) => apiClient.patch(`/bookings/${id}/cancel`),
}

/**
 * API untuk testimoni
 */
export const testimonialsAPI = {
  getAll: (params = {}) => apiClient.get('/testimonials', { params }),
  create: (data) => apiClient.post('/testimonials', data),
}

/**
 * API untuk galeri
 */
export const galleryAPI = {
  getAll: (params = {}) => apiClient.get('/gallery', { params }),
  getByCategory: (category) => apiClient.get(`/gallery?category=${category}`),
}

/**
 * API untuk kontak / pesan
 */
export const contactAPI = {
  send: (data) => apiClient.post('/contact', data),
}
