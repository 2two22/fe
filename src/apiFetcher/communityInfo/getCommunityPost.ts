import { CommunityPostListType, postType } from '../../components/community/_Community.interface';
import customAxios from '../customAxios';

const getCommunityPostAxios = async (
  token: string,
  word: string | null = null,
  sort: string = 'DATE',
  order: string = 'DESC',
  page: number = 0,
  size: number = 5,
  // 수정 필요
  postType: postType | 'ALL' = 'ALL'
): Promise<CommunityPostListType> => {
  return await customAxios({
    method: 'get',
    url: `/community/posts?page=${page}&size=${size}&postType=${postType}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default getCommunityPostAxios;
