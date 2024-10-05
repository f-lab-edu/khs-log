import Image from '@/components/Image'

interface Props {
  position?: 'left' | 'right'
  isLogin: boolean
  isSideBarVisible?: boolean
}

const Profile = ({position = 'left', isLogin, isSideBarVisible}: Props) => (
  <div>
    <div
      className={`flex items-center ${
        isSideBarVisible ? 'justify-center' : 'px-2.5 py-2.5 pb-4.5'
      }`}>
      <div className="relative w-10 h-10 flex items-center">
        <Image
          className="rounded-full object-cover"
          src={isLogin ? '/images/smileHeart.png' : '/images/sleepyFace.png'}
          width={30}
          height={30}
          alt="profile"
        />
        <div
          className={`absolute -right-0.75 -bottom-0.75 w-4.5 h-4.5 ${isLogin ? 'bg-primary-2' : 'bg-n-4'}  rounded-full border-4 border-n-6`}
        />
      </div>
      {position === 'left' && !isSideBarVisible ? (
        <div className="text-n-1 base2 font-extrabold">khs-log</div>
      ) : null}
    </div>
  </div>
)

export default Profile
