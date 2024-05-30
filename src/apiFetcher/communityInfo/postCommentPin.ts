import customAxios from '../customAxios';

export const postFeedCommentPinAxios = async (token: string, postId: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/comments/${postId}/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const postQnACommentPinAxios = async (token: string, commentId: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/qna-answers/qna-comments/${commentId}/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
