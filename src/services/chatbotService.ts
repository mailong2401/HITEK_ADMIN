// services/chatbotService.ts
import { supabase } from '@/lib/supabase';

export interface PresetQuestion {
  id: string;
  question_text: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  parent_id: string | null;
  is_final: boolean | null;
}

export interface ChatResponse {
  id: string;
  question_id: string | null;
  response_text: string;
  keywords: string[] | null;
  created_at: string;
}

export interface ChatHistory {
  id: string;
  user_message: string;
  bot_response: string;
  session_id: string | null;
  created_at: string;
}

export interface ChatbotConfig {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  conversations: number;
  satisfaction: number;
  description: string;
}

class ChatbotService {
  // Preset Questions
  async getPresetQuestions(): Promise<PresetQuestion[]> {
    const { data, error } = await supabase
      .from('preset_questions')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async createPresetQuestion(questionData: Omit<PresetQuestion, 'id' | 'created_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('preset_questions')
      .insert([questionData])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  async updatePresetQuestion(id: string, questionData: Partial<PresetQuestion>): Promise<boolean> {
    const { error } = await supabase
      .from('preset_questions')
      .update(questionData)
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  async deletePresetQuestion(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('preset_questions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Chat Responses
  async getChatResponses(): Promise<ChatResponse[]> {
    const { data, error } = await supabase
      .from('chat_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createChatResponse(responseData: Omit<ChatResponse, 'id' | 'created_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('chat_responses')
      .insert([responseData])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  async updateChatResponse(id: string, responseData: Partial<ChatResponse>): Promise<boolean> {
    const { error } = await supabase
      .from('chat_responses')
      .update(responseData)
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  async deleteChatResponse(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('chat_responses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Chat History
  async getChatHistory(sessionId?: string): Promise<ChatHistory[]> {
    let query = supabase
      .from('chat_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createChatHistory(historyData: Omit<ChatHistory, 'id' | 'created_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('chat_history')
      .insert([historyData])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  }

  // Analytics
  async getChatbotAnalytics() {
    const { data: history, error } = await supabase
      .from('chat_history')
      .select('*');

    if (error) throw error;

    const totalConversations = history?.length || 0;
    const uniqueSessions = new Set(history?.map(h => h.session_id)).size;

    return {
      totalConversations,
      uniqueSessions,
      satisfactionRate: 89, // Có thể tính toán dựa trên feedback
      activeChatbots: 2
    };
  }
}

export const chatbotService = new ChatbotService();
