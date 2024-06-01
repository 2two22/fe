import { ScrapListType } from '../../components/myProfile/_MyProfile.interface';
import customAxios from '../customAxios';

const getMyScrapList = async (token: string, page: number = 0, sort: string = 'POST_DATE', order: string = 'DESC'): Promise<ScrapListType> => {
  const response = (await customAxios({
    method: 'get',
    url: `/news/users/bookmark/list`,
    headers: {
      Authorization: token,
    },
  })) as ScrapListType;
  return response;
};

export default getMyScrapList;
