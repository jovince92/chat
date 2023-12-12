import React, { FC, useEffect, useRef } from 'react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from './ui/popover';
import { Smile } from 'lucide-react';
import Picker from '@emoji-mart/react';
import EmojiData from '@emoji-mart/data';
import { useTheme } from '@/lib/ThemeProvider';

interface EmojiPickerProps{
    onChange:(value:string)=>void;
}

const EmojiPicker:FC<EmojiPickerProps> = ({onChange}) => {
    const {theme} = useTheme();
    
    const modalClose = useRef<HTMLButtonElement>(null)

    const onEmojiSelect = (e:string) =>{
        onChange(e);
        modalClose.current?.click();
    }

    return (
        <Popover modal>
            <PopoverTrigger>
                <Smile className='text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition z-[5000]' />
            </PopoverTrigger>
            <PopoverContent side='right' sideOffset={40} className='bg-transparent border-none shadow-none drop-shadow-none mb-16'>
                <PopoverClose ref={modalClose} className='hidden' />
                <Picker data={EmojiData} onEmojiSelect={(emoji:any)=>onEmojiSelect(emoji.native)} theme={theme} />
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPicker