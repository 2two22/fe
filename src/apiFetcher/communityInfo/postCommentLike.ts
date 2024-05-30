import customAxios from '../customAxios';

export const getFeedCommentLikeAxios = async (token: string, postId: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/comments/${postId}/like`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const postQnACommentLikeAxios = async (token: string, postId: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/answers/comments/${postId}/like`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
  });
};
