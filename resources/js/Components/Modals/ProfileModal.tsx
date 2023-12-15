import {  ChangeEventHandler, FC,  useCallback,  useEffect,  useMemo, useState, FormEventHandler } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogFooter,  DialogHeader, DialogTitle } from '../ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Button } from '../ui/button';
import { PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { toast, useToast } from '../ui/use-toast';
import axios from 'axios';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileUploader } from 'react-drag-drop-files';
import { AlertCircleIcon, UploadCloud, User2Icon, UserCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import UserAvatar from '../UserAvatar';
import { cn } from '../../lib/utils';

const fileTypes = ["JPG", "PNG", "WEBP",'JPEG'];

const ProfileModal:FC = () => {

    const {auth} = usePage<PageProps>().props;
    const {isOpen,onClose,type,data:ModalData} = useModal();

    const { data, setData, post, processing, errors, reset } = useForm<{
        email:string,
        current_password:string,
        new_password:string,
        confirm_password:string,
        image:File|undefined}>({
        email: auth.user.email,
        current_password: '',
        new_password: '',
        confirm_password: '',
        image: undefined,
    });

    const onImageSelect:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {target}=e;
        if(!target.files||target.files?.length<1) return null;
        const file=target.files[0];
        const url = URL.createObjectURL(file) ;
        setData('image',file);
        setImgPreview(url);
        console.log(data.image)
    }

    const onFileDrop = (file:File) =>{
        const url = URL.createObjectURL(file) ;
        setData('image',file);
        setImgPreview(url);
    }

    const onSubmit:FormEventHandler = (e) =>{
        e.preventDefault();
        post(route('profile.update'),{
            onSuccess:()=>{
                toast({'title':'Success','description':'Profile has been updated'});
                reset()
                onClose()
            }
        });
    }

    const [imgPreview,setImgPreview] = useState(auth.user.image);

    const OPEN = useMemo(()=>isOpen&&type==='Profile',[isOpen,type]);

    return (
        <Dialog open={OPEN} onOpenChange={onClose}>
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Profile</DialogTitle>
                    <DialogDescription className='text-center' >Customize your account</DialogDescription>
                </DialogHeader>

                <form id='profile' onSubmit={onSubmit} className='flex flex-col'>
                    <div className='flex flex-col items-center justify-center text-center mb-4'>
                        {(errors.email||errors.image)&&<FileErrorAlert messages={[errors?.email||"",errors?.image||""]} />}
                        <FileUploader hoverTitle="Upload or drop a file right here" handleChange={onFileDrop} name="file" types={fileTypes}>
                            <label htmlFor="image" className='flex flex-col items-center justify-center cursor-pointer outline-none rounded-full'>
                                {!imgPreview?
                                    <UserCircleIcon className='w-24 h-24 text-gray-500 hover:text-gray-700' />
                                    :
                                    <img className='w-24 h-24 rounded-full object-cover' src={imgPreview} />}
                            </label>
                        </FileUploader>
                        <p className='my-2'>Profile Photo</p>
                        <div className='flex items-center space-x-2 overflow-hidden'>
                            <Button className='w-24' onChange={()=>setImgPreview("")} disabled={imgPreview?false:true}>Remove</Button>
                            <FileUploader hoverTitle="Upload or drop a file right here" handleChange={onFileDrop} name="file" types={fileTypes}>
                                <Button className='w-24'>Add</Button>
                            </FileUploader>
                        </div>
                        <input accept=".png,.jpeg,.jpg," onChange={onImageSelect} type="file" hidden id='image' />
                    </div>

                    <div className='flex flex-col space-y-1 px-12 py-2'>
                        <Label className='uppercase text-xs font-bold'>Email</Label>
                        <Input type="email" value={data.email} onChange={({target})=>setData('email',target.value)} required disabled={processing}
                            className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Email Address' />
                    </div>
                    <div className='flex flex-col space-y-1 px-12 py-2'>
                        <Label className='uppercase text-xs font-bold'>Current Password</Label>
                        <Input type="password" value={data.current_password} onChange={({target})=>setData('current_password',target.value)} required disabled={processing}
                            className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Current Password' />
                    </div>
                    <div className='flex flex-col space-y-1 px-12 py-2'>
                        <Label className='uppercase text-xs font-bold'>New Password</Label>
                        <Input type="password" value={data.new_password} onChange={({target})=>setData('new_password',target.value)} required disabled={processing}
                            className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='New Password' />
                    </div>
                    <div className='flex flex-col space-y-1 px-12 py-2'>
                        <Label className='uppercase text-xs font-bold'>Confirm Password</Label>
                        <Input type="password" value={data.confirm_password} onChange={({target})=>setData('confirm_password',target.value)} required disabled={processing}
                            className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Confirm Password' />
                    </div>

                    <div className='text-center pb-7'>
                        <Button disabled={processing} form='profile' className='w-24 my-4'>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileModal


const FileErrorAlert:FC<{messages:string[]}> = ({messages}) =>{

    return(
        <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className='flex flex-col'>
                {messages.map(msg=>msg.length>0 && <span key={msg}>{msg}</span>)}
            </AlertDescription>
        </Alert>
    );
}
