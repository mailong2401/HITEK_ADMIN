// contexts/ChatbotContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { chatbotService, PresetQuestion, ChatResponse, ChatHistory, ChatbotConfig } from '@/services/chatbotService';

interface ChatbotContextType {
  // Preset Questions
  presetQuestions: PresetQuestion[];
  loadingQuestions: boolean;
  loadPresetQuestions: () => Promise<void>;
  createPresetQuestion: (questionData: Omit<PresetQuestion, 'id' | 'created_at'>) => Promise<boolean>;
  updatePresetQuestion: (id: string, questionData: Partial<PresetQuestion>) => Promise<boolean>;
  deletePresetQuestion: (id: string) => Promise<boolean>;
  
  // Chat Responses
  chatResponses: ChatResponse[];
  loadingResponses: boolean;
  loadChatResponses: () => Promise<void>;
  createChatResponse: (responseData: Omit<ChatResponse, 'id' | 'created_at'>) => Promise<boolean>;
  updateChatResponse: (id: string, responseData: Partial<ChatResponse>) => Promise<boolean>;
  deleteChatResponse: (id: string) => Promise<boolean>;
  
  // Chat History
  chatHistory: ChatHistory[];
  loadingHistory: boolean;
  loadChatHistory: (sessionId?: string) => Promise<void>;
  
  // Analytics
  analytics: any;
  loadingAnalytics: boolean;
  loadAnalytics: () => Promise<void>;
  
  // Chatbot Configs
  chatbots: ChatbotConfig[];
  loadingChatbots: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [presetQuestions, setPresetQuestions] = useState<PresetQuestion[]>([]);
  const [chatResponses, setChatResponses] = useState<ChatResponse[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [chatbots, setChatbots] = useState<ChatbotConfig[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingChatbots, setLoadingChatbots] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadPresetQuestions(),
      loadChatResponses(),
      loadChatHistory(),
      loadAnalytics(),
      loadChatbots()
    ]);
  };

  // Preset Questions
  const loadPresetQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const questions = await chatbotService.getPresetQuestions();
      setPresetQuestions(questions);
    } catch (error) {
      console.error('Error loading preset questions:', error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const createPresetQuestion = async (questionData: Omit<PresetQuestion, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      await chatbotService.createPresetQuestion(questionData);
      await loadPresetQuestions();
      return true;
    } catch (error) {
      console.error('Error creating preset question:', error);
      return false;
    }
  };

  const updatePresetQuestion = async (id: string, questionData: Partial<PresetQuestion>): Promise<boolean> => {
    try {
      await chatbotService.updatePresetQuestion(id, questionData);
      await loadPresetQuestions();
      return true;
    } catch (error) {
      console.error('Error updating preset question:', error);
      return false;
    }
  };

  const deletePresetQuestion = async (id: string): Promise<boolean> => {
    try {
      await chatbotService.deletePresetQuestion(id);
      await loadPresetQuestions();
      return true;
    } catch (error) {
      console.error('Error deleting preset question:', error);
      return false;
    }
  };

  // Chat Responses
  const loadChatResponses = async () => {
    setLoadingResponses(true);
    try {
      const responses = await chatbotService.getChatResponses();
      setChatResponses(responses);
    } catch (error) {
      console.error('Error loading chat responses:', error);
    } finally {
      setLoadingResponses(false);
    }
  };

  const createChatResponse = async (responseData: Omit<ChatResponse, 'id' | 'created_at'>): Promise<boolean> => {
    try {
      await chatbotService.createChatResponse(responseData);
      await loadChatResponses();
      return true;
    } catch (error) {
      console.error('Error creating chat response:', error);
      return false;
    }
  };

  const updateChatResponse = async (id: string, responseData: Partial<ChatResponse>): Promise<boolean> => {
    try {
      await chatbotService.updateChatResponse(id, responseData);
      await loadChatResponses();
      return true;
    } catch (error) {
      console.error('Error updating chat response:', error);
      return false;
    }
  };

  const deleteChatResponse = async (id: string): Promise<boolean> => {
    try {
      await chatbotService.deleteChatResponse(id);
      await loadChatResponses();
      return true;
    } catch (error) {
      console.error('Error deleting chat response:', error);
      return false;
    }
  };

  // Chat History
  const loadChatHistory = async (sessionId?: string) => {
    setLoadingHistory(true);
    try {
      const history = await chatbotService.getChatHistory(sessionId);
      setChatHistory(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Analytics
  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const analyticsData = await chatbotService.getChatbotAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Chatbots
  const loadChatbots = async () => {
    setLoadingChatbots(true);
    try {
      // Tạm thời sử dụng dữ liệu mẫu, có thể kết nối với database sau
      const demoChatbots: ChatbotConfig[] = [
        {
          id: 1,
          name: "CSKH - Hitek Software",
          status: "active",
          conversations: 1247,
          satisfaction: 92,
          description: "Chatbot hỗ trợ khách hàng và tư vấn dịch vụ"
        },
        {
          id: 2,
          name: "Tư vấn dự án",
          status: "active",
          conversations: 893,
          satisfaction: 88,
          description: "Chatbot tư vấn và giới thiệu dự án phần mềm"
        }
      ];
      setChatbots(demoChatbots);
    } catch (error) {
      console.error('Error loading chatbots:', error);
    } finally {
      setLoadingChatbots(false);
    }
  };

  const value: ChatbotContextType = {
    // Preset Questions
    presetQuestions,
    loadingQuestions,
    loadPresetQuestions,
    createPresetQuestion,
    updatePresetQuestion,
    deletePresetQuestion,
    
    // Chat Responses
    chatResponses,
    loadingResponses,
    loadChatResponses,
    createChatResponse,
    updateChatResponse,
    deleteChatResponse,
    
    // Chat History
    chatHistory,
    loadingHistory,
    loadChatHistory,
    
    // Analytics
    analytics,
    loadingAnalytics,
    loadAnalytics,
    
    // Chatbot Configs
    chatbots,
    loadingChatbots
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
