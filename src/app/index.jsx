import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ROUTES } from '../shared/config/routes'
import { BackgroundDecor, CustomCursor, DevReset } from '../shared/ui'
import { GeneralPage } from '../pages/general'
import { FirstPage } from '../pages/first'
import { SecondPage } from '../pages/second'

function AnimatedRoutes() {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const leaving = location.pathname !== shown.pathname

  const onEnd = (e) => {
    if (!leaving || e.target !== e.currentTarget) return
    setShown(location)
    window.scrollTo(0, 0)
  }

  return (
    <div className={leaving ? 'animate-fade-out' : 'animate-page-in'} onAnimationEnd={onEnd}>
      <Routes location={shown}>
        <Route path={ROUTES.general} element={<GeneralPage />} />
        <Route path={ROUTES.first} element={<FirstPage />} />
        <Route path={ROUTES.second} element={<SecondPage />} />
      </Routes>
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <BackgroundDecor />
      <CustomCursor />
      <DevReset />
    </BrowserRouter>
  )
}
