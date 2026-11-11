import Link from 'next/link';

type Feature = { icon: string; title: string; desc: string; href: string };

const features: Feature[] = [
  { icon: '🔢', title: 'Counter', desc: 'createSlice, PayloadAction, typed hooks', href: '/counter' },
  { icon: '📝', title: 'Todo', desc: 'prepare, nanoid, createSelector', href: '/todos' },
  { icon: '🛒', title: 'Shop', desc: 'createAsyncThunk, giỏ hàng', href: '/products' },
  { icon: '🗒️', title: 'Notes', desc: 'Route Handlers + RTK Query', href: '/notes' },
];

export default function Home() {
  return (
    <>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Next.js +{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Redux Toolkit
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Quản lý state toàn cục đúng chuẩn App Router, giao diện bằng Tailwind CSS.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-4xl">{f.icon}</div>
            <h2 className="mt-4 text-lg font-semibold group-hover:text-blue-600">{f.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}