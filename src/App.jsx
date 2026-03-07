import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteSettingsProvider } from './contexts/SiteSettingsContext'
import { MainContentProvider } from './contexts/MainContentContext'
import Nav from './components/common/Nav'
import Footer from './components/common/Footer'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import BoardPage from './pages/BoardPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <SiteSettingsProvider>
        <MainContentProvider>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </MainContentProvider>
      </SiteSettingsProvider>
    </BrowserRouter>
  )
}
