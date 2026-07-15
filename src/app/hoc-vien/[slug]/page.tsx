import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLessonsForProduct } from "@/lib/queries/lessons";

export const metadata = {
  title: "Bài học",
};

export default async function ProductLessonsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/dang-nhap?next=/hoc-vien/${slug}`);

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) notFound();

  const { data: unlock } = await supabase
    .from("unlocks")
    .select("product_slug")
    .eq("user_id", user.id)
    .eq("product_slug", slug)
    .maybeSingle();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const unlocked = Boolean(unlock) || profile?.role === "admin";

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="text-4xl">🔒</span>
        <h1 className="mt-4 text-2xl font-bold">Bạn chưa mở khóa sản phẩm này</h1>
        <p className="mt-2 text-sm text-muted">
          Nhập mã kích hoạt hoặc mua &quot;{product.title}&quot; để xem nội
          dung bài học.
        </p>
        <Link
          href="/hoc-vien"
          className="btn-gold mt-6 inline-block rounded-full px-8 py-3 text-sm"
        >
          Về Học viện
        </Link>
      </div>
    );
  }

  const lessons = await getLessonsForProduct(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/hoc-vien" className="text-sm text-muted hover:text-gold">
        ← Về Học viện
      </Link>
      <h1 className="mt-3 text-3xl font-bold">{product.title}</h1>
      <p className="mt-1 text-sm text-muted">{product.tag}</p>

      {lessons.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">
          Nội dung bài học đang được cập nhật, quay lại sau nhé.
        </p>
      ) : (
        <ol className="mt-8 space-y-3">
          {lessons.map((lesson, i) => (
            <li key={lesson.id}>
              <Link
                href={`/hoc-vien/${slug}/${lesson.id}`}
                className="card-panel flex items-center gap-4 rounded-xl px-5 py-4 transition-colors hover:border-gold/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                  {i + 1}
                </span>
                <span className="font-semibold">{lesson.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
