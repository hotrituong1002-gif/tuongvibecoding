import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/server";
import { getLessonsForProduct } from "@/lib/queries/lessons";

export const metadata = {
  title: "Bài học",
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/dang-nhap?next=/hoc-vien/${slug}/${lessonId}`);

  const lessons = await getLessonsForProduct(slug);
  const index = lessons.findIndex((l) => l.id === lessonId);

  if (index === -1) notFound();

  const lesson = lessons[index];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href={`/hoc-vien/${slug}`}
        className="text-sm text-muted hover:text-gold"
      >
        ← Danh sách bài học
      </Link>

      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold">
        Bài {index + 1} / {lessons.length}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{lesson.title}</h1>

      {lesson.video_url && (
        <div className="mt-6 aspect-video overflow-hidden rounded-xl border border-border">
          <iframe
            src={lesson.video_url}
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      )}

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-a:text-gold">
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
        {prev ? (
          <Link
            href={`/hoc-vien/${slug}/${prev.id}`}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-gold hover:text-gold"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/hoc-vien/${slug}/${next.id}`}
            className="btn-gold rounded-full px-5 py-2.5 text-sm"
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            href="/hoc-vien"
            className="btn-gold rounded-full px-5 py-2.5 text-sm"
          >
            Hoàn thành — Về Học viện
          </Link>
        )}
      </div>
    </div>
  );
}
