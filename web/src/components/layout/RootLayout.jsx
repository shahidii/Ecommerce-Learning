import { lazy, Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import PageLoader from '@/components/feedback/PageLoader'
import AnnouncementBar from './AnnouncementBar'
import Footer from './Footer'
import Navbar from './Navbar'

// Development-only page switcher. In `pnpm build`, import.meta.env.DEV is false,
// so Vite drops this import and the bar never reaches the live site.
const PagePreviewBar = import.meta.env.DEV ? lazy(() => import('@/components/dev/PagePreviewBar')) : null

/** The frame around every page. <Outlet /> is where the current page renders. */
export default function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="pb-10">
        {/* Pages are lazy loaded: Suspense shows the loader while a page's code downloads */}
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {/* Scrolls to the top on new pages, and back to where you were on "Back" */}
      <ScrollRestoration />
      {PagePreviewBar && (
        <Suspense fallback={null}>
          <PagePreviewBar />
        </Suspense>
      )}
    </>
  )
}
