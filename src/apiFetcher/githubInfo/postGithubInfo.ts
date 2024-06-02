import customAxios from '../customAxios';

const postGithubInfo = async (token: string) => {
  return await customAxios({
    method: 'post',
    url: '/Githubs/github',
    headers: {
      Authorization: token,
    },
  });
};

export default postGithubInfo;
