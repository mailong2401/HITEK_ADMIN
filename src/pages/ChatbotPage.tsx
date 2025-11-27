import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, Settings, PlusCircle, Edit2, Trash2, Activity, MessageSquare, Database, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Chatbot admin UI — self-contained component
// Requires: Tailwind CSS, lucide-react, and a Supabase client exported from '@/lib/supabase'.

type Chatbot = {
  id: string | number
  name: string
  description?: string
  status: 'active' | 'inactive'
  conversations?: number
  satisfaction?: number
}

type PresetQuestion = {
  id: string
  question_text: string
  category?: string
  display_order?: number
  is_active?: boolean
  parent_id?: string | null
  is_final?: boolean
}

type ChatResponse = {
  id: string
  question_id?: string | null
  response_text: string
  keywords?: string[]
}

export default function ChatbotPage(): JSX.Element {
  const sampleChatbots: Chatbot[] = useMemo(() => [
    {
      id: 'local-1',
      name: 'CSKH - Hitek Software',
      status: 'active',
      conversations: 1247,
      satisfaction: 92,
      description: 'Chatbot hỗ trợ khách hàng và tư vấn dịch vụ'
    },
    {
      id: 'local-2',
      name: 'Tư vấn dự án',
      status: 'active',
      conversations: 893,
      satisfaction: 88,
      description: 'Chatbot tư vấn và giới thiệu dự án phần mềm'
    },
    {
      id: 'local-3',
      name: 'Hỗ trợ kỹ thuật',
      status: 'inactive',
      conversations: 456,
      satisfaction: 85,
      description: 'Chatbot hỗ trợ kỹ thuật và xử lý sự cố'
    }
  ], [])

  const [chatbots, setChatbots] = useState<Chatbot[]>(sampleChatbots)
  const [selectedId, setSelectedId] = useState<string | number | null>(chatbots[0]?.id ?? null)
  const [showBotModal, setShowBotModal] = useState(false)
  const [editingBot, setEditingBot] = useState<Chatbot | null>(null)
  const [botForm, setBotForm] = useState({ name: '', description: '', status: 'active' })

  // Preset questions & responses
  const [questions, setQuestions] = useState<PresetQuestion[]>([])
  const [responses, setResponses] = useState<ChatResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // UI state for smaller actions
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [questionForm, setQuestionForm] = useState<{ question_text: string; category?: string }>({ question_text: '', category: '' })
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [responseForm, setResponseForm] = useState<{ question_id?: string | null; response_text: string; keywords?: string }>({ question_id: null, response_text: '', keywords: '' })

  // Try load data from Supabase if tables exist, otherwise keep local fallback.
  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        // Try to load chatbots table if exists
        const { data: cbData, error: cbError } = await supabase.from('chatbots').select('*')
        if (!cbError && cbData && cbData.length > 0 && mounted) {
          setChatbots(cbData as any)
          setSelectedId((cbData as any)[0]?.id ?? null)
        }

        // preset_questions
        const { data: pqData, error: pqError } = await supabase.from('preset_questions').select('*').order('display_order')
        if (!pqError && mounted) setQuestions(pqData as any)

        // chat_responses
        const { data: crData, error: crError } = await supabase.from('chat_responses').select('*')
        if (!crError && mounted) setResponses(crData as any)

      } catch (err: any) {
        console.warn('Supabase load warning (table may not exist):', err?.message ?? err)
        // keep fallback data
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const selectedBot = chatbots.find((c) => c.id === selectedId) ?? chatbots[0] ?? null

  // CRUD Chatbots — optimistic local updates with supabase fallback
  const openCreateBot = () => {
    setEditingBot(null)
    setBotForm({ name: '', description: '', status: 'active' })
    setShowBotModal(true)
  }

  const openEditBot = (bot: Chatbot) => {
    setEditingBot(bot)
    setBotForm({ name: bot.name, description: bot.description || '', status: bot.status })
    setShowBotModal(true)
  }

  const handleSubmitBot = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setShowBotModal(false)

    try {
      if (editingBot) {
        // update local
        setChatbots((prev) => prev.map((p) => (p.id === editingBot.id ? { ...p, ...botForm } : p)))
        // try update supabase
        try {
          await supabase.from('chatbots').update(botForm).eq('id', editingBot.id)
        } catch (err) {
          // ignore supabase errors (table might not exist)
        }
      } else {
        const newBot: Chatbot = {
          id: `local-${Date.now()}`,
          name: botForm.name,
          description: botForm.description,
          status: botForm.status as 'active' | 'inactive',
          conversations: 0,
          satisfaction: 0
        }
        setChatbots((prev) => [newBot, ...prev])
        setSelectedId(newBot.id)
        // try insert into supabase
        try {
          await supabase.from('chatbots').insert(newBot)
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Bot save error', err)
    }
  }

  const handleDeleteBot = async (id: string | number) => {
    if (!confirm('Bạn có chắc muốn xóa chatbot này?')) return
    setChatbots((prev) => prev.filter((p) => p.id !== id))
    if (selectedId === id) setSelectedId(chatbots[0]?.id ?? null)
    try {
      await supabase.from('chatbots').delete().eq('id', id)
    } catch (err) {
      // ignore
    }
  }

  // Preset question CRUD
  const handleAddQuestion = async () => {
    const payload = { question_text: questionForm.question_text, category: questionForm.category || null }
    // optimistic
    const newQ: PresetQuestion = { id: `local-q-${Date.now()}`, question_text: payload.question_text, category: payload.category }
    setQuestions((p) => [newQ, ...p])
    setShowQuestionModal(false)
    setQuestionForm({ question_text: '', category: '' })
    try {
      await supabase.from('preset_questions').insert(payload)
    } catch (err) {
      // ignore
    }
  }

  const handleAddResponse = async () => {
    const payload = { question_id: responseForm.question_id, response_text: responseForm.response_text, keywords: responseForm.keywords ? responseForm.keywords.split(',').map(k => k.trim()) : [] }
    const newR: ChatResponse = { id: `local-r-${Date.now()}`, ...payload }
    setResponses((r) => [newR, ...r])
    setShowResponseModal(false)
    setResponseForm({ question_id: null, response_text: '', keywords: '' })
    try {
      await supabase.from('chat_responses').insert(payload)
    } catch (err) {}
  }

  // Chat history preview (last 10)
  const [history, setHistory] = useState<any[]>([])
  const loadHistory = async () => {
    try {
      const { data, error } = await supabase.from('chat_history').select('*').order('created_at', { ascending: false }).limit(10)
      if (!error && data) setHistory(data as any[])
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => { loadHistory() }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><Bot className="w-7 h-7"/> Quản lý Chatbot</h1>
            <p className="text-muted-foreground mt-1">Quản lý chats, câu hỏi mẫu và phản hồi. Tích hợp Supabase nếu có.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/hitek-software" className="border border-border px-4 py-2 rounded-md hover:bg-muted transition-colors">← Quay lại</Link>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold">Admin User</p>
                <p className="text-sm text-muted-foreground">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: chatbot list */}
          <aside className="lg:col-span-1 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Danh sách Chatbot</h3>
              <button onClick={openCreateBot} className="p-2 rounded-md hover:bg-muted"><PlusCircle className="w-5 h-5"/></button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-auto">
              {chatbots.map(cb => (
                <div key={cb.id} onClick={() => setSelectedId(cb.id)} className={`p-3 rounded-md cursor-pointer border ${selectedId === cb.id ? 'border-primary bg-primary/5' : 'border-transparent hover:border-border'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{cb.name}</h4>
                      <p className="text-sm text-muted-foreground">{cb.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full ${cb.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{cb.status === 'active' ? 'Đang' : 'Tạm dừng'}</div>
                      <div className="text-xs text-muted-foreground mt-1">{cb.conversations?.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => openEditBot(cb)} className="flex-1 border border-border py-1 rounded text-sm flex items-center justify-center gap-2"><Edit2 className="w-4 h-4"/> Quản lý</button>
                    <button onClick={() => handleDeleteBot(cb.id)} className="flex-1 border border-border py-1 rounded text-sm flex items-center justify-center gap-2"><Trash2 className="w-4 h-4"/> Xóa</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">Tổng: {chatbots.length}</div>
          </aside>

          {/* Right: details and tabs */}
          <section className="lg:col-span-3 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedBot?.name ?? 'Chọn một Chatbot'}</h2>
                  <p className="text-muted-foreground mt-1">{selectedBot?.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{selectedBot?.conversations ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Cuộc hội thoại</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedBot?.satisfaction ?? 0}%</div>
                    <div className="text-sm text-muted-foreground">Độ hài lòng</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditBot(selectedBot as Chatbot)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"><Settings className="w-4 h-4"/> Cấu hình</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs: Configuration / Responses / History / Analytics */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Cấu hình & nội dung</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setShowQuestionModal(true) }} className="px-3 py-1 border border-border rounded-md text-sm flex items-center gap-2"><PlusCircle className="w-4 h-4"/> Thêm câu hỏi</button>
                  <button onClick={() => { setShowResponseModal(true) }} className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Thêm phản hồi</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Câu hỏi mẫu ({questions.length})</h4>
                      <div className="space-y-3 max-h-48 overflow-auto">
                        {questions.length === 0 && <div className="text-sm text-muted-foreground">Chưa có câu hỏi mẫu. Thêm câu hỏi để bot trả lời nhanh.</div>}
                        {questions.map(q => (
                          <div key={q.id} className="border border-border rounded p-3 flex items-start justify-between">
                            <div>
                              <div className="font-medium">{q.question_text}</div>
                              <div className="text-xs text-muted-foreground">{q.category}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">{q.is_active ? 'Active' : 'Inactive'}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Phản hồi ({responses.length})</h4>
                      <div className="space-y-3 max-h-48 overflow-auto">
                        {responses.length === 0 && <div className="text-sm text-muted-foreground">Chưa có phản hồi. Thêm phản hồi để bot trả lời chính xác hơn.</div>}
                        {responses.map(r => (
                          <div key={r.id} className="border border-border rounded p-3">
                            <div className="font-medium">{r.response_text}</div>
                            <div className="text-xs text-muted-foreground">{r.keywords?.join(', ') ?? '—'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="md:col-span-1">
                  <div className="border border-border rounded p-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5"/>
                      <div>
                        <div className="text-sm text-muted-foreground">Tổng tương tác</div>
                        <div className="font-semibold">{responses.length + questions.length}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded p-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5"/>
                      <div>
                        <div className="text-sm text-muted-foreground">Lịch sử gần nhất</div>
                        <div className="text-xs text-muted-foreground">{history.length} mục</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 max-h-40 overflow-auto">
                      {history.map(h => (
                        <div key={h.id} className="text-xs border border-border rounded p-2">
                          <div className="font-medium">{h.user_message}</div>
                          <div className="text-muted-foreground">{h.bot_response}</div>
                        </div>
                      ))}
                      {history.length === 0 && <div className="text-sm text-muted-foreground">Chưa có lịch sử.</div>}
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Thống kê nhanh</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded">
                    <div className="text-sm text-muted-foreground">Tổng câu hỏi</div>
                    <div className="text-2xl font-bold">{questions.length}</div>
                  </div>
                  <div className="p-4 border border-border rounded">
                    <div className="text-sm text-muted-foreground">Tổng phản hồi</div>
                    <div className="text-2xl font-bold">{responses.length}</div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64">
                <h3 className="font-semibold mb-2">Sự kiện</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Chatbot hoạt động: {chatbots.filter(c => c.status === 'active').length}</div>
                  <div>Chatbot tạm dừng: {chatbots.filter(c => c.status === 'inactive').length}</div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">
          <div className="text-muted-foreground">© 2024 Hitek Software. Tất cả quyền được bảo lưu.</div>
          <div className="flex gap-6">
            <a className="text-muted-foreground hover:text-foreground">Hỗ trợ</a>
            <a className="text-muted-foreground hover:text-foreground">Tài liệu</a>
            <a className="text-muted-foreground hover:text-foreground">Liên hệ</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showBotModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-lg">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{editingBot ? 'Chỉnh sửa Chatbot' : 'Tạo Chatbot mới'}</h3>
              <form className="space-y-4" onSubmit={handleSubmitBot}>
                <div>
                  <label className="block text-sm font-medium mb-2">Tên Chatbot *</label>
                  <input required value={botForm.name} onChange={(e) => setBotForm(prev => ({ ...prev, name: e.target.value }))} className="w-full p-2 border border-border rounded bg-background" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <textarea value={botForm.description} onChange={(e) => setBotForm(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 border border-border rounded bg-background" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Trạng thái</label>
                  <select value={botForm.status} onChange={(e) => setBotForm(prev => ({ ...prev, status: e.target.value }))} className="w-full p-2 border border-border rounded bg-background">
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Ngừng hoạt động</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button type="button" onClick={() => setShowBotModal(false)} className="flex-1 border border-border py-2 rounded">Hủy</button>
                  <button type="submit" className="flex-1 bg-primary text-primary-foreground py-2 rounded">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Thêm câu hỏi mẫu</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Câu hỏi</label>
                <input value={questionForm.question_text} onChange={(e) => setQuestionForm(prev => ({ ...prev, question_text: e.target.value }))} className="w-full p-2 border border-border rounded bg-background" />
              </div>
              <div>
                <label className="block text-sm mb-2">Danh mục</label>
                <input value={questionForm.category} onChange={(e) => setQuestionForm(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 border border-border rounded bg-background" />
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button onClick={() => setShowQuestionModal(false)} className="flex-1 border border-border py-2 rounded">Hủy</button>
                <button onClick={handleAddQuestion} className="flex-1 bg-primary text-primary-foreground py-2 rounded">Thêm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResponseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Thêm phản hồi</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Câu hỏi liên quan (tùy chọn)</label>
                <select value={responseForm.question_id ?? ''} onChange={(e) => setResponseForm(prev => ({ ...prev, question_id: e.target.value || null }))} className="w-full p-2 border border-border rounded bg-background">
                  <option value="">-- Chọn --</option>
                  {questions.map(q => <option key={q.id} value={q.id}>{q.question_text}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Nội dung phản hồi *</label>
                <textarea value={responseForm.response_text} onChange={(e) => setResponseForm(prev => ({ ...prev, response_text: e.target.value }))} className="w-full p-2 border border-border rounded bg-background" rows={4} />
              </div>
              <div>
                <label className="block text-sm mb-2">Từ khóa (phân cách bởi dấu phẩy)</label>
                <input value={responseForm.keywords} onChange={(e) => setResponseForm(prev => ({ ...prev, keywords: e.target.value }))} className="w-full p-2 border border-border rounded bg-background" />
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button onClick={() => setShowResponseModal(false)} className="flex-1 border border-border py-2 rounded">Hủy</button>
                <button onClick={handleAddResponse} className="flex-1 bg-primary text-primary-foreground py-2 rounded">Thêm phản hồi</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

