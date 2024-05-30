import customAxios from '../customAxios';

export const putFeedCommentEditAxios = async (token: string, commentId: string, comment: string) => {
  return await customAxios({
    method: 'put',
    url: `/community/posts/comments/${commentId}/modify`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export const putQnaCommentEditAxios = async (token: string, commentId: string, comment: string) => {
  return await customAxios({
    method: 'put',
    url: `/community/answers/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: { content: comment },
  });
};
