import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResumeInfoContext from '@/context/ResumeInfoContext'
import { LoaderPinwheel, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'


const formField = {
  degree: '',
  stream: '',
  institute: '',
  city: '',
  state: '',
  year: '',
  score: ''
}

const Education = ({ enableNext }) => {

  const [educationList, setEducationList] = useState([formField]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationList([...educationList, formField]);
  }
  const RemoveEducation = () => {
    setEducationList(educationList.slice(0, -1));
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationList.map(({id, ...rest}) =>{rest})
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false);
      toast('Detail saved successfully!')
      enableNext(true);
    }, (error) => {
      setLoading(false);
      console.log(error)
      toast('Server Error, Please try again!')
    })
  }

// 1. Load data FROM context INTO local state on mount
  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationList(resumeInfo.education);
    }
  }, []); // Run only once on mount

  // 2. Sync local state TO context ONLY if it contains actual data
  useEffect(() => {
    if ( educationList.length > 0 &&  educationList[0].institute !== '' ) {
      setResumeInfo(prev => ({
        ...prev,
        education: educationList
      }));
      //enableNext(false);
    }
  }, [educationList]);

  





  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className='p-5 shadow-lg rounded-lg border-t-4 border-t-purple-600  mt-10'>
        <h2 className='font-bold text-lg'>Eductaion</h2>
        <p>Add Your education details</p>

        <div>
          {educationList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                <div className='col-span-2'>
                  <label className='block mb-2 mt-4 text-xs'>Institute</label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.institute || ""} required name='institute' placeholder='University/Collage/School'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className='col-span-2'>
                  <label className='block mb-2 mt-4 text-xs'>Degree / Qualification</label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.degree || ""} required name='degree' placeholder="e.g. 10th or B.Tech"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className='col-span-2'>
                  <label className='block mb-2 mt-4 text-xs'>Stream / Specialization</label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.stream || ""} required name='stream'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className=''>
                  <label className='block mb-2 mt-4 text-xs'>City</label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.city || ""} required name='city'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className=''>
                  <label className='block mb-2 mt-4 text-xs'>State</label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.state || ""} required name='state'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className=''>
                  <label className='block mb-2 mt-4 text-xs'>Passing Year</label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.year || ""} required name='year'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className=''>
                  <label className='block mb-2 mt-4 text-xs'>Grade / Score
                    <span className='ml-1 text-[10px] text-gray-600 italic'> *( CGPA or '%' )</span></label>
                  <Input className='w-full border px-3 py-2 rounded-md'
                    value={item?.score || ""} required name='score'
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-between '>
          <div className='flex gap-2'>
            <Button variant='outline' className='text-purple-600'
              onClick={RemoveEducation} ><Trash2 /> Remove </Button>
            <Button variant='outline' className='text-purple-600'
              onClick={AddNewEducation} > + Add Education</Button>
          </div>

          <Button type="submit" disabled={loading}
            className="border-purple-600">
            {loading ? <LoaderPinwheel className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>

    </div>
  )
}

export default Education
