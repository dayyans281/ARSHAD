import { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BillboardShowcase } from './components/BillboardShowcase';
import { ProgramsSection } from './components/ProgramsSection';
import { ComputerCoursesSection } from './components/ComputerCoursesSection';
import { EnglishCoursesSection } from './components/EnglishCoursesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { AdmissionCTA } from './components/AdmissionCTA';
import { OnlineRegistration } from './components/OnlineRegistration';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { ProgramModal } from './components/ProgramModal';
import { CourseModal } from './components/CourseModal';
import { OwnerAdminPortal } from './components/OwnerAdminPortal';
import { BlogSection } from './components/BlogSection';
import { BlogModal } from './components/BlogModal';

import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_REGISTRATIONS,
  PROGRAMS,
  COMPUTER_COURSES,
  ENGLISH_COURSES
} from './data/instituteData';
import { SAMPLE_BLOG_POSTS, INITIAL_BLOG_COMMENTS } from './data/blogData';
import { Program, Course, Registration, Announcement, BlogPost, BlogComment } from './types';

export default function App() {
  // Local storage backed state
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('ucc_registrations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_REGISTRATIONS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('ucc_announcements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [admissionsOpen, setAdmissionsOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('ucc_admissions_open');
    return saved !== null ? saved === 'true' : true;
  });

  // Modal states
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Blog Posts & Comments state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('ucc_blog_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return SAMPLE_BLOG_POSTS;
  });

  const [blogComments, setBlogComments] = useState<BlogComment[]>(() => {
    const saved = localStorage.getItem('ucc_blog_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_BLOG_COMMENTS;
  });

  const [likedPostIds, setLikedPostIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ucc_liked_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  // Preselection for registration form
  const [preselectedProgram, setPreselectedProgram] = useState('');
  const [preselectedCourse, setPreselectedCourse] = useState('');

  // Persist registrations to local storage
  useEffect(() => {
    localStorage.setItem('ucc_registrations', JSON.stringify(registrations));
  }, [registrations]);

  // Persist announcements to local storage
  useEffect(() => {
    localStorage.setItem('ucc_announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Persist admissions open state
  useEffect(() => {
    localStorage.setItem('ucc_admissions_open', String(admissionsOpen));
  }, [admissionsOpen]);

  // Persist blog posts to local storage
  useEffect(() => {
    localStorage.setItem('ucc_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // Persist blog comments to local storage
  useEffect(() => {
    localStorage.setItem('ucc_blog_comments', JSON.stringify(blogComments));
  }, [blogComments]);

  // Persist liked posts to local storage
  useEffect(() => {
    localStorage.setItem('ucc_liked_posts', JSON.stringify(likedPostIds));
  }, [likedPostIds]);

  // Private Admin Route Detection & Keyboard Shortcut (Ctrl+Alt+A or #admin or /admin)
  useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setAdminModalOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setAdminModalOpen(false);
    if (window.location.hash === '#admin') {
      window.location.hash = '#home';
    }
  };

  const handleRestoreData = (backupData: any) => {
    if (backupData.registrations && Array.isArray(backupData.registrations)) {
      setRegistrations(backupData.registrations);
    }
    if (backupData.announcements && Array.isArray(backupData.announcements)) {
      setAnnouncements(backupData.announcements);
    }
    if (backupData.admissionsOpen !== undefined) {
      setAdmissionsOpen(backupData.admissionsOpen);
    }
    if (backupData.comments && Array.isArray(backupData.comments)) {
      setBlogComments(backupData.comments);
    }
  };

  // Smooth scroll to registration form
  const scrollToRegistration = (programName?: string, courseName?: string) => {
    if (programName) setPreselectedProgram(programName);
    if (courseName) setPreselectedCourse(courseName);

    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBillboard = () => {
    const el = document.getElementById('billboard-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBlog = () => {
    const el = document.getElementById('blog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setBlogPosts(prev =>
      prev.map(p => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
    );
    setSelectedBlogPost({ ...post, views: post.views + 1 });
  };

  const handleLikeBlogPost = (postId: string) => {
    const isAlreadyLiked = likedPostIds.includes(postId);
    if (isAlreadyLiked) {
      setLikedPostIds(prev => prev.filter(id => id !== postId));
      setBlogPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p))
      );
      if (selectedBlogPost?.id === postId) {
        setSelectedBlogPost(prev => prev ? { ...prev, likes: Math.max(0, prev.likes - 1) } : null);
      }
    } else {
      setLikedPostIds(prev => [...prev, postId]);
      setBlogPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
      );
      if (selectedBlogPost?.id === postId) {
        setSelectedBlogPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
      }
    }
  };

  const handleAddBlogComment = (newComment: BlogComment) => {
    setBlogComments(prev => [newComment, ...prev]);
    setBlogPosts(prev =>
      prev.map(p => (p.id === newComment.postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p))
    );
    if (selectedBlogPost && selectedBlogPost.id === newComment.postId) {
      setSelectedBlogPost(prev => prev ? { ...prev, commentCount: (prev.commentCount || 0) + 1 } : null);
    }
  };

  const handleDeleteBlogComment = (commentId: string) => {
    const commentToDelete = blogComments.find(c => c.id === commentId);
    if (commentToDelete) {
      setBlogPosts(prev =>
        prev.map(p => (p.id === commentToDelete.postId ? { ...p, commentCount: Math.max(0, (p.commentCount || 0) - 1) } : p))
      );
      if (selectedBlogPost && selectedBlogPost.id === commentToDelete.postId) {
        setSelectedBlogPost(prev => prev ? { ...prev, commentCount: Math.max(0, (prev.commentCount || 0) - 1) } : null);
      }
    }
    setBlogComments(prev => prev.filter(c => c.id !== commentId));
  };

  // Handlers for Registration
  const handleNewRegistration = (newReg: Registration) => {
    setRegistrations(prev => [newReg, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Contacted' | 'Confirmed' | 'Rejected') => {
    setRegistrations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDeleteRegistration = (id: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  // Handlers for Announcements
  const handleAddAnnouncement = (newAnn: Announcement) => {
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const handleToggleAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const pendingCount = registrations.filter(r => r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#061224] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. Top Announcement Notice Bar */}
      <AnnouncementBar
        announcements={announcements}
        onRegisterClick={() => scrollToRegistration()}
      />

      {/* 2. Sticky Navbar with Mobile Drawer */}
      <Navbar
        onOpenRegister={() => scrollToRegistration()}
        onOpenAdmin={() => setAdminModalOpen(true)}
        pendingCount={pendingCount}
      />

      {/* 3. Hero Section (Navy gradient + Gold typography + Badges + Student imagery) */}
      <main className="flex-1">
        <Hero
          onRegisterClick={() => scrollToRegistration()}
          onProgramsClick={scrollToPrograms}
          onBillboardClick={scrollToBillboard}
        />

        {/* 4. Billboard Branding Showcase (Visual reference, Director details, Orangi Town location) */}
        <BillboardShowcase
          onRegisterClick={() => scrollToRegistration()}
        />

        {/* 5. Programs Offered (Secondary, Matric, Intermediate, Graduation, Masters) */}
        <ProgramsSection
          onSelectProgram={(program) => setSelectedProgram(program)}
          onApplyProgram={(programName) => scrollToRegistration(programName)}
        />

        {/* 6. Computer Courses (CIT, Graphic Design, Special Class of AI, MS Office, Digital Skills, Fundamentals) */}
        <ComputerCoursesSection
          onSelectCourse={(course) => setSelectedCourse(course)}
          onEnrollCourse={(courseTitle) => scrollToRegistration(undefined, courseTitle)}
        />

        {/* 7. English Language Courses (Spoken English, IELTS, Grammar & Writing, Corporate Comm) */}
        <EnglishCoursesSection
          onSelectCourse={(course) => setSelectedCourse(course)}
          onEnrollCourse={(courseTitle) => scrollToRegistration(undefined, courseTitle)}
        />

        {/* 8. Why Choose Us (6 Gold feature tiles on navy background) */}
        <WhyChooseUs />

        {/* 9. About Unique Commerce Centre (Heritage, Sir Arshad Siddiqui, 5 pillars) */}
        <AboutSection
          onRegisterClick={() => scrollToRegistration()}
          onContactClick={scrollToContact}
        />

        {/* 10. Campus Gallery (Classroom, Students, Teachers, Computer Lab, Activities, Campus, Events with Lightbox) */}
        <GallerySection />

        {/* 11. Blog / News Gazette (Articles, Institute News, Success Stories, Commerce Education, Tags, Categories) */}
        <BlogSection
          posts={blogPosts}
          comments={blogComments}
          onSelectPost={handleSelectBlogPost}
          onLikePost={handleLikeBlogPost}
          likedPostIds={likedPostIds}
        />

        {/* 12. Attention-grabbing Admission Notice CTA */}
        <AdmissionCTA
          onRegisterClick={() => scrollToRegistration()}
          onContactClick={scrollToContact}
        />

        {/* 13. Online Registration Form with instant slip generation & WhatsApp integration */}
        <OnlineRegistration
          preselectedProgram={preselectedProgram}
          preselectedCourse={preselectedCourse}
          onNewRegistration={handleNewRegistration}
        />

        {/* 14. Contact & Campus Location (Sir Arshad Siddiqui, Phone 0344-2302526, Rehmat Chowk, Google Maps) */}
        <ContactSection />
      </main>

      {/* 15. Comprehensive Footer */}
      <Footer
        onOpenAdmin={() => setAdminModalOpen(true)}
        onSelectBlog={scrollToBlog}
        onSelectProgram={(progName) => {
          const prog = PROGRAMS.find(p => p.name === progName);
          if (prog) setSelectedProgram(prog);
          else scrollToPrograms();
        }}
        onSelectCourse={(courseTitle) => {
          const course = [...COMPUTER_COURSES, ...ENGLISH_COURSES].find(c => c.title === courseTitle);
          if (course) setSelectedCourse(course);
          else scrollToRegistration(undefined, courseTitle);
        }}
      />

      {/* 16. Floating WhatsApp Button (Pre-filled message for 0344-2302526) */}
      <WhatsAppFloating />

      {/* 17. Program Details Modal Dialog */}
      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onApply={(progName) => scrollToRegistration(progName)}
      />

      {/* 18. Course Details Modal Dialog */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={(courseTitle) => scrollToRegistration(undefined, courseTitle)}
      />

      {/* 19. Institute Owner Admin Portal (Accessed via #admin, /admin or Ctrl+Alt+A) */}
      <OwnerAdminPortal
        isOpen={adminModalOpen}
        onClose={handleCloseAdmin}
        registrations={registrations}
        onUpdateStatus={handleUpdateStatus}
        onDeleteRegistration={handleDeleteRegistration}
        announcements={announcements}
        onAddAnnouncement={handleAddAnnouncement}
        onToggleAnnouncement={handleToggleAnnouncement}
        admissionsOpen={admissionsOpen}
        onToggleAdmissions={() => setAdmissionsOpen(!admissionsOpen)}
        comments={blogComments}
        onDeleteComment={handleDeleteBlogComment}
        onRestoreData={handleRestoreData}
      />

      {/* 20. Blog Article Reader & Comments Modal */}
      <BlogModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
        comments={blogComments}
        onAddComment={handleAddBlogComment}
        onLikePost={handleLikeBlogPost}
        liked={selectedBlogPost ? likedPostIds.includes(selectedBlogPost.id) : false}
        onTagClick={() => {
          scrollToBlog();
        }}
        onRegisterClick={() => scrollToRegistration()}
      />

    </div>
  );
}
