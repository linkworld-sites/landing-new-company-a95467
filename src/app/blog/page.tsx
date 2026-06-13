import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FooterLabel from '@/components/sections/FooterLabel';

export const metadata = {
  title: 'Journal — Golden Batch',
  description: 'Seasonal writing from the kitchen.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="bg-parchment min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <header className="mb-16">
            <span className="font-label text-toasted-amber text-xs">From the Kitchen</span>
            <h1
              className="font-playfair text-molasses mt-3 leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Journal
            </h1>
            <p className="font-dm-sans text-ink-brown/70 text-base mt-4 leading-relaxed max-w-md">
              Seasonal notes, ingredient stories, and the occasional recipe that doesn&apos;t
              make it into the box.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="font-dm-sans text-ink-brown/50 text-base">No posts yet.</p>
          ) : (
            <ul className="divide-y divide-oat-cream">
              {posts.map((post) => (
                <li key={post.slug} className="py-10">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <time className="font-label text-toasted-amber/70 text-[11px]">
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <h2
                      className="font-playfair text-molasses mt-2 mb-3 leading-tight group-hover:text-toasted-amber transition-colors duration-200"
                      style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                    >
                      {post.title}
                    </h2>
                    <p className="font-dm-sans text-ink-brown/70 text-base leading-relaxed max-w-2xl">
                      {post.description}
                    </p>
                    <span className="font-label text-toasted-amber text-[11px] mt-4 inline-block group-hover:underline">
                      Read more →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <FooterLabel />
    </>
  );
}
