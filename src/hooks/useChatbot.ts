import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface PresetQuestion {
  id: string;
  question_text: string;
  category?: string;
  display_order?: number;
  is_active?: boolean;
  parent_id?: string;
  is_final?: boolean;
}

export interface ChatResponse {
  id: string;
  question_id: string;
  response_text: string;
  keywords?: string[];
}

export interface ChatHistory {
  id: string;
  user_message: string;
  bot_response: string;
  session_id?: string;
  created_at: string;
}

export function useChatbot() {
  const [questions, setQuestions] = useState<PresetQuestion[]>([]);
  const [responses, setResponses] = useState<ChatResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('preset_questions')
        .select('*')
        .order('display_order');

      if (error) throw error;

      setQuestions(data || []);
    } catch (err: any) {
      console.error('Error loading questions:', err);
      setError(err.message || 'Lỗi khi tải câu hỏi');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadResponses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('chat_responses')
        .select('*');

      if (error) throw error;

      setResponses(data || []);
    } catch (err: any) {
      console.error('Error loading responses:', err);
      setError(err.message || 'Lỗi khi tải câu trả lời');
    } finally {
      setLoading(false);
    }
  }, []);

  const addResponse = async (response: Omit<ChatResponse, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('chat_responses')
        .insert(response)
        .select()
        .single();
      
      if (error) throw error;

      setResponses(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Error adding response:', err);
      return null;
    }
  };

  useEffect(() => {
    loadQuestions();
    loadResponses();
  }, [loadQuestions, loadResponses]);

  return {
    questions,
    responses,
    loading,
    error,
    loadQuestions,
    loadResponses,
    addResponse
  };
}

