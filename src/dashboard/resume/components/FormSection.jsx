import React, { useContext, useEffect, useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, HomeIcon, LayoutGrid, LoaderPinwheel } from 'lucide-react'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import { Link, Navigate, useParams } from 'react-router-dom'
import ResumeInfoContext from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import Skills from './forms/Skills'
import Project from './forms/Project'
import ThemeColor from './ThemeColor'



const FormSection = () => {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  

  useEffect(() => {
    // Force the populate so Experience/Education aren't empty
    GlobalApi.GetResumeById(params.resumeId + "?populate=*").then(res => {
      setResumeInfo({
        id: res.data.data.id,
        ...res.data.data,
      });
      // Data is now officially in context
    });
  }, [params.resumeId]);

  // FIX: Don't render the forms until Strapi data is ready



  return (
    <div >

      <div className='flex justify-between items-center' >
        <div className='flex gap-2'>
         <Link to={"/dashboard"}>
          <Button  className=" bg-purple-600"><Home/></Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 &&
            <Button className='mr-2 flex gap-2 bg-purple-600' size="sm"
              onClick={() => {
                setActiveFormIndex(activeFormIndex - 1)
              }}><ArrowLeft /></Button>}
          <Button
            disabled={!enableNext}
            className='flex gap-2 bg-purple-600' size="sm"
            onClick={() => {
              setActiveFormIndex(activeFormIndex + 1)
            }}> Next <ArrowRight /></Button>
        </div>
      </div>

      {/* Personal Details */}
      {activeFormIndex == 1 ? <PersonalDetail enableNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ? <Summary enableNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 3 ? <Experience enableNext={(v) => setEnableNext(v)} />
            : activeFormIndex == 4 ? <Education enableNext={(v) => setEnableNext(v)} />
              : activeFormIndex == 5 ? <Skills enableNext={(v) => setEnableNext(v)} />
              : activeFormIndex == 6 ? <Project enableNext={(v) => setEnableNext(v)} />
              : activeFormIndex == 7 ? <Navigate to={`/my-resume/${params.resumeId}/view`}/>
                : null}


      {/* Summary Section */}



      {/* Experience Section */}


      {/* Education Section */}


      {/* Project Section */}


      {/* Skills Section */}

    </div>
  )
}

export default FormSection
