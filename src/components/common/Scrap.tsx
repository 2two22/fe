import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useRecoilValue } from 'recoil';
import { useNewsScrapMutation } from '../../store/module/useNewsQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { ScrapPropsType } from './_Common.interface';

export default function Scrap({ newsId, refetch, scrap }: ScrapPropsType) {
  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  // 리액트 쿼리
  const { mutateAsync: scrapMutate } = useNewsScrapMutation(newsId, logInUserInfo?.id as number);

  return (
    <div className="flex h-[54px] w-full items-center justify-between rounded-b-[20px] bg-[#A49C7C] p-4 text-base text-white dark:bg-[#2C2E34]">
      <div
        className="flex cursor-pointer items-center justify-end gap-2"
        onClick={async (e) => {
          e.stopPropagation();
          await scrapMutate();
          refetch && refetch();
        }}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
          <path fill={scrap ? `#f9e288` : '#ffffff80'} d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
        </svg>
        {`스크랩`}
      </div>
    </div>
  );
}
