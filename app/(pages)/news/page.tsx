"use client";

import React, { useEffect, useState } from "react";
import NewSearch from "@/components/pages/NewSearch";// adjust this import
import NewsCard from "@/components/pages/NewsCard";   // adjust this import

type Article = {
  title: string;
  summary: string;
  site?: string;
  url: string;
};

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch all news on mount (default topic = "cyber")
  useEffect(() => {
    fetchNews("cyber");
  }, []);

  const fetchNews = async (topic: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/get_news/${topic}`);
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (topic: string) => {
    fetchNews(topic);
  };

  return (
    <div className="p-6">
      <NewSearch onSearch={handleSearch} />
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-center mt-10">No articles found.</p>
      ) : (
        <div className="flex justify-around flex-wrap gap-3 ">
          {articles.map((article, idx) => (
            <NewsCard
              key={idx}
              title={article.title}
              summary={article.summary}
              site={article.site || "Unknown"}
              url={article.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
