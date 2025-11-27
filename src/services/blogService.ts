import { supabase } from '@/lib/supabase';

export const blogService = {
  // Blog Posts
  getAllBlogs: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:blog_authors(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
    return data || [];
  },

  getPublishedBlogs: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:blog_authors(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching published blogs:', error);
      throw error;
    }
    return data || [];
  },

  getBlogById: async (id: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, author:blog_authors(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
    return data;
  },

  // CHỈ GIỮ LẠI 1 HÀM createBlog - XÓA HÀM TRÙNG
  createBlog: async (blogData: any) => {
    try {
      console.log('📝 Creating blog with data:', blogData);
      
      // Validate required fields
      const requiredFields = ['title', 'slug', 'content'];
      for (const field of requiredFields) {
        if (!blogData[field]) {
          console.error(`❌ Missing required field: ${field}`);
          return false;
        }
      }

      // Prepare data với chuẩn hóa empty strings
      const blogPostData = {
        title: blogData.title,
        slug: blogData.slug,
        subtitle: blogData.subtitle || null,
        excerpt: blogData.excerpt || null,
        content: blogData.content,
        thumbnail_url: blogData.thumbnail_url || null,
        cover_image_url: blogData.cover_image_url || null,
        event_date: blogData.event_date || null, // QUAN TRỌNG: chuyển "" thành null
        location: blogData.location || null,
        status: blogData.status || 'draft',
        meta_title: blogData.meta_title || null,
        meta_description: blogData.meta_description || null,
        author_id: blogData.author_id || null,
        published_at: blogData.status === 'published' ? new Date().toISOString() : null,
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('📦 Prepared blog data:', blogPostData);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([blogPostData])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating blog:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        return false;
      }

      console.log('✅ Blog created successfully:', data);
      return true;
    } catch (error) {
      console.error('❌ Unexpected error creating blog:', error);
      return false;
    }
  },

  updateBlog: async (id: string, blogData: any) => {
    try {
      console.log('📝 Updating blog with data:', blogData);
      
      // Chuẩn hóa data - chỉ bao gồm các trường cần update
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      // Chỉ thêm các trường có giá trị thực sự thay đổi
      const fieldsToUpdate = [
        'title', 'slug', 'subtitle', 'excerpt', 'content', 
        'thumbnail_url', 'cover_image_url', 'event_date', 
        'location', 'status', 'meta_title', 'meta_description', 
        'author_id', 'published_at'
      ];

      fieldsToUpdate.forEach(field => {
        if (blogData[field] !== undefined) {
          // Chuẩn hóa empty strings thành null
          updateData[field] = blogData[field] || null;
        }
      });

      // Xử lý riêng cho published_at
      if (blogData.status === 'published' && !blogData.published_at) {
        updateData.published_at = new Date().toISOString();
      } else if (blogData.status !== 'published') {
        updateData.published_at = null;
      }

      console.log('📦 Prepared update data:', updateData);

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('❌ Error updating blog:', error);
        console.error('Error details:', error.details, error.hint, error.message);
        return false;
      }

      console.log('✅ Blog updated successfully');
      return true;
    } catch (error) {
      console.error('❌ Unexpected error updating blog:', error);
      return false;
    }
  },

  deleteBlog: async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
    return true;
  },

  // Authors
  getAuthors: async () => {
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
    return data || [];
  },

  // Image upload - đơn giản dùng URL tạm
  // Image upload - SỬA LẠI để upload thật
  uploadImage: async (file: File): Promise<string> => {
    try {
      console.log('📤 Uploading image:', file.name, file.type, file.size);
      
      // Tạo tên file unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      console.log('📁 File path:', filePath);

      // Upload lên Supabase Storage
      const { data, error } = await supabase.storage
        .from('blogs') // Tên bucket của bạn
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Error uploading image:', error);
        throw error;
      }

      console.log('✅ Image uploaded successfully:', data);

      // Lấy public URL
      const { data: urlData } = supabase.storage
        .from('blogs')
        .getPublicUrl(filePath);

      console.log('🔗 Public URL:', urlData.publicUrl);
      return urlData.publicUrl;

    } catch (error) {
      console.error('❌ Unexpected error uploading image:', error);
      
      // Fallback: trả về URL tạm nếu upload thất bại
      console.log('🔄 Using fallback blob URL');
      return URL.createObjectURL(file);
    }
  },

  // Tăng lượt xem
  incrementViews: async (id: string) => {
    // Cách 1: Lấy blog hiện tại rồi cập nhật
    const { data: blog, error: fetchError } = await supabase
      .from('blog_posts')
      .select('views')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching blog for views:', fetchError);
      return false;
    }

    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        views: (blog.views || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error incrementing views:', error);
      return false;
    }
    return true;
  }
};