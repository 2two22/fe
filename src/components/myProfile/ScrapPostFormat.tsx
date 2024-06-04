import { FcCheckmark, FcPortraitMode } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LikeCommentScrap from '../common/LikeCommentScrap';
import ImagePeek from '../common/ImagePeek';
import PicModal from '../common/PicModal';
import { S3_URL } from '../../constant/union';
import { timeForToday } from '../../utils/timeForToday';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import { MyProfileType, ScrapPostContentType } from './_MyProfile.interface';
import LazyLoadImage from '../../utils/LazyLoadImage';
import NewsPosts from '../../components/news/NewsPosts';
import { NewsListType, NewsDetailType } from '../news/_News.interface';
interface ScrapPostFormatPropsType {
  refetch: () => void;
  userData: MyProfileType;
  resultData: NewsDetailType[];
  myProfileRefetch: () => void;
  myScrapsIsLoading: boolean;
}

export default function ScrapPostFormat({ refetch, userData, resultData, myProfileRefetch, myScrapsIsLoading }: ScrapPostFormatPropsType) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number>();

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  //리액트 쿼리
  // const { mutateAsync } = useFollowMutation(Number(userId));

  // // follow 클릭
  // const handleClickFollow = async (e: React.MouseEvent<HTMLElement>, memberId: number) => {
  //   setUserId(memberId);
  //   e.stopPropagation();
  //   await mutateAsync();
  //   myProfileRefetch();
  //   refetch();
  // };

  if (myScrapsIsLoading) {
    return <div className="mb-6 flex h-[298px] w-full flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>;
  }

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <ul className="w-full">
        {resultData && userData && resultData.length > 0 ? (
          <NewsPosts isLoading={myScrapsIsLoading} newsData={resultData} />
        ) : (
          <div className="mb-6 flex h-[298px] flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="flex h-[200px] w-full items-center justify-center p-4 text-base font-semibold text-lightText dark:text-white">스크랩된 게시글이 없습니다.</div>
          </div>
        )}
      </ul>
    </>
  );
}
