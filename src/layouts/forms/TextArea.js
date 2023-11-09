import React, { forwardRef } from 'react';
import { cls } from '../../utils/helpers';

const classes = {
    base: 'px-4 py-2 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md px-2 py-1 border border-border ring ring-transparent focus:border-buttonPrimary focus:ring-blue-400/50 w-full',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
}

const TextArea = forwardRef(
    (
        {
            label,
            children,
            type = 'text',
            disabled,
            className,
            value,
            validation,
            ...props
        }, ref
    ) => (
        <div className='my-1 mx-1'>
            { label && <label className='block text-sm mb-1'>{label}</label> }
            <textarea            
                rows='4'
                cols='50'
                className={cls(`
                    ${classes.base}
                    ${disabled && classes.disabled}
                    ${className}
                `)}
                {...props}
            />
            <div className='italic text-sm text-red-600'>
                {validation}
            </div>
        </div>
    )
);

export default TextArea;