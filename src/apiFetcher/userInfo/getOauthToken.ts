import customAxios from '../customAxios';

const getOauthTokenAxios = async () => {
  return await customAxios({
    method: 'get',
    url: `/user/users`,
  });
};

export default getOauthTokenAxios;
