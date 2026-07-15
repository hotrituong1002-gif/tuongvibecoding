import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Lesson } from "@/lib/types";
import { createLesson, deleteLesson } from "../actions";

export const metadata = {
  title: "Quản trị — Bài học sản phẩm",
};

export default async function AdminProductLessonsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) notFound();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("product_slug", slug)
    .order("sort_order", { ascending: true });

  const list = (lessons ?? []) as Lesson[];

  return (
    <div>
      <Link href="/admin/lessons" className="text-sm text-muted hover:text-gold">
        ← Tất cả sản phẩm
      </Link>
      <h1 className="mt-3 text-2xl font-bold">{product.title}</h1>
      <p className="mt-1 text-sm text-muted">
        {list.length} bài học hiện có.
      </p>

      <div className="mt-8 space-y-3">
        {list.map((lesson, i) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between rounded-xl border border-border bg-panel px-5 py-4"
          >
            <div>
              <p className="text-xs text-muted">Bài {i + 1}</p>
              <p className="font-semibold">
                {lesson.title}{" "}
                {!lesson.is_active && (
                  <span className="ml-2 rounded-full bg-panel-2 px-2 py-0.5 text-xs text-muted">
                    Đã ẩn
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/lessons/${slug}/${lesson.id}`}
                className="text-sm font-semibold text-gold hover:underline"
              >
                Sửa
              </Link>
              <form action={deleteLesson.bind(null, slug, lesson.id)}>
                <button className="text-sm font-semibold text-red-400 hover:underline">
                  Xoá
                </button>
              </form>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted">
            Chưa có bài học nào.
          </p>
        )}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-panel p-6">
        <h2 className="font-bold">Thêm bài học mới</h2>
        <form action={createLesson.bind(null, slug)} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">
              Tiêu đề
            </label>
            <input
              required
              name="title"
              className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">
              Link video nhúng (tuỳ chọn, dạng embed URL)
            </label>
            <input
              name="video_url"
              placeholder="https://www.youtube.com/embed/..."
              className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">
              Nội dung (hỗ trợ Markdown: ## tiêu đề, - gạch đầu dòng, **đậm**)
            </label>
            <textarea
              required
              name="content"
              rows={12}
              className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-gold"
            />
          </div>
          <button className="btn-gold rounded-full px-6 py-2.5 text-sm">
            Thêm bài học
          </button>
        </form>
      </div>
    </div>
  );
}
