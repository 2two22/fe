import customAxios from '../customAxios';

export const deleteCommunityPostAxios = async (token: string, id: string): Promise<number> => {
  return await customAxios({
    method: 'delete',
    url: `/community/posts/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
