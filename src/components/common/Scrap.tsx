import { IoIosBookmark } from "react-icons/io";
import { FcLike, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useRecoilValue } from 'recoil';
import { useNewsScrapMutation } from '../../store/module/useNewsQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { ScrapPropsType } from './_Common.interface';

export default function Scrap({ newsId, refetch, scrap }: ScrapPropsType) {
  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);
  console.log("scrp");
  console.log(scrap);

  // 리액트 쿼리
  const { mutateAsync: scrapMutate } = useNewsScrapMutation(newsId, logInUserInfo?.id as number);

  return (
    <div className="flex w-full flex-col justify-between text-[13px] text-white xx">
   <div className="flex gap-6">
      <div
        className="flex cursor-pointer items-center justify-end gap-2"
        onClick={async (e) => {
          e.stopPropagation();
          await scrapMutate();
          refetch && refetch();
        }}
      >
        {/* 여기서 아이콘을 추가합니다 */}
        {scrap ? (
          <IoIosBookmark style={{ color: 'yellow' }} size={27} />
        ) : (
          <IoIosBookmark className="opacity-50 brightness-[5]" size={27} />
        )}
        {/* 스크랩 텍스트 */}
        스크랩
      </div>
    </div> 
  </div>
  );
}
