import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './home/index'
import Dashboard from './dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit'
import ViewResume from './my-resume/[resumeId]/view'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const router =createBrowserRouter([
  {
    
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/> 
      }
    ]
  },
  {
        path:'/',
        element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
  
  </StrictMode>
)
