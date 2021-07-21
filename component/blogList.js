import Link from 'next/link';

const BlogList = ({ blogData,current }) => {
  const list = blogData.filter(item => item.kind === current)
  return (
    <>
      <ul className="nav__list-style-none">
        {list.map(({ id, date, title }) => (
          <li className="mt-5 p-0" key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className="text-gray-700">{date}</small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
