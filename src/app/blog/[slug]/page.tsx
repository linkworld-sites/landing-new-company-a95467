import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Navbar from '@/components/Navbar';
import FooterLabel from '@/components/sections/FooterLabel';
import Link from 'next/link';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Golden Batch`, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  return (
    <>
      <Navbar />
      <main className="bg-parchment min-h-screen pt-32 pb-20">
        <article className="mx-auto max-w-2xl px-6 md:px-12">
          <header className="mb-12">
            <Link
              href="/blog"
              className="font-label text-toasted-amber/70 text-[11px] hover:text-toasted-amber transition-colors"
            >
              ← Journal
            </Link>
            <time className="font-label text-toasted-amber/70 text-[11px] mt-4 block">
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <h1
              className="font-playfair text-molasses mt-3 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {post.title}
            </h1>
            <p className="font-dm-sans text-ink-brown/70 text-lg mt-4 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div
            className="prose-golden font-dm-sans text-ink-brown/85 text-base leading-[1.8]
              [&_h2]:font-playfair [&_h2]:text-molasses [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-playfair [&_h3]:italic [&_h3]:text-molasses [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-5
              [&_em]:font-playfair [&_em]:italic [&_em]:text-molasses
              [&_strong]:font-medium [&_strong]:text-molasses
              [&_blockquote]:border-l-2 [&_blockquote]:border-toasted-amber [&_blockquote]:pl-5 [&_blockquote]:my-8
              [&_blockquote_p]:font-playfair [&_blockquote_p]:italic [&_blockquote_p]:text-molasses [&_blockquote_p]:text-xl [&_blockquote_p]:mb-0
              [&_ul]:list-none [&_ul]:pl-0 [&_ul_li]:pl-4 [&_ul_li]:relative [&_ul_li:before]:content-['◆'] [&_ul_li:before]:absolute [&_ul_li:before]:left-0 [&_ul_li:before]:text-toasted-amber [&_ul_li:before]:text-[8px] [&_ul_li:before]:top-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </main>
      <FooterLabel />
    </>
  );
}
