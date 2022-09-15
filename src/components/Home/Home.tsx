import Marquee from 'react-fast-marquee';
import style from 'components/Home/Home.module.scss';

const IMAGES = [
  // '/images/alex_nft1.jpeg',
  // '/images/alex_nft2.jpeg',
  '/images/alex_nft3.jpeg',
  '/images/alex_nft4.jpeg',
  '/images/alex_nft5.jpeg',
  '/images/alex_nft6.jpeg',
];

export const Home = () => {
  return (
    <div>
      <Marquee
        className={style.marquee}
        gradient={false}
      >
        {IMAGES.map((src) => (
          <div key={src} className={style.imgWrapper}>
            <img className={style.img} src={src} alt="" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};
