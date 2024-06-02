import { NewsDetailType, ScrapListType } from '../../components/myProfile/_MyProfile.interface';
import { NewsListType } from '../../components/news/_News.interface';
import customAxios from '../customAxios';

const getMyScrapList = async (token: string, page: number = 0, sort: string = 'POST_DATE', order: string = 'DESC'): Promise<NewsDetailType[]> => {
  return await customAxios({
    method: 'get',
    url: `/News/users/bookmark/list`,
    headers: {
      Authorization: token,
    },
  });
};

export default getMyScrapList;
