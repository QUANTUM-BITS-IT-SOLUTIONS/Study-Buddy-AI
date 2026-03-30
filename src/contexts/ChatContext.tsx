import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const STORAGE_KEY = 'rag_tutor_chat';

// Mock AI responses for demo
const mockResponses = [
  "Based on your uploaded notes, I can see that this topic covers several key concepts. Let me break it down for you:\n\n1. **Core Principles**: The fundamental ideas revolve around understanding the relationship between variables.\n\n2. **Key Applications**: These concepts are widely used in practical scenarios.\n\n3. **Important Formulas**: Remember to apply the formulas correctly based on the context.\n\nWould you like me to elaborate on any specific point?",
  
  "That's a great question! Looking at your study materials, here's what I found:\n\n📚 **Definition**: The concept you're asking about is defined as a fundamental principle in this field.\n\n🔍 **Key Insight**: Understanding this helps connect multiple topics together.\n\n💡 **Tip**: Focus on understanding the 'why' behind the concept, not just memorizing.\n\nIs there anything specific you'd like me to clarify?",
  
  "I've analyzed your notes and here's a comprehensive answer:\n\n**Overview**\nThis topic is essential for understanding the broader subject matter. Your notes mention several important aspects.\n\n**Detailed Explanation**\nThe process involves multiple steps that build upon each other. Each step contributes to the final outcome.\n\n**Summary**\n- Point 1: Foundation concepts\n- Point 2: Application methods\n- Point 3: Common pitfalls to avoid\n\nLet me know if you need more details!",
  
  "According to your uploaded documents, this is a multi-layered topic. Here's my analysis:\n\n🎯 **Main Idea**: The central theme focuses on solving problems systematically.\n\n📊 **Supporting Details**:\n- Evidence from your notes suggests multiple approaches\n- Historical context provides valuable perspective\n- Modern applications are widespread\n\n✅ **Conclusion**: Understanding this thoroughly will help you in related areas too.\n\nWant me to dive deeper into any section?",
  
  "Great question! Based on your study materials:\n\n**Quick Answer**: The key to understanding this lies in breaking it down into smaller components.\n\n**Detailed Analysis**:\n1. First, consider the basic principles\n2. Then, apply these to specific scenarios\n3. Finally, verify your understanding with examples\n\n**Pro Tip**: Your notes have some excellent examples on page 3 that illustrate this perfectly.\n\nAnything else you'd like to explore?",
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const getUserStorageKey = () => `${STORAGE_KEY}_${user?.id || 'guest'}`;

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(getUserStorageKey());
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMessages(parsed.map((msg: ChatMessage & { timestamp: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })));
        } catch {
          localStorage.removeItem(getUserStorageKey());
        }
      }
    } else {
      setMessages([]);
    }
  }, [user]);

  const saveMessages = (msgs: ChatMessage[]) => {
    if (user) {
      localStorage.setItem(getUserStorageKey(), JSON.stringify(msgs));
    }
  };

  const sendMessage = async (content: string): Promise<void> => {
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);

    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
    setIsTyping(false);

    // Get a random mock response
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}_assistant`,
      role: 'assistant',
      content: randomResponse,
      timestamp: new Date(),
    };

    const finalMessages = [...updatedMessages, assistantMessage];
    setMessages(finalMessages);
    saveMessages(finalMessages);
  };

  const clearChat = () => {
    setMessages([]);
    if (user) {
      localStorage.removeItem(getUserStorageKey());
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
