import {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import { filePlaceholder } from '../../../public/assets/icons';
import Button from '../button/Button';
import { useDropzone } from 'react-dropzone';

export default function FileUploader({
    errors,
    register,
    setValue,
    imageUrl,
    size,
    label,
    disableClearBtn,
}) {
    const [fileUrl, setFileUrl] = useState();

    useEffect(() => {
        if (imageUrl) {
            setFileUrl(imageUrl);
        }
    }, [imageUrl]);

    const fileRef = useRef();

    const onDrop = useCallback(
        (acceptedFiles) => {
            setValue('attachment', acceptedFiles);

            const container = new DataTransfer();
            container.items.add(acceptedFiles[0]);
            fileRef.current.files = container.files;

            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        },
        [fileUrl],
    );

    const handleClear = (e) => {
        e.stopPropagation();
        e.preventDefault();
        fileRef.current.value = null;
        setFileUrl(undefined);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg'],
        },
    });

    const { ref: dropzoneRef, ...dropzoneRest } = getInputProps();
    const { ref: registerRef, ...registerRest } = register('attachment');
    useImperativeHandle(registerRef, () => fileRef.current);

    return (
        <>
            <div className={`flex flex-col gap-2`} {...getRootProps()}>
                <div className="flex-between">
                    <h3
                        htmlFor="attachment"
                        className={`block capitalize text-large mb-2 font-system font-semibold`}
                    >
                        {label}
                    </h3>
                    {fileUrl && !disableClearBtn && (
                        <div className="sm:w-100 w-50">
                            <Button size="p-2" onClick={handleClear}>
                                Clear Image
                            </Button>
                        </div>
                    )}
                </div>
                <input
                    id="attachment"
                    name="attachment"
                    ref={fileRef}
                    errors={errors}
                    {...dropzoneRest}
                    {...registerRest}
                    onInput={(e)=>{
                        setFileUrl(URL.createObjectURL(e.target.files[0]))
                    }}
                />
                <label
                    className={`flex-center border border-primary overflow-hidden
                    rounded-2xl bg-white dark:bg-dark-item
                    ${fileUrl || 'sm:py-10 py-5'}
                    ${size ? size : 'sm:w-[500px] w-full'}
                    `}
                    htmlFor="attachment"
                >
                    {fileUrl ? (
                        <img
                            src={fileUrl}
                            alt="image-placeholder"
                            className={`
                object-cover rounded-2xl
                ${size ? size : 'max-h-[calc((3/2)*100%)] sm:w-[500px] w-full'}
                `}
                        />
                    ) : (
                        <div className="flex-center flex-col gap-1">
                            <img
                                src={filePlaceholder}
                                height={140}
                                width={140}
                                className="dark:make-white brightness-0"
                            />
                            <p className="text-small text-center dark:text-slate-gray">
                                Drag image here or Click to select from browser
                            </p>
                        </div>
                    )}
                </label>
            </div>
            {errors.attachment && (
                <p className="text-small dark:text-error text-error">
                    {errors.attachment.message || 'Errors'}
                </p>
            )}
        </>
    );
}
