import { useForm } from 'react-hook-form';
import { edit } from '../../../public/assets/icons';
import {
    Button,
    FileUploader,
    Label,
    Loader,
    TextField,
    Title,
} from '../../components';
import {
    useGetCurrentUser,
    useUpdateProfile,
} from '../../lib/react-query/queries';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const { data: user } = useGetCurrentUser();
    const navigate = useNavigate();

    const { mutateAsync: updateProfile, isPending: isUpdating } =
        useUpdateProfile();

    useEffect(() => {
        setValue('name', user?.name);
        setValue('username', user?.username);
        setValue('bio', user?.bio);
    }, [user]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.name,
            username: user?.username,
            bio: user?.bio,
        },
    });

    if (!user) {
        return (
            <div className="flex-center">
                <Loader />
            </div>
        );
    }

    const onSubmit = async (profile) => {
        const updatedUser = await updateProfile({
            profile,
            user,
        });

        if (!updatedUser) throw Error;

        navigate('/profile/' + user.$id);
        navigate(0);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[720px]">
            <Title imageUrl={edit} title={'Edit Profile'} />
            <div className="padding-x">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 sm:w-[500px]"
                >
                    <div className="sm:w-48 w-40 overflow-hidden">
                        <FileUploader
                            label="Avatar"
                            errors={errors}
                            register={register}
                            setValue={setValue}
                            imageUrl={user.imageUrl}
                            size="sm:w-48 sm:h-48 w-40 h-40"
                            disableClearBtn
                        />
                    </div>
                    <Label forHTML="name" label="Name">
                        <TextField
                            id="name"
                            name="name"
                            rounded="rounded-2xl"
                            placeholder="Name"
                            register={register}
                            errors={errors}
                        />
                    </Label>

                    <Label forHTML="username" label="Username">
                        <TextField
                            id="username"
                            name="username"
                            rounded="rounded-2xl"
                            placeholder="Username"
                            register={register}
                            errors={errors}
                        />
                    </Label>

                    <Label forHTML="bio" label="Biography">
                        <TextField
                            id="bio"
                            name="bio"
                            rounded="rounded-2xl"
                            row={4}
                            placeholder="Biography"
                            register={register}
                            errors={errors}
                        />
                    </Label>

                    <div className="mx-auto w-[30vw] mt-10">
                        <Button>
                            {isUpdating ? (
                                <div className="flex-center w-4 h-4">
                                    <Loader />
                                </div>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
