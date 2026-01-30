import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Pencil,
    Eye,
    Download,
    Trash2,
} from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'


const ResumeCardItem = ({resume,refreshData}) => { // Correctly destructured prop

    const navigation = useNavigate();
    const[openAlert,setOpenAlert] = useState(false);
    const [loading,setLoading] =useState(false);

    const onDelete=()=>{
        setLoading(true)
        GlobalApi.DeleteResumeById(resume.documentId).then(resp =>{
            console.log(resp);
            toast('Resume Deleted Successfully!') ; 
          refreshData();
          setLoading(false); 
          setOpenAlert(false);         
        }),((error)=>{
            setLoading(false);
            toast('Unable to Delete. Try Again!')
            setOpenAlert(false);
        })
    }

    return (
        <div className='transition-all duration-300 hover:scale-105'>
            {/* The Main Card Body */}
            <Link to={`/dashboard/resume/${resume?.documentId}/edit`} className="no-underline">
                <div className="
                    bg-linear-to-b from-purple-500 via-indigo-300 to-violet-400
                    h-62 lg:h-80
                    flex items-center justify-center 
                    border border-slate-200 border-b-0
                    rounded-t-2xl cursor-pointer
                    hover:shadow-md transition-shadow">

                    <img
                        src='/Resume-card-img.png'
                        width={100}
                        height={100}
                        alt="Resume Preview"
                        className='drop-shadow-sm'
                    />
                </div>
            </Link>

            {/* The Bottom Bar - Outside the Link for the dots to be clickable separately later */}
            <div
                className="p-3 flex justify-between items-center text-white rounded-b-2xl shadow-sm"
                style={{ backgroundColor: resume?.themeColor || '#FDE047' }}
                // Uses your theme color or a default red
            >
                <h2 className="text-sm font-medium truncate pr-4">
                    {resume.Title}
                </h2>

                <div className="hover:bg-black/10 p-1 rounded-full transition-colors cursor-pointer shrink-0">

                    <DropdownMenu>
                        <DropdownMenuTrigger><MoreVertical className="h-4 w-4" /></DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-44 rounded-md border bg-white p-1 shadow-md"
                        >
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer"
                                onClick={() => navigation(`/dashboard/resume/${resume?.documentId}/edit`)}>
                                <Pencil className="h-4 w-4 text-muted-foreground" />
                                <span>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer"
                                onClick={() => navigation(`/my-resume/${resume?.documentId}/view`)}>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span>View</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer"
                                onClick={() => navigation(`/my-resume/${resume?.documentId}/view`)}>
                                <Download className="h-4 w-4 text-muted-foreground" />
                                <span>Download</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={()=>setOpenAlert(true)}
                                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>

                    <AlertDialog open={openAlert}>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete}
                                  disabled={loading} >
                                  {loading? <Loader2Icon className=' animate-spin'/>:'Delete'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </div>
    )
}

export default ResumeCardItem