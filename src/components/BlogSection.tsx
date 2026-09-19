import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Search, Calendar, Clock, Eye, Heart, MessageSquare, 
  ArrowRight, Tag, X, Newspaper, ChevronRight
} from 'lucide-react';
import { BlogPost, BlogComment, BlogCategory } from '../types';
import { BLOG_CATEGORIES, POPULAR_TAGS } from '../data/blogData';

interface BlogSectionProps {
  posts: BlogPost[];
  comments: BlogComment[];
  onSelectPost: (post: BlogPost) => void;
  onLikePost: (postId: string) => void;
  likedPostIds: string[];
}

export function BlogSection({
  posts,
  comments,
  onSelectPost,
  onLikePost,
  likedPostIds
}: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Comment count helper
  const getCommentCount = (postId: string) => {
    return comments.filter(c => c.postId === postId).length;
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inExcerpt = post.excerpt.toLowerCase().includes(q);
        const inAuthor = post.author.name.toLowerCase().includes(q);
        const inTags = post.tags.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inExcerpt && !inAuthor && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  // Featured post (Post 1 or first in filtered list)
  const featuredPost = useMemo(() => {
    if (selectedCategory === 'All' && !selectedTag && !searchQuery.trim()) {
      return posts.find(p => p.featured) || posts[0];
    }
    return null;
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter(p => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <section id="blog" className="py-16 sm:py-20 bg-[#061224] text-white relative border-b border-amber-500/20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Insights & Newsroom</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
            The <span className="text-gold-gradient">UCC Gazette</span> & Knowledge Hub
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Latest institute announcements, board exam guidelines, student success stories from Orangi Town, and commerce career roadmaps by Sir Arshad Siddiqui.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0A192F] border border-amber-500/20 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl space-y-4">
          
          {/* Top Row: Search input + Category selector */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, past papers..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#061224] border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Counter & Active Filter Reset */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
              <span className="text-slate-400">
                Showing <strong className="text-amber-400 font-bold">{filteredPosts.length}</strong> of {posts.length} articles
              </span>

              {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-[#061224] text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Popular Tag Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-white/5 text-[11px]">
            <span className="text-slate-400 flex items-center gap-1 shrink-0 mr-1 font-medium">
              <Tag className="w-3 h-3 text-amber-400" /> Popular Tags:
            </span>
            {POPULAR_TAGS.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Post Spotlight (When applicable) */}
        {featuredPost && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0A192F] to-[#0A192F] border border-amber-500/30 overflow-hidden shadow-2xl hover:border-amber-400/50 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image Section (5 cols) */}
              <div 
                className="lg:col-span-5 relative group cursor-pointer overflow-hidden min-h-[260px] sm:min-h-[320px] bg-[#050D1A]"
                onClick={() => onSelectPost(featuredPost)}
              >
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-[#061224]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-400/40 flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Campaign</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#061224]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-slate-300 border border-white/10">
                  {featuredPost.imageCaption || 'Official UCC Asset'}
                </div>
              </div>

              {/* Details Section (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 font-bold uppercase">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {featuredPost.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectPost(featuredPost)}
                    className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white hover:text-amber-300 transition-colors cursor-pointer leading-tight"
                  >
                    {featuredPost.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.map(tag => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-300 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Author + Metrics + CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{featuredPost.author.name}</h4>
                      <p className="text-[10px] text-amber-400">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      {featuredPost.views}
                    </span>

                    <span className="flex items-center gap-1 text-slate-400">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      {getCommentCount(featuredPost.id)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikePost(featuredPost.id);
                      }}
                      className="flex items-center gap-1 text-slate-300 hover:text-rose-400 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedPostIds.includes(featuredPost.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{featuredPost.likes + (likedPostIds.includes(featuredPost.id) ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => onSelectPost(featuredPost)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Grid of Other / Filtered Posts */}
        {gridPosts.length === 0 && !featuredPost ? (
          <div className="text-center py-16 bg-[#0A192F] border border-amber-500/20 rounded-2xl p-8 space-y-4">
            <Newspaper className="w-12 h-12 text-amber-400/50 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Articles Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No published articles match your current search or category filter. Try clearing your filters or searching for another keyword.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow hover:bg-amber-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post) => {
              const isLiked = likedPostIds.includes(post.id);
              const commentCount = getCommentCount(post.id);

              return (
                <article
                  key={post.id}
                  className="bg-[#0A192F] border border-amber-500/20 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Thumbnail */}
                    <div 
                      className="relative h-48 overflow-hidden bg-[#050D1A] cursor-pointer"
                      onClick={() => onSelectPost(post)}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#061224]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                        {post.category}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-[#061224]/90 px-2 py-0.5 rounded text-[10px] text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          {post.publishedDate}
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectPost(post)}
                        className="font-heading font-black text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors cursor-pointer leading-snug line-clamp-2"
                      >
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-400 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          referrerPolicy="no-referrer"
                          className="w-6 h-6 rounded-full object-cover border border-amber-400/30"
                        />
                        <span className="text-[11px] text-slate-300 font-medium truncate max-w-[100px]">
                          {post.author.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1 text-slate-400">
                          <MessageSquare className="w-3 h-3 text-amber-400" />
                          {commentCount}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLikePost(post.id);
                          }}
                          className="flex items-center gap-1 text-slate-300 hover:text-rose-400 transition-colors"
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{post.likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <button
                          onClick={() => onSelectPost(post)}
                          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5 ml-1"
                        >
                          <span>Read</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
