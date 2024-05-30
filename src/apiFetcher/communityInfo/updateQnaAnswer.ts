import customAxios from '../customAxios';

export const updateQnaAnswerAxios = async (token: string, answerId: string, answerPost: FormData) => {
  return await customAxios({
    method: 'put',
    url: `/community/posts/answers/${answerId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: answerPost,
  });
};
