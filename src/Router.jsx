import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Jungle from './pages/jungle/Jungle'
import Zoo from './pages/zoo/Zoo'
import ErrorPage from './components/ErrorPage'
import IntroVideo from './pages/IntroVideo'
import AllCourses from './pages/AllCourses'
import ScrollToTop from './components/ScrollToTop'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import SelectAge from './pages/SelectAge'
import Dashboard from './pages/Dashboard'
import Leaderboard from './pages/Leaderboard'
import ComingSoon from './pages/ComingSoon'
import ProtectedRoute from './components/ProtectedRoute'

// ✅ common wrapper bana diya (clean code)
const withLayout = (Component) => (
  <>
    <ScrollToTop />
    {Component}
  </>
)

const Router = createBrowserRouter([
  {
    path: "/",
    element: withLayout(<Home />),
    errorElement: <ErrorPage />
  },
  {
    path: "/courses",
    element: withLayout(<Courses />),
    errorElement: <ErrorPage />
  },
  {
    path: "/intro",
    element: withLayout(<IntroVideo />),
    errorElement: <ErrorPage />
  },
  {
    path: "/all-courses",
    element: withLayout(<AllCourses />),
    errorElement: <ErrorPage />
  },
  {
    path: "/courses/zoo",
    element: withLayout(
      <ProtectedRoute>
        <Zoo />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/courses/jungle",
    element: withLayout(
      <ProtectedRoute>
        <Jungle />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/sign-in/*",
    element: withLayout(<SignInPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up/*",
    element: withLayout(<SignUpPage />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/select-age",
    element: withLayout(
      <ProtectedRoute>
        <SelectAge />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: withLayout(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/leaderboard",
    element: withLayout(
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/courses/coming-soon",
    element: withLayout(
      <ProtectedRoute>
        <ComingSoon />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
], {
  basename: "/EduQuest/" // ✅ correct (for GitHub Pages / subfolder deploy)
});

export default Router;