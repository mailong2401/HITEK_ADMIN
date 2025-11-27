import React, { createContext, useContext, useState, ReactNode } from 'react';
import { blogService } from '../services/blogService';

// Định nghĩa types trực tiếp
interface BlogAuthor {
  id: string;
  name: string;
  avatar_url: string | null;
  position: string | null;
  bio: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  event_date: string | null;
  location: string | null;
  status: 'draft' | 'published' | 'archived';
  views: number;
  meta_title: string | null;
  meta_description: string | null;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: BlogAuthor;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface BlogContextType {
  blogs: BlogPost[];
  categories: Category[];
  authors: BlogAuthor[];
  loading: boolean;
  createBlog: (blog: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>) => Promise<boolean>;
  updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  getBlogById: (id: string) => BlogPost | undefined;
  uploadImage: (file: File) => Promise<string>;
  refreshBlogs: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock categories
  const categories: Category[] = [
    { id: 'technology', name: 'Công nghệ', icon: '💻' },
    { id: 'programming', name: 'Lập trình', icon: '👨‍💻' },
    { id: 'web-development', name: 'Web Development', icon: '🌐' },
    { id: 'mobile', name: 'Mobile', icon: '📱' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖' },
    { id: 'devops', name: 'DevOps', icon: '⚙️' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'tutorial', name: 'Hướng dẫn', icon: '📚' }
  ];

  const refreshBlogs = async (): Promise<void> => {
    try {
      setLoading(true);
      const blogsData = await blogService.getAllBlogs();
      const authorsData = await blogService.getAuthors();
      setBlogs(blogsData);
      setAuthors(authorsData);
    } catch (error) {
      console.error('Error refreshing blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<boolean> => {
    try {
      const success = await blogService.createBlog(blogData);
      if (success) {
        await refreshBlogs();
      }
      return success;
    } catch (error) {
      console.error('Error creating blog:', error);
      return false;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<BlogPost>): Promise<boolean> => {
    try {
      const success = await blogService.updateBlog(id, blogData);
      if (success) {
        await refreshBlogs();
      }
      return success;
    } catch (error) {
      console.error('Error updating blog:', error);
      return false;
    }
  };

  const deleteBlog = async (id: string): Promise<boolean> => {
    try {
      const success = await blogService.deleteBlog(id);
      if (success) {
        await refreshBlogs();
      }
      return success;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  };

  const getBlogById = (id: string): BlogPost | undefined => {
    return blogs.find(blog => blog.id === id);
  };

  const uploadImage = async (file: File): Promise<string> => {
    return blogService.uploadImage(file);
  };

  // Load initial data
  React.useEffect(() => {
    refreshBlogs();
  }, []);

  const value: BlogContextType = {
    blogs,
    categories,
    authors,
    loading,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    uploadImage,
    refreshBlogs
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogs must be used within a BlogProvider');
  }
  return context;
};