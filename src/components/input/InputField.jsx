import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

function InputField(
    {
        autoFocus,
        children,
        register,
        errors = {},
        id,
        name,
        type = 'text',
        placeholder,
        note,
        rounded,
        style = '',
        onKeyDown,
        size,
    },
    fieldRef,
) {
    const ref = useRef();
    const { ref: registerRef, ...registeredRest } = register
        ? register(name)
        : {};

    if (register)
        useImperativeHandle(
            registerRef,
            () => (fieldRef ? fieldRef.current : ref.current),
            [],
        );

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                ref?.current?.focus();
                fieldRef?.current?.focus();
            }, 300);
        }
    }, [ref]);

    return (
        <div className={`relative h-auto ${size ? size : 'w-full'}`}>
            <input
              className={`text-field
              ${
                  errors[name]
                      ? 'border-error hover:ring-error/20 focus:ring-error/20'
                      : `border-primary
                  dark:hover:ring-gray-500/20 hover:ring-gray-300/20
                  dark:focus:ring-gray-500/20 focus:ring-gray-300/20`
              } 
              ${rounded || 'rounded-md'} ${style}`}
              id={id}
              name={name}
              type={type ? type : 'text'}
              placeholder={placeholder}
              onKeyDown={
                  onKeyDown
                      ? (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();

                                try {
                                    return onKeyDown();
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                      : undefined
              }
              ref={fieldRef ? fieldRef : ref}
              {...registeredRest}
            />
            {errors[name] ? (
                <p className="text-small dark:text-error text-error font-system mt-1">
                    {errors[name]?.message || 'Errors'}
                </p>
            ) : (
                note && (
                    <p className="text-small text-subtitle font-system mt-1">
                        {note}
                    </p>
                )
            )}
            {children}
        </div>
    );
}

export default forwardRef(InputField);
