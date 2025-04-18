"use client"
import React, { useEffect, useState } from "react";
import NewsCard from "@/components/pages/NewsCard";


type Article = {
    title: string;
    summary: string;
    link: string;
};


const News = () => {
    const [newsData, setNewsData] = useState<Article[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get_news/");
                const data = await response.json();
                setNewsData(data.articles); // assuming your Django API returns { articles: [...] }
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="flex  justify-around flex-wrap gap-4 ">
            {newsData.map((cardData, index) => (
                <NewsCard
                    key={index}
                    title={cardData.title}
                    summary={cardData.summary}
                    site={new URL(cardData.link).hostname}
                    url={cardData.link}
                />
            ))}
        </div>
    );
};

export default News;
