import customAxios from '../customAxios';

export const postFeedCommentReplyAxios = async (token: string, commentId: string, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export const postQnaCommentReplyAxios = async (token: string, commentId: string, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/answers/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: { content: comment },
  });
};
