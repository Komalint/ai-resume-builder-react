import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ResumeInfoContext from '@/context/ResumeInfoContext';
import { LoaderPinwheel } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from "sonner"

const PersonalDetail = ({ enableNext }) => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.firstName && resumeInfo?.lastName && resumeInfo?.jobTitle) {
      enableNext(true);
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update global context for the preview
    setResumeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

    

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then((res) => {
      console.log("Resume updated successfully:", res.data);
      enableNext(true);
      toast("Details saved successfully!", { type: "success" });
    }).catch((err) => {
      console.error("Error updating resume:", err);
    }).finally(() => {
      setLoading(false);
    });

  }


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-purple-600  mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get started with basic information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='block mb-2 mt-4 text-sm'>First Name</label>
            <Input className='w-full border px-3 py-2 rounded-md'
              value={resumeInfo.firstName || ""}
              required name='firstName'
              onChange={handleInputChange} />
          </div>
          <div>
            <label className='block mb-2 mt-4 text-sm'>Last Name</label>
            <Input className='w-full border px-3 py-2 rounded-md'
            value={resumeInfo?.lastName || ""}
              required name='lastName'
              onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='block mb-2 mt-4 text-sm'>Job Title</label>
            <Input className='w-full border px-3 py-2 rounded-md'
            value={resumeInfo?.jobTitle || ""}
              required name='jobTitle'
              onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='block mb-2 mt-4 text-sm'>Address</label>
            <Input className='w-full border px-3 py-2 rounded-md'
            value={resumeInfo?.address || ""}
              required name='address'
              onChange={handleInputChange} />
          </div>
          <div>
            <label className='block mb-2 mt-4 text-sm'>Mobile No.</label>
            <Input className='w-full border px-3 py-2 rounded-md'
            value={resumeInfo?.phone || ""}
              required name='phone'
              type="tel" pattern="[0-9+ ]{10}"
              onChange={handleInputChange} />
          </div>
          <div>
            <label className='block mb-2 mt-4 text-sm'>Email</label>
            <Input className='w-full border px-3 py-2 rounded-md'
            value={resumeInfo?.email || ""}
              required name='email'
              onChange={handleInputChange} />
          </div>
          <div className='col-span-2 flex justify-end gap-4'>
            <Button type="button" variant='outline' className='mt-6 '>Reset</Button>
            <Button type="submit"
              disabled={loading} className='mt-6 bg-purple-600'>
              {loading ? <LoaderPinwheel className='animate-spin ' /> : 'Save & Continue'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail
