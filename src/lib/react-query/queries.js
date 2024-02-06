import {
  useQueries,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  createPost,
  createSave,
  createUserAccount,
  deleteSave,
  getCurrentUser,
  getUserById,
  getPostById,
  getRecentPosts,
  signInAccount,
  signOutAccount,
  updateLikePost,
  updatePost,
  updateProfile,
  getSuggestedPeople,
  getExplorePosts,
  searchPosts,
  deletePost,
  createFollow,
  deleteFollow,
  searchUser,
  // getSavedPosts,
} from '../appwrite/api';
import { QUERYKEYS } from './queryKeys';

// ----------------------- USER -----------------------

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: [QUERYKEYS.GET_CURRENT_USER],
  });
};

export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: [QUERYKEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useSearchUser = (searchParam) => {
  return useQuery({
    queryKey: [QUERYKEYS.SEARCH_USER, searchParam],
    queryFn: () => searchUser(searchParam),
    enabled: !!searchParam,
  });
};

// ----------------------- GET SUGGESTED USERS -----------------------

export const useGetSuggestedPeople = (filters) => {
  return useInfiniteQuery({
    queryKey: [QUERYKEYS.GET_SUGGESTED_PEOPLE],
    queryFn: ({ pageParam }) => getSuggestedPeople(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length === 0) return null;

      const lastId = lastPage[lastPage.length - 1].$id;
      return lastId;
    },
    enabled: !!filters,
  });
};

// ----------------------- PROFILE -----------------------

// ----------------------- UPDATE PROFILE -----------------------

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ profile, user }) => updateProfile(profile, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERYKEYS.GET_CURRENT_USER,
      });
    },
  });
};

// ----------------------- POST -----------------------

// ----------------------- CREATE POST -----------------------
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERYKEYS.GET_RECENT_POST]);
      queryClient.invalidateQueries([QUERYKEYS.GET_CURRENT_USER]);
    },
  });
};

// ----------------------- DELETE POST -----------------------
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => deletePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERYKEYS.GET_RECENT_POST]);
      queryClient.invalidateQueries([QUERYKEYS.GET_CURRENT_USER]);
    },
  });
};

// ----------------------- UPDATE POST -----------------------
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ post, postId, recentImageId }) =>
      updatePost(post, postId, recentImageId),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERYKEYS.GET_RECENT_POST, data.$id]);
      queryClient.invalidateQueries([QUERYKEYS.GET_POSTS_BY_ID, data.$id]);
    },
  });
};

// ----------------------- GET RECENT POST -----------------------
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERYKEYS.GET_RECENT_POST],
    queryFn: getRecentPosts,
  });
};

// ----------------------- GET POST -----------------------
export const useGetExplorePosts = (filters) => {
  return useInfiniteQuery({
    queryKey: [QUERYKEYS.GET_EXPLORE_POSTS],
    queryFn: ({ pageParam }) => getExplorePosts(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage || lastPage.documents.length === 0) return null;

      return lastPage.documents[lastPage.documents.length - 1];
    },
    enabled: !!filters,
  });
};

// ----------------------- GET POST BY ID -----------------------
export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: [QUERYKEYS.GET_POSTS_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: postId && (typeof postId === 'string' || postId.length > 0),
  });
};

// ----------------------- GET SAVED POST -----------------------

// export const useGetSavedPosts = (saveParam) => {
//   const key = [QUERYKEYS.GET_SAVED_POST];
//   if (saveParam) key.push(...saveParam.map(({ $id }) => $id));

//   return useQuery({
//     queryKey: key,
//     queryFn: () => getSavedPosts(saveParam),
//     enabled: !!saveParam,
//   });
// };

// ----------------------- SEARCH POSTS -----------------------
export const useSearchPosts = (searchParam) => {
  return useQuery({
    queryKey: [QUERYKEYS.GET_SEARCHED_POSTS, searchParam],
    queryFn: () => searchPosts(searchParam),
    enabled: !!searchParam,
  });
};

// ----------------------- LIKE POST -----------------------
export const useUpdateLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, likeArray }) => updateLikePost(postId, likeArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERYKEYS.GET_RECENT_POST]);
      queryClient.invalidateQueries([QUERYKEYS.GET_EXPLORE_POSTS]);
      queryClient.invalidateQueries([QUERYKEYS.GET_POSTS_BY_ID, data.$id]);
      queryClient.invalidateQueries([QUERYKEYS.GET_CURRENT_USER]);
    },
  });
};

// ----------------------- FOLLOW -----------------------

// ----------------------- CREATE FOLLOW -----------------------

export const useCreateFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ followerId, followedId }) =>
      createFollow(followerId, followedId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERYKEYS.GET_CURRENT_USER]);
    },
  });
};

// ----------------------- DELETE FOLLOW -----------------------

export const useDeleteFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (followId) => deleteFollow(followId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERYKEYS.GET_CURRENT_USER]);
      queryClient.invalidateQueries([QUERYKEYS.GET_SUGGESTED_PEOPLE]);
    },
  });
};

// ----------------------- SAVE POST -----------------------
export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, postId }) => createSave(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERYKEYS.GET_RECENT_POST]),
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_POSTS_BY_ID],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_CURRENT_USER],
        });
    },
  });
};

export const useUnSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERYKEYS.DELETE_SAVE],
    mutationFn: (saveRecord) => deleteSave(saveRecord),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERYKEYS.GET_RECENT_POST]),
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_POSTS_BY_ID],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.GET_CURRENT_USER],
        });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SAVED_POST],
      });
    },
  });
};
