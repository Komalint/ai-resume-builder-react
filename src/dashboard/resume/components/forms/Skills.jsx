import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResumeInfoContext from '@/context/ResumeInfoContext'
import { LoaderPinwheel, Trash2, Sparkles, Plus, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { generateAIContent } from './../../../../../service/AIModel'

const Skills = ({ enableNext }) => {
    const [skillsList, setSkillsList] = useState([{ category: '', items: '' }]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams(); // Add this line

    // UI States for AI
    const [aiLoading, setAiLoading] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [activeAiIndex, setActiveAiIndex] = useState(null);

    useEffect(() => {
        if (resumeInfo?.skills?.length > 0) {
            const formatted = resumeInfo.skills.map(skill => ({
                ...skill,
                items: Array.isArray(skill.items) ? skill.items.join(', ') : skill.items
            }));
            setSkillsList(formatted);
        }
    }, []);

    useEffect(() => {
        if (skillsList.length > 0 && skillsList[0].category !== '') {
            const formattedForPreview = skillsList.map(skill => ({
                ...skill,
                items: typeof skill.items === 'string'
                    ? skill.items.split(',').map(s => s.trim()).filter(s => s !== "")
                    : skill.items
            }));
            setResumeInfo(prev => ({ ...prev, skills: formattedForPreview }));
        }
    }, [skillsList]);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const GenerateSkillsWithAI = async (index) => {
        const category = skillsList[index].category;
        if (!category) {
            toast("Please enter a category name first!");
            return;
        }
        setAiLoading(index);
        setActiveAiIndex(index);

        const PROMPT = `Generate a list of 10 essential technical skills for the category: ${category}. 
        Return ONLY a comma-separated list of short skill names. No numbers, no descriptions.`;

        try {
            const result = await generateAIContent(PROMPT);
            const skillArray = result.split(',').map(s => s.trim());
            setSuggestions(skillArray);
        } catch (error) {
            toast("AI Suggestion failed.");
        } finally {
            setAiLoading(null);
        }
    };

    const addSkillFromSuggestion = (skill) => {
        const index = activeAiIndex;
        const currentItems = skillsList[index].items;

        // Clean the incoming skill of any quotes immediately
        const cleanSkill = skill.replace(/["[\]]/g, '').trim();

        const existingArray = currentItems.split(',').map(s => s.trim().toLowerCase());
        if (existingArray.includes(cleanSkill.toLowerCase())) {
            toast("Skill already added!");
            return;
        }

        const updatedItems = currentItems ? `${currentItems}, ${cleanSkill}` : cleanSkill;
        handleChange(index, 'items', updatedItems);
    };

    const onSave = () => {
        setLoading(true);
        const cleanedSkills = skillsList.map(skill => ({
            category: skill.category,
            items: typeof skill.items === 'string'
                ? skill.items.split(',').map(s => s.trim()).filter(s => s !== "")
                : skill.items
        }));

        GlobalApi.UpdateResumeDetail(params.resumeId, { data: { skills: cleanedSkills } })
            .then(() => {
                toast('Skills saved successfully!');
                enableNext(true);
            }).finally(() => setLoading(false));
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-purple-600 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p className='text-sm text-gray-500'>Add categories and click Sparkles to get AI suggestions.</p>

            <div className='mt-5 space-y-6'>
                {skillsList.map((item, index) => (
                    <div key={index} className='p-4 border rounded-xl bg-white shadow-sm'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-xs font-bold uppercase text-gray-400'>Category</label>
                                <div className='flex gap-2 mt-1'>
                                    <Input
                                        placeholder="e.g. Frontend"
                                        value={item.category}
                                        onChange={(e) => handleChange(index, 'category', e.target.value)}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="bg-purple-50 text-purple-600 hover:bg-purple-100"
                                        onClick={() => GenerateSkillsWithAI(index)}
                                        disabled={aiLoading === index}
                                    >
                                        {aiLoading === index ? <LoaderPinwheel className='animate-spin w-4 h-4' /> : <Sparkles className='w-4 h-4' />}
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <label className='text-xs font-bold uppercase text-gray-400'>Skills</label>
                                <Input
                                    className="mt-1"
                                    placeholder="React, Vue, Angular"
                                    value={item.items}
                                    onChange={(e) => handleChange(index, 'items', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* AI Suggestion Box */}
                        {activeAiIndex === index && suggestions.length > 0 && (
                            <div className='mt-4 p-3 bg-purple-50/50 border border-dashed border-purple-200 rounded-lg'>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-[10px] font-bold text-purple-700 uppercase'>AI Suggestions (Click to add)</span>
                                    <X className='w-3 h-3 cursor-pointer text-gray-400' onClick={() => setSuggestions([])} />
                                </div>
                                <div className='flex flex-wrap gap-2'>
                                    {suggestions.map((skill, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => addSkillFromSuggestion(skill)}
                                            className='text-xs bg-white border border-purple-200 px-2 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-all'
                                        >
                                            + {skill}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='flex justify-between mt-8 border-t pt-5'>
                <div className='flex gap-2'>
                    <Button variant='outline' size="sm" className="text-purple-600" onClick={() => setSkillsList([...skillsList, { category: '', items: '' }])}>
                        <Plus className='w-4 h-4 mr-1' /> Add Category
                    </Button>
                    <Button variant='ghost' size="sm" className="text-red-400 hover:text-red-600" onClick={() => setSkillsList(skillsList.slice(0, -1))}>
                        <Trash2 className='w-4 h-4' />
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave} className="bg-purple-600 px-10">
                    {loading ? <LoaderPinwheel className='animate-spin' /> : 'Save Changes'}
                </Button>
            </div>
        </div>
    )
}

export default Skills;