import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (

    <div>
    <h3 className=' font-bold text-lg uppercase'   style={{ color: resumeInfo?.themeColor , fontFamily: "Roboto, sans-serif" }}>Summary</h3>
    <hr className='border-t-2 border-black my-0.5' style={{ borderColor: resumeInfo?.themeColor }} />
    <div className='mt-1.5 '>
      <p className=' text-sm text-gray-700 leading-[1.2] ' style={{ fontFamily: "Google Sans, sans-serif" }}>{resumeInfo?.summary } </p>       
    </div>
    <hr className='my-3' />
    </div>
  )
}

export default SummaryPreview
