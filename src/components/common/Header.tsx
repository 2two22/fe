import { throttle } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import NotiBtn from './NotiBtn';
import MainBtn from '../common/MainBtn';
import { AiFillCopy } from 'react-icons/ai';
import { MdOutlineRestartAlt } from 'react-icons/md';
import EditDeleteBtn from './EditDeleteBtn';
import ConfirmModal from './ConfirmModal';
import { CommonHeaderType } from './_Common.interface';
// import { useUnreadNotificationCountQuery } from '../../store/module/useNotificationQuery';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';

export default function Header({ type, title, restart, isLoading, icon, onSubmit, postId, copyUrl, answerPin, questionUserId }: CommonHeaderType) {
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const navigate = useNavigate();
  const url = useLocation();
  const [isCopy, setIsCopy] = useState<boolean>(false);

  // 스크롤에 따른 반응형 헤더
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;

        if (beforeScrollY.current < currentScrollY && currentScrollY > 50) {
          setVisible(false);
          setIsMenu(false);
        } else {
          setVisible(true);
          setIsMenu(false);
        }
        beforeScrollY.current = currentScrollY;
      }, 250),
    [beforeScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenu, setIsMenu] = useState<boolean>();

  // confirm Modal
  const [confirmModal, setConfirmModal] = useState(false);
  const getModalAnswer = () => {};
  const withdrawalText = '작성한 내용이 저장되지 않습니다.\n정말 페이지를 이동하시겠습니까?';
  const action = () => {
    navigate(-1);
  };

  // const { data } = useUnreadNotificationCountQuery();

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  //Refresh btn click
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClickRefreshBtn = () => {
    if (restart) restart();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  const handleClickCopyBtn = () => {
    navigator.clipboard.writeText((copyUrl ??= ''));
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 900);
  };

  return (
    <>
      {type === 'news' && (
        <div
          className={
            'fixed bottom-[50px] z-0 flex h-[50px] items-center justify-center gap-1 rounded-full bg-pointGreen px-4 text-base text-white opacity-0 transition-all delay-300 ease-in dark:bg-pointGreen ' +
            (isCopy ? '!z-20 opacity-100' : '')
          }
        >
          뉴스 URL이 복사되었습니다!
        </div>
      )}
      <div className={'fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-lightIvory p-4 py-5 transition-all dark:bg-darkNavy ' + (visible ? '' : 'hidden')}>
        <div className="flex items-center gap-3 text-[26px] font-bold">
          {type === 'category' ? (
            <div className="rounded-xl bg-white p-1">{icon}</div>
          ) : (
            <div
              onClick={() => {
                url.pathname.includes('post') || url.pathname.includes('answer') ? setConfirmModal(true) : navigate(-1);
              }}
              className="cursor-pointer rounded-xl p-1"
            >
              {icon}
            </div>
          )}
          <div className="flex gap-2">
            <h1>{title}</h1>
            {restart && (
              <MdOutlineRestartAlt onClick={handleClickRefreshBtn} className={`transform cursor-pointer transition-transform duration-500 ${isLoading || isClicked ? 'animate-spin' : ''}`} />
            )}
          </div>
        </div>
        {type === 'news' && <AiFillCopy size={26} className="cursor-pointer" onClick={handleClickCopyBtn} />}
        {type === 'community' && (!answerPin ?? true) && questionUserId === logInUserInfo?.id && <BsThreeDots size={26} onClick={() => setIsMenu(!isMenu)} className="cursor-pointer" />}
        {isMenu && <EditDeleteBtn postId={String(postId)} setIsMenu={setIsMenu} />}
        {type === 'withMainBtn' && <MainBtn onSubmit={onSubmit} content={'완료'} size={20} />}
        {type === 'withMainBtn' && (
          <ConfirmModal action={action} confirmModal={confirmModal} setConfirmModal={setConfirmModal} getModalAnswer={getModalAnswer} title="" des={withdrawalText} confirmBtn="뒤로가기" />
        )}
      </div>
    </>
  );
}
