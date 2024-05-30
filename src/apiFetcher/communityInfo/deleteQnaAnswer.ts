import customAxios from '../customAxios';

const deleteQnaAnswerAxios = async (token: string, answerId: string) => {
  return await customAxios({
    method: 'delete',
    url: `/community/posts/answers/${answerId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default deleteQnaAnswerAxios;
