import { QnaAnswerContentType } from '../../components/q&aDetail/_Q&ADetail.interface';
import customAxios from '../customAxios';

export const getQnaAnswerAxios = async (token: string, postId: string): Promise<QnaAnswerContentType[]> => {
  return await customAxios({
    method: 'get',
    url: `/community/posts/answers/${postId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
