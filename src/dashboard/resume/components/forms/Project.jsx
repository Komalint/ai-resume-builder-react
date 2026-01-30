import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import ProjectRichTextEditor from '../ProjectRichTextEditor';
import { LoaderPinwheel, Trash2 } from 'lucide-react';
import ResumeInfoContext from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const Project = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);

    const [projectList, setProjectList] = useState(
        resumeInfo?.projects?.length > 0 ? resumeInfo.projects : [{ title: '', techStack: '', description: '' }]
    );

    const handleChange = (index, event) => {
        const newEntries = [...projectList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setProjectList(newEntries);
    };

    const handleDescription = (value, index) => {
        const newEntries = [...projectList];
        newEntries[index].description = value;
        setProjectList(newEntries);
    };

    const handleTechStackAI = (value, index) => {
        const newEntries = [...projectList];
        newEntries[index].techStack = value; 
        setProjectList(newEntries);
    };

    const addNewProject = () => setProjectList([...projectList, { title: '', techStack: '', description: '' }]);
    const removeProject = () => setProjectList(projectList.slice(0, -1));

    useEffect(() => {
        setResumeInfo({ ...resumeInfo, projects: projectList });
    }, [projectList]);

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                projects: projectList.map(({ id, ...rest }) => ({
                    ...rest,
                    techStack: rest.techStack || "" 
                }))
            }
        };

        try {
            await GlobalApi.UpdateResumeDetail(resumeId, data);
            toast("Projects saved successfully!");
            enableNext(true);
        } catch (error) {
            toast("Error saving projects");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-purple-600 mt-10'>
            <h2 className='font-bold text-lg'>Projects</h2>
            <p>Showcase your technical work</p>

            <form onSubmit={onSave}>
                {projectList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label className='text-xs'>Project Title</label>
                            <Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} required />
                        </div>
                        <div className='col-span-2'>
                            <label className='text-xs'>Tech Stack</label>
                            <Input 
                                name="techStack" 
                                value={item.techStack} 
                                onChange={(e) => handleChange(index, e)} 
                                placeholder="e.g. React, Tailwind CSS" 
                            />
                        </div>
                        <div className='col-span-2'>
                            <ProjectRichTextEditor
                                projectTitle={item.title}
                                defaultValue={item.description}
                                onRichTextEditorChange={(v) => handleDescription(v, index)}
                                onTechStackGen={(v) => handleTechStackAI(v, index)}
                            />
                        </div>
                    </div>
                ))}

                <div className='flex justify-between mt-4'>
                    <div className='flex gap-2'>
                        <Button type="button" variant="outline" onClick={addNewProject} className="text-purple-600">+ Add Project</Button>
                        <Button type="button" variant="outline" onClick={removeProject} className="text-purple-600"><Trash2 className='h-4 w-4' /></Button>
                    </div>
                    <Button type="submit" disabled={loading} className="bg-purple-600">
                        {loading ? <LoaderPinwheel className='animate-spin' /> : 'Save & Continue'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Project;