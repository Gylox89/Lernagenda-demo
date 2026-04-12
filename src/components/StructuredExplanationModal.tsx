// components/StructuredExplanationModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

interface StructuredExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  itemId: number;
  itemTitle: string;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  type?: 'explanation' | 'question' | 'feedback' | 'summary' | 'prompt';
}

const StructuredExplanationModal: React.FC<StructuredExplanationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  itemId,
  itemTitle,
}) => {
  const [loading, setLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(4);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    if (isOpen) {
      startExplanation();
    }
  }, [isOpen, itemId]);

  const startExplanation = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/explain/structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId, 
          phase: 'initial',
          chatHistory: [],
          currentChunkIndex: 0,
        }),
      });
      const data = await response.json();
      
      setChatHistory([{
        role: 'assistant',
        content: data.content,
        type: data.type,
      }]);
      setCurrentChunkIndex(data.chunkIndex);
      setTotalChunks(data.totalChunks);
      setIsComplete(data.isComplete);
    } catch (error) {
      console.error('Fehler:', error);
      setChatHistory([{
        role: 'assistant',
        content: `Lass uns gemeinsam das Thema "${itemTitle}" erkunden. Ich werde dir Schritt für Schritt helfen.`,
        type: 'explanation',
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Zentrale Funktion zum Senden einer Nachricht
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || waitingForResponse || isComplete) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setWaitingForResponse(true);

    try {
      const response = await fetch('http://localhost:3001/api/explain/structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          phase: 'initial',
          chatHistory: [...chatHistory, userMessage],
          currentChunkIndex,
        }),
      });
      const data = await response.json();
      
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        type: data.type,
      }]);
      setCurrentChunkIndex(data.chunkIndex);
      setIsComplete(data.isComplete);
      
      if (data.isComplete) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } catch (error) {
      console.error('Fehler:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Entschuldigung, da ist ein Fehler aufgetreten. Bitte versuche es noch einmal.',
        type: 'feedback',
      }]);
    } finally {
      setWaitingForResponse(false);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      sendMessage(userInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSkipToAssessment = () => {
    onComplete();
    onClose();
  };

  // Schnellauswahl-Buttons – senden die Nachricht direkt
  const quickReplies = [
    { label: 'Weiter', value: 'weiter' },
    { label: 'Ja', value: 'ja' },
    { label: 'Nein', value: 'nein' },
    { label: 'Frage?', value: 'ich habe eine frage' },
  ];

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const progress = totalChunks > 0 ? ((currentChunkIndex + 1) / totalChunks) * 100 : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Lernbegleitung: ${itemTitle}`} size="lg">
      <div className="flex flex-col h-[550px]">
        {/* Fortschrittsbalken */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Lernfortschritt</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Chat-Bereich */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-2 bg-gray-50 rounded-lg">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-3xl mb-2">🤖</div>
              <p className="text-gray-600">Die KI bereitet die Lerneinheit vor...</p>
            </div>
          ) : (
            <>
              {chatHistory.map((msg, idx) => {
                let icon = '';
                if (msg.role === 'assistant') {
                  if (msg.type === 'question') icon = '❓ ';
                  else if (msg.type === 'feedback') icon = '💡 ';
                  else if (msg.type === 'summary') icon = '📝 ';
                  else if (msg.type === 'prompt') icon = '💬 ';
                  else icon = '📖 ';
                }
                
                return (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                        msg.role === 'assistant'
                          ? msg.type === 'question'
                            ? 'bg-yellow-50 border-l-4 border-yellow-400'
                            : msg.type === 'feedback'
                            ? 'bg-green-50 border-l-4 border-green-400'
                            : msg.type === 'prompt'
                            ? 'bg-blue-50 border-l-4 border-blue-400'
                            : 'bg-white border border-gray-200'
                          : 'bg-primary-600 text-white'
                      }`}
                    >
                      <div className={`text-xs mb-1 ${msg.role === 'assistant' ? 'text-gray-500' : 'text-primary-200'}`}>
                        {msg.role === 'assistant' ? `🤖 KI-Assistent ${icon}` : '👤 Du'}
                      </div>
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              
              {waitingForResponse && (
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

        {/* Input-Bereich */}
        <div className="border-t pt-3">
          {/* Permanenter Button "Weiter zur Selbsteinschätzung" */}
          <div className="mb-3">
            <button
              onClick={handleSkipToAssessment}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>✓</span>
              <span>Weiter zur Selbsteinschätzung</span>
            </button>
            <p className="text-xs text-gray-400 text-center mt-1">
              Du kannst jederzeit zur Selbsteinschätzung springen, auch wenn du die Erklärung nicht vollständig durchlaufen hast.
            </p>
          </div>

          {isComplete && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800 font-medium">🎉 Super! Du hast die Lerneinheit abgeschlossen.</p>
              <p className="text-green-600 text-sm">Du wirst gleich zur Selbsteinschätzung weitergeleitet...</p>
            </div>
          )}
          
          {!isComplete && !loading && (
            <>
              {/* Schnellauswahl-Buttons – senden direkt */}
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.label}
                    onClick={() => handleQuickReply(reply.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
              
              {/* Texteingabe + Senden-Button */}
              <div className="flex space-x-2">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Antworte auf die Frage... (oder nutze die Schnellauswahl)"
                  className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500"
                  rows={2}
                  disabled={waitingForResponse}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={waitingForResponse || !userInput.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  Senden
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                💡 Tipp: Klicke auf "Weiter", "Ja", "Nein" oder "Frage?" – die Antwort wird automatisch gesendet.
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default StructuredExplanationModal;