import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Root route dengan Layout wrapper
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  notFoundComponent: NotFound,
})

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/layanan',
  component: Services,
})

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/galeri',
  component: Gallery,
})

const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/testimoni',
  component: Testimonials,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kontak',
  component: Contact,
})

export const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  galleryRoute,
  testimonialsRoute,
  contactRoute,
])
