import React, { useState } from 'react';
import { Calendar, User, MapPin, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsPageProps {
  news: NewsArticle[];
  setCurrentTab: (tab: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ news, setCurrentTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const filteredNews = news.filter((n) =>
    selectedCategory === 'all' ? true : n.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0878C9] uppercase tracking-wider block">
          توثيق الأثر والمستجدات
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#17365D]">
          الأخبار والأنشطة والتقارير الميدانية
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          نشارككم بأمانة سير العمل في محطات المياه وتوزيعات السلال الغذائية وكفالات الأيتام وقصص الأمل الموثقة في ولايات السودان.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { key: 'all', label: 'كافة الأخبار والتقارير' },
          { key: 'field_update', label: 'تحديثات الميدان' },
          { key: 'success_story', label: 'قصص الأمل والنجاح' },
          { key: 'campaign', label: 'حملات وقوافل الإغاثة' },
          { key: 'press_release', label: 'البيانات الرسمية' },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#17365D] text-white border-[#17365D] shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-52 overflow-hidden bg-gray-100 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#17365D]/85 backdrop-blur-xs text-white text-xs font-semibold">
                  {article.state}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="text-gray-500">{article.author}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#17365D] leading-snug group-hover:text-[#0878C9] transition line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0878C9]">
              <span>قراءة التقرير الميداني كاملاً</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 text-right my-8">
            <div className="h-60 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 border-b pb-3">
              <span className="flex items-center gap-1 text-[#0878C9] font-bold">
                <MapPin className="w-3.5 h-3.5" />
                {activeArticle.state}
              </span>
              <span className="font-mono">{activeArticle.date}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#17365D] leading-snug">
              {activeArticle.title}
            </h2>

            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-gray-500">
                المصدر: {activeArticle.author}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-[#17365D] text-white text-xs font-bold hover:bg-[#0f2440] transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
