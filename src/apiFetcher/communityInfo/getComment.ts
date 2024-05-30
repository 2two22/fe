import { CommunityCommentType } from '../../components/community/_Community.interface';
import customAxios from '../customAxios';

// 개발 피드 댓글
export const getFeedCommentAxios = async (token: string, page: number = 0, postId: string): Promise<CommunityCommentType> => {
  return await customAxios({
    method: 'get',
    url: `/community/posts/${postId}/comments?page=${page}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

// QnA 피드 댓글
export const getQnACommentAxios = async (token: string, page: number = 0, postId: string): Promise<CommunityCommentType> => {
  return await customAxios({
    method: 'get',
    url: `/community/answers/${postId}/comments?page=${page}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
