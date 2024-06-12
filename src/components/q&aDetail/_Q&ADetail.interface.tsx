import { CommunityPostPageableType, MemberLevelType, PostSortType, PostStatusType } from '../community/_Community.interface';

/** CommunityQADetailAnswer 컴포넌트 props 타입 - qna 답변 컴포넌트 */
export interface CommunityQADetailAnswerProps {
  isCommentOpen: boolean;
  setIsCommentOpen: (x: boolean) => void;
  answerPin: boolean;
  setAnswerPin: (x: boolean) => void;
  questionUserId: number;
  setIsActiveComment?: (x: boolean) => void;
}

/** getQnaAnswerAxios */
interface QnaAnswerContentMemberType {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: string;
  level: MemberLevelType;
  nickName: string;
  profileUrl: null | string;
  job: null | string;
  status: string;
  introduceMessage: null | string;
  addInfoYn: boolean;
  enabled: boolean;
  username: string;
  password: null | string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: {
    authority: string;
  }[];
  oauthAccessToken: string;
  credentialsNonExpired: false;
}
export interface QnaAnswerContentType {
  like: boolean;
  follow: boolean;
  id: string;
  user: QnaAnswerContentMemberType;
  content: string;
  commentCount: number;
  likeCount: number;
  qnaAnswerStatus: PostStatusType;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  imageUrls: string[];
}
export interface QnaAnswerType {
  content: QnaAnswerContentType[];
  pageable: CommunityPostPageableType;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: PostSortType;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
