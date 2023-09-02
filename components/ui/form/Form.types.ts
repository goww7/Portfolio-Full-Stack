import React, { InputHTMLAttributes } from 'react';
import { UseFormProps, SubmitHandler, SubmitErrorHandler, UseFormSetError, UseFormReturn, UseFormReset } from 'react-hook-form';
import { IconNames } from '../icon';
import { InputProps as AriaInputProps, TextFieldProps } from 'react-aria-components';


export type OptionOnSubmit<T extends { [x: string]: any }> = {
    setError: UseFormSetError<T>,
    reset: UseFormReset<T>,
};

export interface FormProps<T extends { [x: string]: any }> extends UseFormProps<T> {
    children: ((method: UseFormReturn<T>) => React.ReactNode) | React.ReactNode;
    className?: string;
    onSubmit: (data: T, options: OptionOnSubmit<T>, event?: React.BaseSyntheticEvent) => void | Promise<void>;
    onError?: SubmitErrorHandler<T>;
}

export interface InputProps extends AriaInputProps {
    label: string,
    name: string,
}
