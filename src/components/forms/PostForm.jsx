import { useUserContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useToastContext } from '../../context/ToastContext';
import {
  createPostValidate,
  updatePostValidate,
} from '../../lib/validate/yupValidateForm';

import {
  Button,
  Loader,
  TextField,
  FileUploader,
  Label,
} from '../../components';
import { useEffect } from 'react';
import CheckBox from '../input/CheckBox';

function PostForm({ post, action: { type: actionType, ...rest } }) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { toast } = useToastContext();

  useEffect(() => {
    if (actionType === 'UPDATE') {
      setValue('caption', post?.caption);
      setValue('tags', post?.tags.join(','));
      setValue('location', post?.location);
    }
  }, [post]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      actionType === 'CREATE' ? createPostValidate : updatePostValidate,
    ),
    defaultValues: {
      caption: post?.caption,
      location: post?.location,
      tags: post?.tags.join(''),
    },
  });

  async function onSubmit(data) {
    if (actionType === 'CREATE') {
      const { mutateAsync: createNewPost } = rest;

      const newPost = await createNewPost({
        ...data,
        creator: user.$id,
      });

      if (!newPost) {
        toast({
          title: 'Posting failed, please try again',
        });
        throw Error;
      }

      reset();

      navigate('/');
    } else {
      const { mutateAsync: updatePost } = rest;

      const updatedPost = await updatePost({
        post: { ...data },
        postId: post?.$id,
      });

      if (!updatedPost) {
        toast({
          type: 'error',
          title: 'Update failed, please try again',
        });
        throw Error;
      }

      navigate('/');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:w-[500px]"
    >
      <Label htmlFor="caption" label={'Add caption'}>
        <TextField
          id="caption"
          name="caption"
          row={5}
          rounded="rounded-2xl"
          placeholder="What's in your mind"
          register={register}
          errors={errors}
        />
      </Label>
      <FileUploader
        label="Add Photo"
        errors={errors}
        register={register}
        setValue={setValue}
        imageUrl={post?.imageUrl}
      />
      <Label htmlFor="location" label={'Add location'}>
        <TextField
          id="location"
          name="location"
          rounded="rounded-2xl"
          placeholder="Where're you"
          register={register}
        />
      </Label>
      <Label label={'Add tags ( separate with comma " , " )'}>
        <TextField
          type="text"
          name="tags"
          id="tags"
          rounded="rounded-2xl"
          placeholder="Nature,Animal,Post..."
          register={register}
          errors={errors}
        />
      </Label>
      <CheckBox
        label1="Just Friend"
        label2="Public"
        id="public"
        name="public"
        register={register}
        setValue={setValue}
      ></CheckBox>
      <div className="mx-auto w-[30vw] mt-10">
        <Button>
          {rest.isPending ? (
            <div className="flex-center w-4 h-4">
              <Loader />
            </div>
          ) : (
            'Post'
          )}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
