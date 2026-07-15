import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Lesson } from "@/lib/types";
import { updateLesson } from "../../actions";

export const metadata = {
  title: "Quản trị — Sửa bài học",
};

export default async function AdminEditLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const supabase = await createClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .maybeSingle<Lesson>();

  if (!lesson) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Sửa bài học</h1>
      <form
        action={updateLesson.bind(null, slug, lessonId)}
        className="mt-6 max-w-2xl space-y-4"
      >
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Tiêu đề
          </label>
          <input
            required
            name="title"
            defaultValue={lesson.title}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Link video nhúng (tuỳ chọn)
          </label>
          <input
            name="video_url"
            defaultValue={lesson.video_url ?? ""}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Nội dung (Markdown)
          </label>
          <textarea
            required
            name="content"
            rows={16}
            defaultValue={lesson.content}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Thứ tự hiển thị
          </label>
          <input
            type="number"
            name="sort_order"
            defaultValue={lesson.sort_order}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={lesson.is_active}
            className="h-4 w-4 rounded border-border"
          />
          Hiển thị cho học viên
        </label>
        <button className="btn-gold rounded-full px-6 py-2.5 text-sm">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
