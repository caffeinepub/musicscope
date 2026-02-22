import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { PlayerProvider } from './contexts/PlayerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const rootRoute = createRootRoute({
  component: () => (
    <PlayerProvider>
      <Layout>
        <Outlet />
      </Layout>
    </PlayerProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const artistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/artists',
  component: Artists,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: Search,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  artistsRoute,
  searchRoute,
  dashboardRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
