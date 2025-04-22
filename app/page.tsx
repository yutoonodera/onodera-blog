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
  <h2 className="text-xl font-semibold mb-4">自己紹介</h2>
  <div className="mb-4">
    <h3 className="text-lg font-semibold">名前</h3>
    <p>小野寺 祐人(38)</p>
  </div>
  <div className="mb-4">
    <h3 className="text-lg font-semibold">会社</h3>
    <p>      <a
        href="https://movee.jp"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        株式会社movee
      </a></p>
  </div>
  <div className="mb-4">
    <h3 className="text-lg font-semibold">経歴</h3>
    <p>不動産や医薬品の営業職を経て、2015年よりソフトウェアエンジニアとして開発業務をしています。2023年より独立して、現在は主にエネルギー企業のソフトウェア開発を請け負っております。</p>
  </div>
  <div className="mb-4">
    <h3 className="text-lg font-semibold">使用言語・技術</h3>
    <p>Java、TypeScriptを日常的に使用しています。インフラはAWS、VPSを使っています。お客さまのご要望がない場合はUIカスタマイズの自由さ、レスポンスの速さ、などの理由からTypeScript(Next.js)＋VPSで構築します。</p>
  </div>
  <div className="mb-4">
    <h3 className="text-lg font-semibold">その他</h3>
      ちょっとした書籍を書いたり、OSS開発をしています。
      <div className="mt-6">
      <a
        href="https://www.amazon.co.jp/stores/%E5%B0%8F%E9%87%8E%E5%AF%BA-%E7%A5%90%E4%BA%BA/author/B0D3KQ19ZR"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Kindle書籍一覧
      </a>
      <br/>
      <a
        href="https://github.com/yutoonodera"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Github
      </a>
      </div>
  </div>
</section>


<section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-2">お受けできること</h2>
  <p>現在、以下の業務をお受けしています。お気軽にお問い合わせください。</p>
  <div className="mt-6">
  <ul className="list-disc pl-5 space-y-1">
    <li>ソフトウェア開発（パッケージ）</li>
    <li>ソフトウェア開発（オリジナル）</li>
    <li>技術戦略の立案やIT予算検討、エンジニア採用などのCTO業務全般</li>
  </ul>
  </div>
  {/* Tailwind の mt-12 で上に約3行分の余白 */}
  <div className="mt-6">
    <strong>問い合わせ先:</strong> y.onodera[at]movee.jp （[at]を@に変えてください）
  </div>
</section>

<section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">開発ソフトウェア</h2>
        <div className="mt-6">
        自由にダウンロード・利用可能なプログラムを提供しています。ご自由にお使いください。
        </div>
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
    </main>
  );
}
