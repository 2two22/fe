import customAxios from '../customAxios';

export const deleteFeedCommentAxios = async (token: string, commentId: string) => {
  return await customAxios({
    method: 'delete',
    url: `/community/posts/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const deleteQnACommentAxios = async (token: string, commentId: string) => {
  return await customAxios({
    method: 'delete',
    url: `/community/answers/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
