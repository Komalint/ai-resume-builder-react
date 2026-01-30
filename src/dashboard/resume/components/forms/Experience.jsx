import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { LoaderPinwheel, Trash2 } from 'lucide-react';
import ResumeInfoContext from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';



const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: null,
    endDate: null,
    workSummary: '',
};

const Experience = ({ enableNext }) => {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    const [loading, setLoading] = useState(false)
    const [experienceList, setExperienceList] = useState([
        formField
    ]);

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
        setLoading(false)
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, formField]);
    }
    const RemoveExperience = () => {
        setExperienceList(experienceList.slice(0, -1));
    }

    const handleRichTextEditor = (value, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = value;
        setExperienceList(newEntries);

    };

    useEffect(() => {
        // ONLY update context if the local experienceList actually has content.
        // This prevents the initial empty state from clearing the database data.
        if (experienceList.length > 0 && experienceList[0].title !== '') {
            setResumeInfo(prev => ({
                ...prev,
                experience: experienceList
            }));

        }
    }, [experienceList]);

    // Add a second useEffect to load data FROM context INTO local state
    useEffect(() => {
        if (resumeInfo?.experience?.length > 0 && experienceList[0].title === '') {
            setExperienceList(resumeInfo.experience);
            enableNext(true)
        }
    }, [resumeInfo]);


    const onSave = async (e) => {
        e.preventDefault();
    
        setLoading(true);

        const data = {
            data: {
                experience: experienceList.map(({ id, ...rest }) => ({
                ...rest,
                startDate: rest.startDate || '',
                endDate: rest.endDate || '',
            })),
            },
        };

        try {
            await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            toast("Experience saved successfully!", { type: "success" });
            enableNext(true);
        } catch (error) {
            console.error("Error saving experience:", error);
            toast("Failed to save experience");
        } finally {
            setLoading(false);
        }
    };





    return (
        <div>
            <form onSubmit={onSave}
                className='p-5 shadow-lg rounded-lg border-t-4 border-t-purple-600  mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your previous Work Experiance</p>

                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                                <div>
                                    <label className='block mb-2 mt-4 text-xs'>Position Title</label>

                                    <Input className='w-full border px-3 py-2 rounded-md'
                                        value={item?.title || ""} required
                                        name='title' onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='block mb-2 mt-4 text-xs'>Comapny Name</label>

                                    <Input className='w-full border px-3 py-2 rounded-md'
                                        value={item?.companyName || ""} required
                                        name='companyName' onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='block mb-2 mt-4 text-xs'>City</label>

                                    <Input className='w-full border px-3 py-2 rounded-md'
                                        value={item?.city || ""} required
                                        name='city' onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='block mb-2 mt-4 text-xs'>State</label>

                                    <Input className='w-full border px-3 py-2 rounded-md'
                                        value={item?.state || ""} required
                                        name='state' onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='block mb-2 mt-4 text-xs'>Start Date</label>

                                    <Input type='date' className='w-full border px-3 py-2 rounded-md'
                                        value={item?.startDate || ""} required
                                        name='startDate' onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='block mb-2 mt-4 text-xs'>End Date</label>

                                    <Input type='date' className='w-full border px-3 py-2 rounded-md'
                                        value={item?.endDate || ""} required
                                        name='endDate' onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div className='col-span-2'>
                                    {/* Work Summary */}
                                    <RichTextEditor
                                        defaultValue={item.workSummary}
                                        index={index}
                                        onRichTextEditorChange={(event) =>
                                            handleRichTextEditor(event, 'workSummary', index)
                                        }
                                    />

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between '>
                    <div className='flex gap-2'>
                        <Button variant='outline' className='text-purple-600'
                            onClick={RemoveExperience} ><Trash2 /> Remove </Button>
                        <Button variant='outline' className='text-purple-600'
                            onClick={AddNewExperience} > + Add Experience</Button>
                    </div>

                    <Button type="submit"   disabled={loading}
                        className="border-purple-600">
                        {loading ? <LoaderPinwheel className='animate-spin' /> : 'Save & Continue'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Experience
