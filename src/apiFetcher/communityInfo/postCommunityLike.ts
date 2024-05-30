import customAxios from '../customAxios';

const postCommunityLikeAxios = async (token: string, postId: string) => {
  return await customAxios({
    method: 'post',
    url: `/community/posts/${postId}/like`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
  });
};

export default postCommunityLikeAxios;
