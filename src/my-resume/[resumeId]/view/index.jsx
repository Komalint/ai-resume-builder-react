import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumeInfoContext from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'

import { Download, Share2, Sparkles } from 'lucide-react'

const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp.data.data)
        })
    }

    const Handledownload = () => {
        window.print();
    }

    // New Native Share Function
    const HandleShare = () => {
        const shareData = {
            title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
            text: "Hello Everyone, This is my professional resume. Please open the URL to view.",
            url: window.location.href, // Uses current page URL
        };

        if (navigator.share) {
            navigator.share(shareData).catch((err) => console.log('Error sharing', err));
        } else {
            // Fallback: Copy to clipboard if Share API is not supported
            navigator.clipboard.writeText(shareData.url);
            alert("Link copied to clipboard!");
        }
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print" className="relative bg-[#F8FAFC] min-h-[60vh]">
                <Header />
                
                {/* --- BACKGROUND DECOR --- */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-100/40 blur-[120px] rounded-full" />
                    <img src="/logo.png" className="absolute top-40 left-1/2 -translate-x-1/2 w-32 opacity-[0.03] grayscale" />
                </div>

                <div className='relative z-10 mt-10 pb-10 mx-6 md:mx-20 lg:mx-36'>
                    <div className='bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-purple-100/50 rounded-3xl p-10 md:p-16 text-center transition-all'>
                        
                        {/* Success Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-600 text-sm font-bold uppercase tracking-wider mb-6">
                            <Sparkles className="h-4 w-4" />
                            Optimization Complete
                        </div>

                        <h2 className='text-3xl md:text-5xl font-black tracking-tight text-slate-900'>
                            Congratulations! Your <span className='bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent'>AI-Powered Resume</span> is Ready
                        </h2>
                        
                        <p className='text-slate-500 mt-6 text-lg max-w-2xl mx-auto font-medium leading-relaxed'>
                            Your professional profile has been optimized for ATS and recruiters. 
                            Download your document or share your unique link directly.
                        </p>
                        
                        <div className='flex flex-col sm:flex-row justify-center gap-6 mt-10'>
                            <Button 
                                onClick={Handledownload}
                                className="px-10 py-7 text-lg font-bold shadow-xl shadow-purple-200 hover:shadow-purple-300 transition-all hover:-translate-y-1 flex gap-3 bg-purple-600 hover:bg-purple-700"
                            >
                                <Download className="h-6 w-6" />
                                Download PDF
                            </Button>

                            {/* Standard Button without RWebShare wrapper */}
                            <Button 
                                onClick={HandleShare}
                                variant="outline" 
                                className="px-10 py-7 text-lg font-bold border-2 border-slate-200 bg-white hover:bg-slate-50 transition-all hover:-translate-y-1 flex gap-3 text-slate-700"
                            >
                                <Share2 className="h-6 w-6" />
                                Share Resume
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Preview Area */}
            <div id="print-area" className="bg-[#F8FAFC]  animate-in fade-in zoom-in duration-700">
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume