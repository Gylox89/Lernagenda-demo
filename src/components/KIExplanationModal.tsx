// components/KIExplanationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

interface KIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (mode: 'explanation' | 'quiz', score?: number, total?: number) => void;
  itemId: number;
  itemTitle: string;
  phase: 'initial' | 'final';
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  isStreaming?: boolean;
}

const KIExplanationModal: React.FC<KIExplanationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  itemId,
  itemTitle,
  phase,
}) => {
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [explorationDone, setExplorationDone] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, streamingMessage]);

  useEffect(() => {
    if (isOpen) {
      startExplanation();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isOpen, itemId, phase]);

  const startExplanation = async () => {
    setLoading(true);
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch('http://localhost:3001/api/explain/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId, 
          phase, 
          chatHistory: [], 
          explorationDone: false 
        }),
        signal: abortControllerRef.current.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullMessage = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.token) {
              fullMessage += data.token;
              setStreamingMessage(fullMessage);
            }
            if (data.done) {
              setChatHistory([{ role: 'assistant', content: fullMessage }]);
              setStreamingMessage('');
              setLoading(false);
              if (data.explorationDone) {
                setExplorationDone(true);
              }
            }
          }
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fehler:', error);
        setChatHistory([{
          role: 'assistant',
          content: phase === 'initial'
            ? `Lass uns gemeinsam das Thema "${itemTitle}" anschauen. Was möchtest du dazu wissen?`
            : `Super, dass du das Thema "${itemTitle}" abgeschlossen hast! Ich werde dich jetzt etwas genauer dazu befragen.`,
        }]);
        setLoading(false);
      }
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || waitingForResponse) return;

    const userMessage: Message = { role: 'user', content: userInput };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setWaitingForResponse(true);
    setStreamingMessage('');

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('http://localhost:3001/api/explain/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          phase,
          chatHistory: [...chatHistory, userMessage],
          explorationDone,
        }),
        signal: abortControllerRef.current.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullMessage = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.token) {
              fullMessage += data.token;
              setStreamingMessage(fullMessage);
            }
            if (data.done) {
              setChatHistory(prev => [...prev, { role: 'assistant', content: fullMessage }]);
              setStreamingMessage('');
              setWaitingForResponse(false);
              if (data.explorationDone) {
                setExplorationDone(true);
              }
            }
          }
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fehler:', error);
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: 'Entschuldigung, da ist ein Fehler aufgetreten. Bitte versuche es noch einmal.',
        }]);
        setWaitingForResponse(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleComplete = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    onComplete('explanation');
    onClose();
  };

  // Hilfsfunktion für bessere Lesbarkeit der User-Nachrichten
  const formatUserMessage = (content: string) => {
    return content;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${phase === 'initial' ? 'Lernunterstützung' : 'Vertiefte Abfrage'}: ${itemTitle}`} size="lg">
      <div className="flex flex-col h-[500px]">
        {/* Chat-Bereich */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-2 bg-gray-50 rounded-lg">
          {loading && streamingMessage === '' ? (
            <div className="text-center py-8">
              <div className="animate-spin text-3xl mb-2">🤖</div>
              <p className="text-gray-600">Die KI bereitet eine Antwort vor...</p>
            </div>
          ) : (
            <>
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                      msg.role === 'assistant'
                        ? 'bg-white text-gray-800 border border-gray-200'
                        : 'bg-primary-600 text-white'
                    }`}
                  >
                    {/* Name des Senders */}
                    <div className={`text-xs mb-1 ${msg.role === 'assistant' ? 'text-gray-500' : 'text-primary-200'}`}>
                      {msg.role === 'assistant' ? '🤖 KI-Assistent' : '👤 Du'}
                    </div>
                    {/* Nachrichteninhalt */}
                    <p className="whitespace-pre-wrap break-words">
                      {msg.role === 'user' ? formatUserMessage(msg.content) : msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {/* Aktuell streamende Nachricht */}
              {streamingMessage && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 max-w-[80%]">
                    <div className="text-xs text-gray-500 mb-1">🤖 KI-Assistent</div>
                    <p className="whitespace-pre-wrap">
                      {streamingMessage}
                      <span className="inline-block w-2 h-4 ml-0.5 bg-primary-500 animate-pulse"> </span>
                    </p>
                  </div>
                </div>
              )}
              {/* Warte-Indikator */}
              {waitingForResponse && !streamingMessage && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">🤖 KI-Assistent</div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Input-Bereich mit eigener Nachrichtenvorschau */}
        <div className="border-t pt-3">
          {userInput.trim() && (
            <div className="mb-2 p-2 bg-gray-100 rounded-lg text-sm text-gray-500 italic">
              <span className="font-medium">Du schreibst:</span> {userInput}
            </div>
          )}
          <div className="flex space-x-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                phase === 'initial'
                  ? 'Frage zum Thema... (oder "genug" zum Beenden)'
                  : 'Antworte auf die Frage...'
              }
              className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
              disabled={waitingForResponse || loading}
            />
            <button
              onClick={sendMessage}
              disabled={waitingForResponse || loading || !userInput.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              Senden
            </button>
          </div>
        </div>

        {/* Abschluss-Button */}
        {explorationDone && (
          <div className="mt-4 pt-3 border-t text-center">
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {phase === 'initial' ? 'Zum Lernerfolg speichern' : 'Abfrage abschließen'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default KIExplanationModal;