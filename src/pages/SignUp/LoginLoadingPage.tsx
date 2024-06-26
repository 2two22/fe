import { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import getLogInCheckAxios from '../../apiFetcher/setting/getLogInCheck';
import { useGithubMutation } from '../../store/module/useGithubQuery';
import { useLogInCheckQuery } from '../../store/module/useSettingQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { getAccessToken } from '../../apiFetcher/userInfo/getAccessToken';
import loadingTree from '../../assets/loadingTree.png';

export default function LogInLoadingPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(loginUserInfo);

  //리액트 쿼리
  const { refetch, isError } = useLogInCheckQuery();
  const { mutateAsync } = useGithubMutation();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    (async () => {
      try {
        if (codeParams && !localStorage.getItem('accessToken')) {
          const userToken = await getAccessToken(codeParams);
          console.log(userToken);
          if (userToken) {
            const isCheckResponse = await getLogInCheckAxios(userToken.token as string);
            if (!isCheckResponse) {
              console.error('ERROR');
              navigate('/logIn');
              return;
            }
            setUserInfo(userToken);
            if (isCheckResponse?.isAddInfo && isCheckResponse?.isAddInfo === true) {
              setTimeout(async () => {
                navigate('/');
                await mutateAsync();
              }, 1000);
            } else {
              setTimeout(() => {
                navigate('/signUp');
              }, 1000);
            }
          }
        } else {
          console.log(userInfo);
          await refetch();
          setTimeout(async () => {
            navigate('/');
            await mutateAsync();
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        navigate('/logIn');
      }
    })();
  }, []);

  if (isError) console.log('error');

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center bg-lightIvory dark:bg-darkNavy">
      <div className="loadingTree animate-flip relative transform transition-transform duration-500">
        <img src={loadingTree} alt="loadingTree" />
      </div>
      <div className="mt-8 text-[30px] font-bold text-lightText dark:text-white">
        <span className="text-pointGreen">{`< `}</span>
        <span>My Little Forest</span>
        <span className="text-pointGreen">{` />`}</span>
      </div>
      <div className="mb-20 mt-12 text-center text-[20px] font-bold text-lightText dark:text-white">
        <div className="">마이 리틀 포레스트에 오신 것을 환영해요</div>
        <div className="mt-4">깃허브를 통해 로그인 중이에요</div>
      </div>
      <div className="shadow-indigo-500/40 absolute bottom-16 flex h-14 w-[90%] items-center justify-center rounded-full bg-midIvory text-[18px] font-bold text-lightText shadow-sm transition-all dark:bg-lightNavy dark:text-white">
        <AiFillGithub />
        <span className="mx-1">깃허브로 로그인 중...</span>
      </div>
    </section>
  );
}
