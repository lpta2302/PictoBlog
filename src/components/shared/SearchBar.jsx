import { useRef } from 'react';
import GhostButton from '../button/GhostButton';
import { useForm, useWatch } from 'react-hook-form';
import { close, search } from '../../../public/assets/icons';
import InputField from '../input/InputField';

export default function SearchBar({ onSubmit, placeholder, onClickClose }) {
    const { register, control, handleSubmit, reset } = useForm({ mode: 'all' });

    const inputValue = useWatch({
        control,
        name: 'search',
    });

    const fieldRef = useRef();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-center gap-2 max-xs:gap-1"
        >
            <InputField
                autoFocus
                name="search"
                placeholder={placeholder ? placeholder : 'Search'}
                rounded="rounded-full"
                ref={fieldRef}
                register={register}
                style="pr-11"
                onKeyDown={handleSubmit(onSubmit)}
                size="flex-1"
            >
                {!!inputValue && (
                    <div className="absolute right-1 pos-mid flex-center">
                        <GhostButton
                            rounded="rounded-full"
                            size="h-10 w-10"
                            onClick={() => reset()}
                        >
                            <img
                                src={close}
                                alt="close"
                                className="w-4 h-4 grayscale"
                            />
                        </GhostButton>
                    </div>
                )}
            </InputField>
            <GhostButton
                rounded="rounded-full"
                size="h-10 w-10 xs:w-11 xs:h-11"
                style="flex-center"
                bgColor="dark:bg-dark-4 bg-off-white"
            >
                <img
                    src={search}
                    alt="search"
                    className="dark:grayscale dark:brightness-100 brightness-0 w-7 h-7"
                />
            </GhostButton>
            {onClickClose && (
                <GhostButton
                    rounded="rounded-full"
                    size="h-8 w-8 xs:w-11 xs:h-11"
                    style="flex-center"
                    bgColor="dark:bg-dark-4 bg-off-white"
                    onClick={onClickClose}
                >
                    <img
                        src={close}
                        alt="close"
                        className="dark:contrast-0 xs:w-4 xs:h-4 w-3 h-3"
                    />
                </GhostButton>
            )}
        </form>
    );
}
