import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
export interface ContainerProps {
    children: React.ReactNode | React.ReactNode[];
    id?: string;
    size: 'lg',
    className?: string;
    as?: 'span' | 'div' | 'section';
}

export const containerStyle = cva(['mx-auto w-full max-w-full overflow-x-hidden h-auto 2xl:max-w-[1400px] 3xl:max-w-[1500px] 4xl:max-w-[1600px]'], {
    variants: {
        size: {
            lg: 'px-4 xs:px-5 sm:px-12 md:px-8 lg:px-10 2xl:px-10'
        }
    }
}) 


const Container = ({ as, children, className, ...props }: ContainerProps) => {
    return (
        <>
            {React.createElement(as || 'span', {
                className: twMerge(containerStyle(
                    { size: props.size }
                ), className),
                ...props
            }, children)}
        </>
    )
}

export default Container;