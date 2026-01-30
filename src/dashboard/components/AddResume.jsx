import { Loader2, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../../service/GlobalApi';
import { useNavigate } from 'react-router-dom';

const AddResume = () => {

    const [openDailog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate = async () => {
        setLoading(true);
        const uuid = uuidv4();

        const data = {
            data: {
                Title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
            }
        };

        GlobalApi.CreateNewresume(data)
            .then((response) => {
                setOpenDialog(false);
                setResumeTitle();
                setLoading(false);
                navigation(`/dashboard/resume/${response.data.data.documentId}/edit`);
            })
            .catch(() => setLoading(false));
    }

    return (
        <div>
            {/* Add Resume Carddd */}
            {/* Add Resume Card */}
            <div
                onClick={() => setOpenDialog(true)}
                className="
    group relative py-24 lg:py-32
    flex flex-col items-center justify-center gap-4
    border border-purple-100
    rounded-3xl cursor-pointer
    bg-white overflow-hidden
    hover:scale-[1.02]
    transition-all duration-500 ease-out
    shadow-[0_8px_30px_rgb(0,0,0,0.04)]
    hover:shadow-[0_20px_50px_rgba(159,107,255,0.12)]"
            >
                {/* Professional Background: Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239f6bff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>

                {/* Professional Background: Soft Radial Glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200/20 blur-3xl rounded-full group-hover:bg-[#9f6bff]/10 transition-colors duration-500" />

                <div className="relative z-10 p-4 bg-purple-50 rounded-2xl group-hover:bg-[#9f6bff] transition-all duration-300 group-hover:rotate-6">
                    <PlusCircle
                        size={32}
                        className="text-[#9f6bff] group-hover:text-white transition-colors duration-300"
                    />
                </div>

                <div className="relative z-10 text-center">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-[#9f6bff] transition-colors">
                        Create Your resume
                    </h3>
                    <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                        Professional AI Builder
                    </p>
                </div>

                {/* Bottom Accent Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-[#9f6bff] w-full transition-all duration-500" />
            </div>

            {/* Dialog */}
            <Dialog open={openDailog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Create New Resume
                        </DialogTitle>
                        <p className="text-sm text-gray-500">
                            Give your resume a title to get started.
                        </p>
                    </DialogHeader>

                    <div className="grid gap-4 mt-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">
                                Resume Title
                            </Label>
                            <Input
                                placeholder="Frontend Developer Resume"
                                onChange={(e) => setResumeTitle(e.target.value)}
                                className="focus-visible:ring-[#9f6bff]"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6 flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={onCreate}
                            disabled={!resumeTitle || loading}
                            className="
                            bg-[#9f6bff]
                            hover:bg-[#b48bff]
                            flex items-center gap-2"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {loading ? 'Creating...' : 'Create Resume'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume;
