import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface Project {
  id: number
  title: string
  category: string
  client: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  results: {
    [key: string]: string
  }
  duration: string
  team: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  icon: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Kiểm tra xem Supabase đã được cấu hình chưa
      if (!supabase) {
        throw new Error('Supabase client chưa được cấu hình. Kiểm tra biến môi trường.')
      }

      console.log('Đang tải dữ liệu từ Supabase...')

      // Lấy projects từ Supabase - BỎ ĐIỀU KIỆN STATUS
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projectsError) {
        console.error('Lỗi khi tải projects:', projectsError)
        
        // Nếu lỗi do column không tồn tại, thử select không có order
        if (projectsError.message.includes('column') && projectsError.message.includes('does not exist')) {
          console.log('Thử tải dữ liệu không có order...')
          const { data: simpleData, error: simpleError } = await supabase
            .from('projects')
            .select('*')
          
          if (simpleError) {
            throw new Error(`Lỗi kết nối database: ${simpleError.message}`)
          }
          setProjects(simpleData || [])
        } else {
          throw new Error(`Lỗi projects: ${projectsError.message}`)
        }
      } else {
        setProjects(projectsData || [])
      }

      // Lấy categories từ Supabase
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (categoriesError) {
        console.error('Lỗi khi tải categories:', categoriesError)
        // Fallback categories
        const fallbackCategories = [
          { id: 'all', name: 'Tất cả dự án', icon: 'Code' },
          { id: 'enterprise', name: 'Doanh nghiệp', icon: 'Database' },
          { id: 'fintech', name: 'Fintech', icon: 'Shield' },
          { id: 'web-app', name: 'Web Application', icon: 'Globe' },
          { id: 'healthcare', name: 'Y tế', icon: 'Smartphone' },
          { id: 'mobile-app', name: 'Mobile App', icon: 'Users' },
          { id: 'education', name: 'Giáo dục', icon: 'Code' },
          { id: 'gaming', name: 'Gaming & Blockchain', icon: 'GamepadIcon' }
        ]
        setCategories(fallbackCategories)
      } else {
        setCategories(categoriesData || [])
      }

      // Nếu không có projects từ Supabase, sử dụng fallback data
      if ((!projectsData || projectsData.length === 0) && projects.length === 0) {
        console.warn('Không có dữ liệu projects từ Supabase, sử dụng dữ liệu mẫu')
        const fallbackProjects = getFallbackProjects()
        setProjects(fallbackProjects)
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định khi tải dữ liệu'
      setError(errorMessage)
      console.error('Error loading projects:', err)
      
      // Fallback data khi có lỗi
      const fallbackProjects = getFallbackProjects()
      const fallbackCategories = getFallbackCategories()
      
      setProjects(fallbackProjects)
      setCategories(fallbackCategories)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return { projects, categories, loading, error, reload: loadProjects }
}

// Hàm tạo fallback projects
function getFallbackProjects() {
  return [
    {
      id: 1,
      title: "Hệ thống quản lý sản xuất thông minh",
      category: "enterprise",
      client: "Tập đoàn Sản xuất Công nghiệp",
      description: "Phát triển hệ thống ERP tùy chỉnh cho ngành sản xuất, tích hợp IoT và AI để tối ưu hóa quy trình sản xuất và quản lý chuỗi cung ứng.",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: [".NET Core", "React", "SQL Server", "Azure IoT", "Power BI"],
      features: ["Quản lý sản xuất real-time", "Theo dõi thiết bị IoT", "Báo cáo thông minh", "Tự động hóa quy trình"],
      results: {
        efficiency: "Tăng 40% hiệu suất",
        cost: "Giảm 25% chi phí",
        quality: "Giảm 60% lỗi sản phẩm"
      },
      duration: "6 tháng",
      team: "12 developers",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Ứng dụng ngân hàng số",
      category: "fintech",
      client: "Ngân hàng TMCP Việt Nam",
      description: "Xây dựng ứng dụng ngân hàng di động với đầy đủ tính năng giao dịch, đầu tư và bảo mật đa lớp.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      technologies: ["Flutter", "Node.js", "PostgreSQL", "Redis", "Kubernetes"],
      features: ["Chuyển khoản đa kênh", "Đầu tư tài chính", "Bảo mật sinh trắc học", "Hỗ trợ 24/7"],
      results: {
        users: "500,000+ người dùng",
        transactions: "1M+ giao dịch/ngày",
        rating: "4.8/5 trên App Store"
      },
      duration: "9 tháng",
      team: "15 developers",
      created_at: new Date().toISOString()
    }
  ]
}

// Hàm tạo fallback categories
function getFallbackCategories() {
  return [
    { id: 'all', name: 'Tất cả dự án', icon: 'Code' },
    { id: 'enterprise', name: 'Doanh nghiệp', icon: 'Database' },
    { id: 'fintech', name: 'Fintech', icon: 'Shield' },
    { id: 'web-app', name: 'Web Application', icon: 'Globe' },
    { id: 'healthcare', name: 'Y tế', icon: 'Smartphone' },
    { id: 'mobile-app', name: 'Mobile App', icon: 'Users' },
    { id: 'education', name: 'Giáo dục', icon: 'Code' },
    { id: 'gaming', name: 'Gaming & Blockchain', icon: 'GamepadIcon' }
  ]
}

export default useProjects