import customAxios from '../customAxios';

export const postQnaAnswerPinAxios = async (token: string, answerId: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/answers/${answerId}/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default postQnaAnswerPinAxios;
