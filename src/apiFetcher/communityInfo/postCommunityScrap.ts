import customAxios from '../customAxios';

const postCommunityScrapAxios = async (token: string, newsId: number) => {
  return await customAxios({
    method: 'post',
    url: `/news/users/bookmark?newsId=${newsId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
  });
};

export default postCommunityScrapAxios;
