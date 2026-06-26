import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import blogPosts from '@/lib/content/blog.json';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  return blogPosts.map((post: any) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p: any) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen pt-32 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <article className="glass p-8 rounded-2xl">
          <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6 flex items-center justify-center relative">
            <span className="text-6xl opacity-20">📄</span>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute bottom-4 right-4 text-xs bg-background/80 px-3 py-1 rounded-full text-primary border border-primary/20">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif gold-gradient mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {post.category}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || 'Full content here.'}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </section>
  );
}
