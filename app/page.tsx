"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CardImpList from "./components/CardImpList";
import { formatDaytoDayAgo } from "./utils/timeFormatter";
import "./globals.css";
import * as Constants from './constants'
import { CATCH_COPY } from "./constants";

export default function DetailsPage() {
  const [loaded, setLoaded] = useState(false);
  const [notionImpData, setnotionImpData] = useState<{ title: string; updateUser: string; lastEditBy: string; icon:string; link: string }[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoaded(true);

    const fetchnotionImpData = async () => {
      try {
        const response = await fetch("/api/notionImportant", { method: "POST" });
        if (!response.ok) throw new Error("Failed to fetch notionImp data");

        const data = await response.json();
        console.log("aaa");
        console.log(data.results);
        const extractedData = data.results.map((item: any) => ({
          title: item.properties.Name?.title[0]?.text?.content || Constants.TITLE,
          updateUser: item.properties.updatedUser?.last_edited_by?.name || Constants.MOVEE_USER,
          lastEditBy: formatDaytoDayAgo(item.last_edited_time),
          icon: item.properties?.icon?.select?.name
          ? `/images/eyecatch/${item.properties.icon.select.name}.png`
          : Constants.OPEN_GRAPH_IMAGE, // アイコンURLを絶対URLに変換
          link: `/blog/${item.id}`,
        }));
        console.log("extractedData");
        console.log(extractedData);
        setnotionImpData(extractedData);
      } catch (error) {
        console.error("notionImp APIの取得エラー:", error);
      }
    };

    fetchnotionImpData();
  }, []);

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <main className="flex flex-col justify-between min-h-screen p-6 max-w-3xl mx-auto">
      <p className="text-center mb-6">{CATCH_COPY}</p>
      <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-2">経歴</h2>
</section>

      <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-2">お受けできること</h2>
  <ul className="list-disc pl-5 space-y-1">
    <li>ソフトウェア開発</li>
    <li>エンジニア採用やIT予算検討などのIT全般業務</li>
    <li>情シス向けUML教育</li>
  </ul>
</section>
<section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">開発ソフトウェア</h2>
        <p>自由にダウンロード・利用可能なプログラムを提供</p>
        <div className="mb-4"></div>
        <div className="space-y-2">
          <div>
            <strong>
              <a href="https://github.com/yutoonodera/movee-ad" target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-gray-300 text-black font-medium rounded-md shadow hover:bg-gray-400 transition">
                育てるソフトウェア
              </a>
            </strong> - React18, Next.js14, TypeScript5, node.js20, tailwindcss3
          </div>
          <div>
            <strong>
              <a href="https://github.com/yutoonodera/setsumeikaikei" target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-gray-300 text-black font-medium rounded-md shadow hover:bg-gray-400 transition">
                説明する会計
              </a>
            </strong> - React, Java21, Spring Boot, PostgreSQL
          </div>
          <div>
            <strong>
              <a href="https://github.com/yutoonodera/mReactionData" target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-gray-300 text-black font-medium rounded-md shadow hover:bg-gray-400 transition">
                mReactionData
              </a>
            </strong> - Express.js,TypeScript, Redis
          </div>
        </div>
      </section>
      <CardImpList notionImpData={notionImpData.map(item => ({ ...item, isActive: false }))} onCardClick={handleCardClick} />

      <div className="flex justify-end mt-4">
        <a href="/blog" className="px-3 py-1 bg-gray-300 text-black font-medium rounded-md shadow hover:bg-gray-400 transition">
          ブログ
        </a>
      </div>
      <div className="mb-8"></div>
      {/* Company Information Section */}
      <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">会社情報</h2>
        <div className="space-y-4">
          <div>
            <strong>会社名:</strong> movee株式会社
          </div>
          <div>
            <strong>代表者:</strong> 小野寺 祐人
          </div>
          <div>
            <strong>住所:</strong> 福岡県福岡市中央区天神２丁目３−１０ 天神パインクレスト 716（バーチャルオフィス）
          </div>
          <div>
            <strong>資本金:</strong> 150万円
          </div>
          <div>
            <strong>問い合わせ先:</strong> info[at]movee.jp （[at]を@に変えてください）
          </div>
        </div>
      </section>
    </main>
  );
}
