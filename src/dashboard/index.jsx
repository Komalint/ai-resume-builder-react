import React, {  useEffect } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = React.useState([]);

  const GetResumeList = () => {
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setResumeList(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching resume list:", err);
      });
  };

  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      
      {/* --- PREMIUM CENTERED LOGO WATERMARK --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Centered Logo with extremely low opacity */}
        <img 
          src="/logo.jpg" 
          alt="Watermark" 
          className="w-[30%] opacity-[0.4] grayscale select-none"
        />
        
        {/* Dynamic Mesh Glow for Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-violet-200/20 to-blue-100/20 blur-[140px]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-14">
        
        {/* GLASSMORPHIC HEADER: High-End & Stable */}
        <header className="sticky top-0 z-50 mb-16 p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                  </span>
                  AI Workspace
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                My <span className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent">Resumes</span>
              </h2>
              <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
                Refine your career narrative with our precision AI builder.
              </p>
            </div>

            {/* User Profile Component */}
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-50">
               <div className="h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center text-white text-xl font-bold">
                  {user?.firstName?.charAt(0) || 'H'}
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase">Administrator</p>
                  <p className="text-sm font-bold text-slate-800">{user?.fullName}</p>
               </div>
            </div>
          </div>
        </header>

        {/* RESUME GRID: Clean & Spaced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          <div className="hover:-translate-y-2 transition-transform duration-300">
            <AddResume />
          </div>
          {resumeList.map((resume, index) => (
            <div key={index} className="hover:-translate-y-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5" style={{ animationDelay: `${index * 50}ms` }}>
               <ResumeCardItem resume={resume} refreshData={GetResumeList} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
