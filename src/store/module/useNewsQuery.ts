import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getNewsDetailAxios from '../../apiFetcher/newsInfo/getNewsDetail';
import getNewsList from '../../apiFetcher/newsInfo/getNewsList';
import { loginUserInfo } from '../recoil/user';
import { useMyScrapsQuery } from './useMyProfileQuery';
import postCommunityScrapAxios from '../../apiFetcher/communityInfo/postCommunityScrap';

export function useNewsQuery(inputKeyword: string, sort: boolean, order: boolean, filterKeywords: string) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useInfiniteQuery(
    ['newsList', inputKeyword, sort, order, filterKeywords],
    ({ pageParam = 0 }) => getNewsList(loginUser?.token as string, pageParam, inputKeyword, sort, order, filterKeywords),
    {
      getNextPageParam: (prevData, allPages) => {
        const lastPage = prevData.last;
        const nextPage = allPages.length;
        return lastPage ? undefined : nextPage;
      },
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 0,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    }
  );
}


export function useNewsScrapMutation(newsId: number, userId: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  const { refetch: myScrapRefetch } = useMyScrapsQuery('POST_DATE');
  const { refetch: detailRefetch } = useNewsDetailQuery(newsId);
  // const { refetch: myPageRefetch } = useMyScrapsQuery(userId, postType);
  return useMutation(() => postCommunityScrapAxios(loginUser?.token as string, newsId), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      detailRefetch();
      // myPageRefetch();
      myScrapRefetch();
      console.log('게시물 스크랩 상태 변경 반영됨');
    },
  });
}

export function useNewsDetailQuery(id: number) {
  //리코일
  const loginUser = useRecoilValue(loginUserInfo);
  return useQuery(['newsDetail', id], () => getNewsDetailAxios(loginUser?.token as string, id), {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
}
