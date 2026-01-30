import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import ResumeInfoContext from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';


const ThemeColor = () => {

    const colors = [
        "#0F172A",
        "#1E293B",
        "#1F2937",
        "#374151",
        "#4B5563",
        "#6B7280",

        "#1E3A8A",
        "#1D4ED8",

        "#064E3B",
        "#065F46",
        "#0F766E",

        "#7C2D12",
        "#713F12",

        "#000000",
        "#262626"
    ];

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const[selectedColor,setSelectedColor] =useState();
    const {resumeId} =useParams();

    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
        ...resumeInfo,
        themeColor: color
    });

    const data = {
        data: {
            themeColor: color
        }
    };
        GlobalApi.UpdateResumeDetail(resumeId,data).then(resp => {
            console.log(resp);
            toast('Theme Color Updated')
        }).catch(error => {
        console.error("Update Failed Error:", error.response?.data || error.message);
        toast('Failed to save theme color.');
    });
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className='mb-4 flex gap-2' size='sm'>
                                <LayoutGrid /> Theme</Button>
                </PopoverTrigger>
                <PopoverContent>
                <h2 className='mb-2 p-1 text-sm font-bold'>Select Theme Color</h2>
                <div className=' grid grid-cols-5 gap-3'>
                    {colors.map((item,index) =>(
                        <div 
                        onClick={()=>onColorSelect(item)}
                        className={`h-5 w-5 rounded-full cursor-pointer border hover:border-black
                        ${selectedColor == item && 'border'}`} 
                        style={{
                            background:item
                        }}>

                        </div>
                    ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ThemeColor
