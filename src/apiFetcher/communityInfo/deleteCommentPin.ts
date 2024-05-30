import customAxios from '../customAxios';

export const deleteFeedCommentPinAxios = async (token: string, postId: string) => {
  return await customAxios({
    method: 'delete',
    url: `/community/posts/${postId}/comments/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const deleteQnACommentPinAxios = async (token: string, answerId: string) => {
  return await customAxios({
    method: 'delete',
    url: `/community/posts/qna-answers/${answerId}/qna-comments/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
