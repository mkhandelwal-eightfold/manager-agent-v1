import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 1001;
`;

const PanelHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileDetails = styled.div``;

const ProfileName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const ProfileRole = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6B7280;
  &:hover {
    color: #374151;
  }
`;

const PanelContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const AgentToggle = styled.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 16px;
`;

const ToggleOption = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.active ? '#fff' : 'transparent'};
  color: ${props => props.active ? '#1976D2' : '#6B7280'};
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    color: ${props => props.active ? '#1976D2' : '#374151'};
  }
`;

const AgentContext = styled.div`
  background: #F8FAFF;
  border: 1px solid #E3F2FD;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 13px;
`;

const ContextHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #1976D2;
  margin-bottom: 4px;
`;

const ContextText = styled.div`
  color: #64748B;
  line-height: 1.4;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const Message = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-start;
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isUser ? '#3B82F6' : '#667EEA'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  background: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.5;
`;

const PromptButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #fff;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #374151;
  margin-bottom: 12px;
  width: 100%;
  
  &:hover {
    border-color: #3B82F6;
    background: #F8FAFF;
  }
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #E5E7EB;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const PanelActions = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E5E7EB;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #F9FAFB;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  padding: 12px 16px;
  gap: 12px;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const SendButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #3B82F6;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #2563EB;
  }
`;

const prompts = [
  "Build onboarding plan for backfill",
  "Detail the major projects Marley worked on and their specific contributions",
  "What knowledge or practices did Marley leave behind for the team?"
];

export default function ChatPanel({ isOpen, onClose, selectedEmployee, onExpandChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [agentMode, setAgentMode] = useState('manager'); // 'manager' or 'digital-twin'

  if (!isOpen || !selectedEmployee) return null;

  const handlePromptClick = (prompt) => {
    setMessages(prev => [...prev, {
      text: prompt,
      isUser: true,
      timestamp: new Date()
    }]);

    // Simulate AI response based on agent mode
    setTimeout(() => {
      const responsePrefix = agentMode === 'digital-twin' 
        ? `As ${selectedEmployee.name}'s digital twin, I can share that` 
        : `As their manager, I can tell you that`;
        
      setMessages(prev => [...prev, {
        text: `${responsePrefix} this is an important topic. Let me provide you with detailed insights based on our organizational data and ${selectedEmployee.name}'s work history.`,
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      text: input,
      isUser: true,
      timestamp: new Date()
    }]);

    const userInput = input;
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responsePrefix = agentMode === 'digital-twin' 
        ? `Speaking as ${selectedEmployee.name}'s digital twin,` 
        : `From a management perspective,`;
        
      setMessages(prev => [...prev, {
        text: `${responsePrefix} I understand your question about "${userInput}". Let me help you with that information.`,
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <Panel isOpen={isOpen}>
        <PanelHeader>
          <HeaderInfo>
            <ProfileSection>
              <ProfileImage src={selectedEmployee.photo} alt={selectedEmployee.name} />
              <ProfileDetails>
                <ProfileName>{selectedEmployee.name}</ProfileName>
                <ProfileRole>{selectedEmployee.role}</ProfileRole>
              </ProfileDetails>
            </ProfileSection>
          </HeaderInfo>
          <CloseButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </PanelHeader>

        <PanelContent>
          <AgentToggle>
            <ToggleOption 
              active={agentMode === 'manager'} 
              onClick={() => setAgentMode('manager')}
            >
              Manager Agent
            </ToggleOption>
            <ToggleOption 
              active={agentMode === 'digital-twin'} 
              onClick={() => setAgentMode('digital-twin')}
            >
              Digital Twin
            </ToggleOption>
          </AgentToggle>

          <AgentContext>
            <ContextHeader>
              {agentMode === 'digital-twin' ? (
                <>
                  <PersonIcon fontSize="small" />
                  Digital Twin Mode
                </>
              ) : (
                <>
                  <AutoAwesomeIcon fontSize="small" />
                  Manager Agent Mode
                </>
              )}
            </ContextHeader>
            <ContextText>
              {agentMode === 'digital-twin' 
                ? `Discussing ${selectedEmployee.name} from their perspective using their knowledge, experiences, and work patterns.`
                : `Discussing ${selectedEmployee.name} from a management perspective with insights about their contributions, projects, and team impact.`
              }
            </ContextText>
          </AgentContext>

          <ChatMessages>
            {messages.length === 0 && (
              <div style={{ marginBottom: '16px' }}>
                {prompts.map((prompt, index) => (
                  <PromptButton key={index} onClick={() => handlePromptClick(prompt)}>
                    {prompt}
                  </PromptButton>
                ))}
              </div>
            )}
            
            {messages.map((message, index) => (
              <Message key={index}>
                <MessageAvatar isUser={message.isUser}>
                  {message.isUser ? 'U' : (agentMode === 'digital-twin' ? 'DT' : 'MA')}
                </MessageAvatar>
                <MessageContent>
                  {message.text}
                </MessageContent>
              </Message>
            ))}
          </ChatMessages>
        </PanelContent>

        <PanelActions>
          <ExpandButton onClick={onExpandChat}>
            <FullscreenIcon fontSize="small" />
            Expand chat
          </ExpandButton>
          
          <form onSubmit={handleSendMessage} style={{ width: '100%' }}>
            <InputContainer>
              <ChatInput
                placeholder={`Ask the ${agentMode === 'digital-twin' ? 'Digital Twin' : 'Manager Agent'} about ${selectedEmployee.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <SendButton type="submit">
                <SendIcon fontSize="small" />
              </SendButton>
            </InputContainer>
          </form>
        </PanelActions>
      </Panel>
    </>
  );
} 