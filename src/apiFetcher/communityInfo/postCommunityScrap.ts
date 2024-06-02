import customAxios from '../customAxios';

const postCommunityScrapAxios = async (token: string, newsId: number) => {
  return await customAxios({
    method: 'post',
    url: `/News/users/bookmark`,
    headers: {
      Authorization: token,
      charset: 'utf-8',
    },
     data: { newsId: newsId },
  });
};

export default postCommunityScrapAxios;
