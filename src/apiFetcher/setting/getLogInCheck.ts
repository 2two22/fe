import customAxios from '../customAxios';

const getLogInCheckAxios = async (token: string): Promise<{ isAddInfo: boolean }> => {
  return await customAxios({
    method: 'get',
    url: `/user/check`,
    headers: {
      Authorization: token,
    },
  }
);
};

export default getLogInCheckAxios;
