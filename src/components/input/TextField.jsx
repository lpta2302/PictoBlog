import clsx from 'clsx';
import { forwardRef, useImperativeHandle } from 'react';

function TextField(
    {
        children,
        register,
        errors = {},
        id,
        name,
        type,
        placeholder = '',
        note = '',
        row,
        rounded = '',
        style = '',
        onKeyDown,
        size,
    },
    fieldRef,
) {
    const { ref: registerRef, ...registeredRest } = register
        ? register(name)
        : {};

    if (register && fieldRef)
        useImperativeHandle(registerRef, () => fieldRef.current, []);

    return (
        <div className={`relative h-auto ${size ? size : 'w-full'}`}>
            <textarea
                className={clsx(
                    'text-field',
                    errors[name]
                        ? 'border-error hover:ring-error/20 focus:ring-error/20'
                        : `border-primary
                    dark:hover:ring-gray-500/20 hover:ring-gray-300/20
                    dark:focus:ring-gray-500/20 focus:ring-gray-300/20`,
                    rounded || 'rounded-md',
                    style,
                )}
                id={id}
                name={name}
                type={type ? type : 'text'}
                placeholder={placeholder}
                rows={row ? row : 1}
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
                ref={fieldRef ? fieldRef : registerRef}
                {...registeredRest}
            />
            {errors[name] ? (
                <p className="text-small dark:text-error text-error mt-1">
                    {errors[name]?.message || 'Errors'}
                </p>
            ) : (
                <p className="text-small text-off-white mt-1">{note}</p>
            )}
            {children}
        </div>
    );
}

export default forwardRef(TextField);
