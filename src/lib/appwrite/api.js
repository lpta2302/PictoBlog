import { ID, Query } from 'appwrite';
import { account, appwriteConfig, avatars, databases, storage } from './config';

// ---------------------- ACCOUNT ----------------------

// ----------------------- CREATE ACOUNT -----------------------

export async function createUserAccount(user) {
  try {
    const { $id, email, name } = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    if (!$id) throw Error;

    const avatarUrl = avatars.getInitials(name);

    const newUser = await saveUserToDataBase({
      accountId: $id,
      email,
      name,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ----------------------- SAVE USER -----------------------

export async function saveUserToDataBase(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      ID.unique(),
      user,
    );

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ----------------------- SIGN IN -----------------------

export async function signInAccount({ email, password }) {
  try {
    const user = await account.createEmailSession(email, password);

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET ACCOUNT FROM SESSION -----------------------

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET CURRENT ACCOUNT FROM DB -----------------------

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      [Query.equal('accountId', [currentAccount.$id])],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return false;
  }
}

// ----------------------- GET USER BY ID -----------------------

export async function getUserById(userId) {
  try {
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      [Query.equal('$id', [userId])],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- SEARCH USER BY NAME/USERNAME -----------------------

export async function searchUser({ searchTerm, searchType, filter }) {
  const queries = ['equal', 'search'].map((cur) => [
    Query[cur](searchType, searchTerm),
    Query.orderDesc('$updatedAt'),
    Query.notEqual('$id', filter.$id),
  ]);

  try {
    let searchResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      queries[0],
    );

    if (searchResult && searchResult.documents.length > 0)
      return searchResult.documents;

    searchResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      queries[1],
    );

    if (!searchResult) throw Error;

    return searchResult.documents;
  } catch (error) {
    console.log(error);
  }
}

export async function getSuggestedPeople(pageParam, filters) {
  filters = filters?.map((filter) => Query.notEqual('$id', filter.$id));

  const queries = [Query.orderDesc('$createdAt'), Query.limit(10)];

  if (filters) queries.push(...filters);

  if (pageParam) queries.push(Query.cursorAfter(pageParam));

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      queries,
    );

    if (!users) throw Error;

    return users.documents;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- SIGN OUT -----------------------

export async function signOutAccount() {
  try {
    const user = await account.deleteSession('current');

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- PROFILE -----------------------

// ----------------------- UPDATE PROFILE -----------------------

export async function updateProfile(profile, { $id: userId, imageId }) {
  try {
    const { bio, username, name, attachment } = profile;

    const res = { bio, username, name };

    if (attachment.length > 0) {
      const uploadedFile = await uploadFile(attachment[0]);

      if (!uploadedFile) throw Error;

      const imageUrl = getFilePreview(uploadedFile.$id);

      if (!imageUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      if (imageId) await deleteFile(imageId);

      res.imageUrl = imageUrl;
      res.imageId = uploadedFile.$id;
    }
    console.log(res);

    const updatedProfile = databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersColectionId,
      userId,
      res,
    );

    if (!updatedProfile) throw Error;

    return updatedProfile;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- FOLLOW -----------------------

// ----------------------- CREATE FOLLOW -----------------------

export async function createFollow(followerId, followedId) {
  try {
    const follow = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followsColectionId,
      ID.unique(),
      {
        follower: followerId,
        following: followedId,
      },
    );

    if (!follow) throw Error;

    return follow;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- DELETE FOLLOW -----------------------

export async function deleteFollow(followId) {
  try {
    const deletedFollow = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followsColectionId,
      followId,
    );

    if (!deletedFollow) throw Error;

    return deletedFollow;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- POST -----------------------

// ----------------------- CREATE POST -----------------------

export async function savePostToDataBase(post) {
  try {
    const currentUser = await getAccount();
    if (!currentUser) throw Error;

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      ID.unique(),
      {
        ...post,
        creator: currentUser.$id,
        imageId: ID.unique(),
      },
    );

    if (!newPost) throw Error;

    return newPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createPost(post) {
  try {
    const { caption, location, attachment, creator, is_public } = post;
    let { tags } = post;

    const uploadedFile = await uploadFile(attachment[0]);

    if (!uploadedFile) throw Error;

    const imageUrl = getFilePreview(uploadedFile.$id);

    if (!imageUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    tags = (tags && tags.replace(/[\s]/g, '').split(',')) || [];

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      ID.unique(),
      {
        creator,
        caption,
        tags,
        imageId: uploadedFile.$id,
        imageUrl,
        location,
        isPublic: is_public,
      },
    );

    if (!newPost) throw Error;

    return newPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ----------------------- UPDATE POST -----------------------

export async function deletePost({ $id: postId, imageId }) {
  try {
    const deletedPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      postId,
    );

    if (!deletedPost) throw Error;

    await deleteFile(imageId);

    return deletedPost;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- UPDATE POST -----------------------
export async function updatePost(post, postId) {
  try {
    const { caption, location, attachment, is_public } = post;
    const tags = post.tags.replace(/\s/g, '').split(',');

    const res = {
      caption,
      location,
      tags,
      isPublic: is_public,
    };

    if (attachment.length > 0) {
      const uploadedFile = await uploadFile(attachment[0]);

      if (!uploadedFile) throw Error;

      const imageUrl = getFilePreview(uploadedFile.$id);

      if (!imageUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      res.imageUrl = imageUrl;
      res.imageId = uploadedFile.$id;
    }

    const updatedPost = databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      postId,
      res,
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET RECENT POST -----------------------

export async function getExplorePosts(pageParam, filters) {
  filters = filters.map((filter) => Query.notEqual('$id', filter));

  const queries = [
    Query.orderDesc('$createdAt'),
    Query.equal('isPublic', true),
    Query.limit(10),
  ];

  if (filters) queries.push(...filters);

  if (pageParam) queries.push(Query.cursorAfter(pageParam));

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      queries,
    );

    if (!posts) throw Error;

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET RECENT POST -----------------------

export async function getRecentPosts({ usersId, ownPostsId }) {
  try {
    console.log(ownPostsId);
    const queriedPostId = [...ownPostsId];

    if (usersId.length > 0) {
      const users = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersColectionId,
        [Query.equal('$id', usersId)],
      );

      if (!users) throw Error;

      const postsId = users.documents.reduce(
        (acc, user) => [...acc, ...user.posts.map((post) => post.$id)],
        [],
      );

      queriedPostId.push(...postsId);
    }

    if (queriedPostId.length === 0) return [];

    const recentPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20),
        Query.equal('$id', queriedPostId),
      ],
    );

    if (!recentPosts) throw Error;

    return recentPosts.documents;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET RECENT POST -----------------------

export async function searchPosts({ searchTerm, searchType }) {
  const queries = ['equal', 'search'].map((cur) => [
    Query[cur](searchType, searchTerm),
    Query.orderDesc('$createdAt'),
  ]);

  try {
    let posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      queries[0],
    );

    if (posts && posts.documents.length > 0) return posts.documents;

    posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      queries[1],
    );

    if (!posts) throw Error;

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET POST BY ID -----------------------

export async function getPostById(postId) {
  console.log(postId);
  const queries =
    typeof postId === 'string'
      ? [Query.equal('$id', [postId])]
      : [Query.equal('$id', [...postId])];
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      queries,
    );

    if (!post) throw Error;

    if (typeof postId === 'string') return post.documents[0];
    else return post.documents;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET SAVED POSTS -----------------------
//IN FUTURE
// export async function getSavedPosts(saveParam) {
//   if (!saveParam) return;
//   const postId = saveParam.map((save) => save.post.$id);

//   if (postId.length === 0) return [];
//   const queries =
//     typeof postId === 'string'
//       ? [Query.equal('$id', [postId])]
//       : [Query.equal('$id', [...postId])];
//   try {
//     const post = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.postsColectionId,
//       queries,
//     );

//     if (!post) throw Error;

//     if (typeof postId === 'string') return post.documents[0];
//     else return post.documents;
//   } catch (error) {
//     console.log(error);
//   }
// }

// ----------------------- LIKE/UNLIKE POST -----------------------

export async function updateLikePost(postId, likeArray) {
  try {
    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsColectionId,
      postId,
      {
        likes: likeArray,
      },
    );

    if (!updatePost) throw Error;

    return updatePost;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- SAVE POST -----------------------

export async function createSave(userId, postId) {
  try {
    const updatePost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesColectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      },
    );

    if (!updatePost) throw Error;

    return updatePost;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- UNSAVE POST -----------------------

export async function deleteSave({ $id: saveId, post: { $id: postId } }) {
  try {
    const deletedSave = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesColectionId,
      saveId,
    );

    if (!deletedSave) throw Error;
    console.log(deletedSave);
    return postId;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- FILE -----------------------
// ----------------------- UPLOAD FILE -----------------------

export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- GET FILE URL -----------------------

export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      0,
      'center',
      100,
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ----------------------- DELETE FILE -----------------------

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}
