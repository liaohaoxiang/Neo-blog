import Link from 'next/link';
import Image from 'next/image';

const name = 'Neo Holk';
export const siteTitle = "Neo's Blog";

const Layout = ({ children, home }) => {
  return (
    <div className="max-w-xxl px-4 py-0 mt-12 mx-auto mb-24">
      <header className="flex flex-col items-center">
        {home ? (
          <>
            <div className="flex justify-center"> 
              <Image
                  src={'/images/profile.jpg'}
                  width={128}
                  height={128}
                  className="avatar"
                  alt={name}
                />
                <style jsx global>{`
                  .avatar {
                    border-radius: 9999px;
                  }
                `}</style>
            </div>
            <h1 className="flex justify-center text-xl">{name}</h1>
          </>
        ) : null
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
