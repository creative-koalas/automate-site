import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="mb-4 text-3xl font-bold">页面未找到</h1>
      <p className="mb-8 text-white/70">抱歉，你访问的页面不存在。</p>
      <Link href="/" className="text-primary-400 hover:underline">
        返回首页
      </Link>
    </main>
  );
}
