import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center my-20'>
      {/* Use a relative path so it works on both localhost and Vercel */}
      <SignIn forceRedirectUrl={'/'} />
    </div>
  )
}

export default SignInPage