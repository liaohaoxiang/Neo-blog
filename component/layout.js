import Link from 'next/link';
import Image from 'next/image';
// import profile from './images/profile.jpg';

const name = 'Neo Holk';
export const siteTitle = "Neo's Blog";

const Layout = ({ children, home }) => {
  return (
    <div className="max-w-xxl px-4 py-0 mt-12 mx-auto mb-24">
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <div className="flex justify-center">
              <img
                src={require('../public/images/profile.jpg?webp')}
                className="w-32 h-32 rounded-full"
                alt={name}
              />
            </div>
            <h1 className="flex justify-center text-xl">{name}</h1>
          </>
        ) : null
        // (
        //   <>
        //     <Link href="/">
        //       <a>
        //         <img
        //           src="/images/profile.jpg"
        //           className="w-32 h-32 rounded-full"
        //           alt={name}
        //         />
        //       </a>
        //     </Link>
        //     <h2>
        //       <Link href="/">
        //         <a className="text-xl">{name}</a>
        //       </Link>
        //     </h2>
        //   </>
        // )
        }
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-12">
          <Link href="/">
            <a>← 返回首页</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
