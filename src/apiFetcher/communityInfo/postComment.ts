import customAxios from '../customAxios';

export const postFeedCommentAxios = async (token: string, postId: string, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/${postId}/comments`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export const postQnaCommentAxios = async (token: string, answerId: string, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/answers/${answerId}/comments`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: { content: comment },
  });
};
