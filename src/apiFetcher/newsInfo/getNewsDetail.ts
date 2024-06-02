import { NewsDetailType } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getNewsDetailAxios = async (token: string, id: number): Promise<NewsDetailType> => {
  return await customAxios({
    method: 'get',
    url: `/News/news/detail/${String(id)}`,
    headers: {
      Authorization: token,
    },
  });
};

export default getNewsDetailAxios;
