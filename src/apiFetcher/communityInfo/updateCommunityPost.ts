import customAxios from '../customAxios';

const updateCommunityPostAxios = async (token: string, postData: FormData, postId: string) => {
  return await customAxios({
    method: 'put',
    url: `/community/posts/${postId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: postData,
  });
};

export default updateCommunityPostAxios;
