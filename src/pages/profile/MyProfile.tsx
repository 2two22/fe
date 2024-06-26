import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import FooterMenu from '../../components/common/FooterMenu';
import ScrapPostFormat from '../../components/myProfile/ScrapPostFormat';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';
import FeedPostFormat from '../../components/myProfile/FeedPostFormat';
import MyProfileHeader from '../../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../../components/myProfile/MyProfileInfo';
import MyProfileMenu from '../../components/myProfile/MyProfileMenu';
import { S3_URL } from '../../constant/union';
import { useMyProfileQuery, useMyScrapsQuery } from '../../store/module/useMyProfileQuery';
import { useProfilePostQuery } from '../../store/module/useProfilePostQuery';
import { MyProfileType, NewsDetailType, ScrapPostContentType } from '../../components/myProfile/_MyProfile.interface';
import { OrderType, SortType } from '../../components/community/_Community.interface';
import ProfileSort, { ProfilePostSortType } from '../../components/myProfile/ProfileSort';
import { useRecoilState } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';
import { NewsListType } from '../../components/news/_News.interface';

export default function MyProfile() {
  const initialPostView = useParams();
  const [postView, setPostView] = useState(initialPostView.filter ?? 'FEED');
  const navigate = useNavigate();

  // Recoil 로그인유저 정보
  const [logInUser, setLogInUser] = useRecoilState(loginUserInfo);

  // 정렬
  const [sortAndOrder, setSortAndOrder] = useState<{ sort: SortType | ProfilePostSortType; order: OrderType }>({
    sort: 'DATE',
    order: 'DESC',
  });
  const [scrapSortAndOrder, setScrapSortAndOrder] = useState<{ sort: SortType | ProfilePostSortType; order: OrderType }>({
    sort: 'POST_DATE',
    order: 'DESC',
  });

  // 리액트 쿼리
  const { data: myProfileData, isLoading: myProfileIsLoading, error: myProfileError, refetch: MyProfileRefetch, isPreviousData } = useMyProfileQuery();
  useEffect(() => {
    console.log(isPreviousData);
    if (!isPreviousData) {
      setLogInUser({
        ...logInUser,
        nickName: myProfileData?.nickName,
        description: myProfileData?.description,
        job: myProfileData?.job,
        level: myProfileData?.level,
        numberOfFollowers: myProfileData?.numberOfFollowers,
        numberOfPosts: myProfileData?.numberOfPosts,
        profileUrl: myProfileData?.profileUrl,
      });
    }
  }, []);
  console.log(logInUser);

  const {
    data: myScrapsData,
    isLoading: myScrapsIsLoading,
    error: myScrapsError,
    isFetching: myScrapsIsFetching,
    refetch: myScrapsRefetch,
  } = useMyScrapsQuery(postView !== 'scrap' ? 'POST_DATE' : scrapSortAndOrder.sort, scrapSortAndOrder.order);

  const {
    data: profilePostData,
    isLoading: profilePostIsLoading,
    error: profilePostError,
    isFetching: profilePostIsFetching,
    isFetchingNextPage: profilePostIsFetchingNextPage,
    fetchNextPage: profilePostFetchNextPage,
    hasNextPage: profilePostHasNextPage,
    refetch: profilePostRefetch,
  } = useProfilePostQuery(Number(myProfileData?.id), postView === 'scrap' ? 'ALL' : postView.toUpperCase(), postView === 'scrap' ? 'DATE' : (sortAndOrder.sort as SortType), sortAndOrder.order);

  // 인피니티 스크롤
  const { ref, inView } = useInView();

  useEffect(() => {
    // if (postView === 'scrap' && inView) myScrapsFetchNextPage();
    if ((postView === 'qna' || postView === 'feed') && inView && profilePostHasNextPage && !profilePostIsFetching && !profilePostIsFetchingNextPage) profilePostFetchNextPage();
  }, [inView]);

  //페이지 리패칭
  useEffect(() => {
    if (postView === 'scrap') myScrapsRefetch();
  }, [postView, myScrapsIsLoading, myProfileIsLoading]);

  useEffect(() => {
    if (myProfileData && (postView === 'feed' || postView === 'qna')) profilePostRefetch();
  }, [postView, profilePostIsLoading, myProfileIsLoading]);

  
  if (myProfileError || myScrapsError || profilePostError) {
    navigate('/NotFound');
  }

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 pt-0 text-lightText dark:bg-darkNavy dark:text-white">
        <MyProfileHeader
          userId={myProfileData?.userId as string}
          job={myProfileData?.job as string}
          nickName={myProfileData?.nickName as string}
          profileUrl={(S3_URL + myProfileData?.profileUrl) as string}
          description={myProfileData?.description as string}
          isLoading={myProfileIsLoading}
        />
        <MyProfileInfo
          scrap={myProfileData?.numberOfScraps as number}
          followers={myProfileData?.numberOfFollowers as number}
          follows={myProfileData?.numberOfFollows as number}
          posts={myProfileData?.numberOfPosts as number}
          isLoading={myProfileIsLoading}
        />
        <MyProfileMenu postView={postView} setPostView={setPostView} />
        {postView !== 'scrap' && (
          <FeedPostFormat userData={myProfileData} resultData={profilePostData?.pages.flatMap((page) => page.content)} refetch={profilePostRefetch} profilePostIsLoading={profilePostIsLoading} />
        )}
        {postView === 'scrap' && (
          <ScrapPostFormat
            myScrapsIsLoading={myScrapsIsLoading}
            refetch={myScrapsRefetch}
            myProfileRefetch={MyProfileRefetch}
            userData={myProfileData as MyProfileType}
            resultData={myScrapsData as NewsDetailType[]}
          />
        )}
      </div>
      <div ref={ref} />
      <FooterMenu />
    </section>
  );
}
