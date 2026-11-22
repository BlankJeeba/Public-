import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { PageHead } from '../components/PageHead';

export default function Page2() {
  return (
    <>
      <PageHead
        title="Page 2 | BlankJeeba"
        description="Page 2"
        indexable={false}
        canonicalBasePath="/page2"
      />
      <div className="min-h-[60vh] p-4 sm:p-6">
        <Link
          to="/"
          aria-label="Home"
          title="Home"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-900/10 bg-white text-[#475569] transition-colors hover:border-[#4F46E5]/50 hover:text-[#0F172A] dark:border-white/[0.08] dark:bg-[#11141F] dark:text-[#9AA0B4] dark:hover:border-white/20 dark:hover:text-[#F3F4F8]"
        >
          <Home className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
