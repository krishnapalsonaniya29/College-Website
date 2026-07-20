import { useEffect, useState } from "react";
import { CalendarDays, Download, FileText } from "lucide-react";

import api from "@/lib/api";

interface News {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  publishedAt: string;
}

function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");
        setNews(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading news...
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-20 text-center text-gray-500">
        No news available.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {news.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
        >
          <div className="grid md:grid-cols-[320px_1fr]">
            {/* Image */}
            <div className="relative bg-gray-100">
                  {item.imageUrl ? (
                    <>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />

                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="absolute bottom-4 right-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
                      >
                        Download Image
                      </a>
                    </>
                  ) : (
                    <div className="flex h-64 items-center justify-center">
                      <FileText
                        size={70}
                        className="text-gray-400"
                      />
                    </div>
                  )}
                </div>

            {/* Content */}
            <div className="flex flex-col p-7">
              <div className="mb-3 flex items-center gap-2 text-sm text-blue-700">
                <CalendarDays size={18} />

                {new Date(
                  item.publishedAt
                ).toLocaleDateString()}
              </div>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {item.title}
              </h2>

              <p className="whitespace-pre-line leading-7 text-gray-700">
                {item.description}
              </p>

              {item.pdfUrl && (
                <div className="mt-8">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                  >
                    <Download size={18} />
                    Download Attachment
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;