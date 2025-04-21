"use client"


export default function NewsCard({
    title,
    summary,
    site,
    url,
  }: {
    title: string;
    summary: string;
    site: string;
    url: string;
  }) {
    return (
      <div
        className="border rounded-xl p-5 min-w-[300px] max-w-[400px] max-h-[400px] bg-gray-100 shadow-md  transition-transform duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-base text-gray-700 mb-4 leading-relaxed  text-sm line-clamp-2">{summary}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 italic">{site}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
  
  