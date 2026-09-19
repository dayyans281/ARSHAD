import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Eye, Heart, Share2, Tag, 
  MessageSquare, Star, Send, CheckCircle2, User, Sparkles
} from 'lucide-react';
import { BlogPost, BlogComment } from '../types';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  comments: BlogComment[];
  onAddComment: (comment: BlogComment) => void;
  onLikePost: (postId: string) => void;
  liked: boolean;
  onTagClick?: (tag: string) => void;
  onRegisterClick?: () => void;
}

export function BlogModal({
  post,
  onClose,
  comments,
  onAddComment,
  onLikePost,
  liked,
  onTagClick,
  onRegisterClick
}: BlogModalProps) {
  if (!post) return null;

  // New comment form state
  const [name, setName] = useState('');
  const [role, setRole] = useState<BlogComment['authorRole']>('Current Student');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter comments for this post
  const postComments = comments.filter(c => c.postId === post.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setSubmitting(true);
    const newComment: BlogComment = {
      id: `comm-${Date.now()}`,
      postId: post.id,
      authorName: name.trim(),
      authorRole: role,
      comment: commentText.trim(),
      rating,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      onAddComment(newComment);
      setSubmitting(false);
      setName('');
      setCommentText('');
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 4000);
    }, 300);
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = `${post.title} — Unique Commerce Centre Karachi`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0A192F] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-500/20 bg-[#061224]/90 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-400/30 text-amber-400">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLikePost(post.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                liked 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Helpful article"
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6 scrollbar-thin scrollbar-thumb-amber-500/30">
          
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white leading-tight">
              {post.title}
            </h1>

            {/* Author Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{post.author.name}</h4>
                  <p className="text-amber-400 text-xs">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {post.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  {post.views} views
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  {postComments.length} comments
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-[#050D1A] group">
            <img
              src={post.imageUrl}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[420px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
            />
            {post.imageCaption && (
              <div className="bg-[#061224]/90 px-4 py-2 text-xs text-slate-300 border-t border-white/10 flex items-center justify-between">
                <span className="font-medium text-amber-300">Reference Asset</span>
                <span className="text-slate-400">{post.imageCaption}</span>
              </div>
            )}
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-sm sm:text-base text-amber-200 leading-relaxed font-medium">
            {post.excerpt}
          </div>

          {/* Article Markdown/Paragraphs */}
          <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            {post.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg sm:text-xl font-bold font-heading text-amber-300 pt-4 pb-1 border-b border-amber-500/20">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={index} className="pl-4 py-2 border-l-2 border-amber-400 italic text-slate-200 bg-[#061224]/60 rounded-r-lg">
                    {trimmed.replace('> ', '')}
                  </blockquote>
                );
              }

              if (trimmed === '---') {
                return <hr key={index} className="border-amber-500/20 my-4" />;
              }

              if (trimmed.startsWith('* ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ') || trimmed.startsWith('5. ')) {
                const items = trimmed.split('\n');
                return (
                  <ul key={index} className="space-y-2 list-disc pl-5 text-slate-300">
                    {items.map((it, i) => (
                      <li key={i} className="pl-1">
                        {it.replace(/^(\*|\d+\.)\s+/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="text-slate-200 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags & Action Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400 mr-1" />
              {post.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    onClose();
                    if (onTagClick) onTagClick(tag);
                  }}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-300 font-medium transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Social Share Group */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-amber-400" /> Share:
              </span>
              <button
                onClick={() => handleShare('whatsapp')}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors font-medium"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 transition-colors font-medium"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="px-2.5 py-1 rounded-lg bg-sky-600/20 text-sky-400 hover:bg-sky-600/30 border border-sky-500/30 transition-colors font-medium"
              >
                Twitter
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-colors font-medium"
              >
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Quick Apply CTA Banner if post is related to Admissions */}
          {onRegisterClick && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-heading font-black text-white text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Ready to Enroll for Session 2026–2027?
                </h4>
                <p className="text-xs text-amber-200 mt-0.5">
                  Secure your seat in Secondary, Matric, I.Com, CIT, or AI batches at Unique Commerce Centre.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onRegisterClick();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shrink-0 shadow-lg hover:scale-105 transition-transform"
              >
                APPLY ONLINE NOW
              </button>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-6 border-t border-amber-500/20 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                Community Discussion & Feedback ({postComments.length})
              </h3>
              <span className="text-xs text-slate-400">All submissions moderated for authenticity</span>
            </div>

            {/* Submit Comment Form */}
            <form onSubmit={handleSubmitComment} className="p-4 rounded-xl bg-[#061224] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Leave a Thought or Question for Faculty
              </h4>

              {successNotice && (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Your comment has been posted successfully and saved!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A192F] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Your Affiliation</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as BlogComment['authorRole'])}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A192F] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Current Student">Current Student</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Parent">Parent</option>
                    <option value="Prospective Student">Prospective Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-300">Rating for this Article / Institute</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-3.5 h-3.5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your experience, question for Sir Arshad Siddiqui, or feedback on this topic..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A192F] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>

            {/* List of Existing Comments */}
            <div className="space-y-3">
              {postComments.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  Be the first to leave a comment on this article!
                </div>
              ) : (
                postComments.map((comment) => (
                  <div key={comment.id} className="p-3.5 rounded-xl bg-[#061224]/80 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold text-xs">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white">{comment.authorName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 font-medium">
                              {comment.authorRole}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${star <= comment.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 pl-9 leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
