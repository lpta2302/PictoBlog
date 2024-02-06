import { fun, sad, surfing, worry } from '../../../public/assets/images';

const imageUrls = {
  sad,
  worry,
  fun,
  surfing,
};

const icons = {
  hug: 'ヾ(〃ﾟーﾟ〃)ノ',
  sorry: '... ( 〃．．)ﾉ',
  enjoy: 'o(￣▽￣o)(o￣▽￣)o',
  sleepy: '(－‸ლ)',
  fun: 'ヽ(o＾▽＾o)ノ',
  cry: '(੭ ˃̣̣̥ ω˂̣̣̥)੭ु⁾⁾',
};

export default function Empty({ content, icon, imageUrl = 'fun' }) {
  return (
    <div className="flex-center flex-col w-full">
      <img
        src={imageUrls[imageUrl]}
        alt={'Empty'}
        className="dark:brightness-75 opacity-80 w-52"
      />
      <h1 className="text-center font-system font-semibold text-medium whitespace-pre-line">
        {content ||
          `Opp, seem to be nothing here, let
            follow someone to see more`}
      </h1>
      <span className="whitespace-nowrap">{icons[icon] || icons.enjoy}</span>
    </div>
  );
}
