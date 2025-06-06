import React, { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: #fff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
`;

const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
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

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  &:hover {
    background: #F3F4F6;
  }
`;

const ProfileSection = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const DigitalTwinBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: #3B82F6;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
  border: 2px solid #fff;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

const ProfileRole = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
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

const ChatInputContainer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E5E7EB;
  background: #fff;
`;

const ChatInputWrapper = styled.div`
  position: relative;
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
  color: #374151;
  
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
  transition: background 0.2s;
  
  &:hover {
    background: #2563EB;
  }
`;

const Disclaimer = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #6B7280;
  text-align: center;
`;

const prompts = [
  "Build onboarding plan for backfill",
  "Detail the major projects Marley worked on and their specific contributions",
  "What knowledge or practices did Marley leave behind for the team?"
];

export default function ChatPanel({ isOpen, onClose, selectedEmployee }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handlePromptClick = (prompt) => {
    setMessages([...messages, { text: prompt, isUser: true }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `I'd be happy to help with "${prompt}". As Marley's digital twin, I can provide insights based on their work history and contributions.`, 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your question! I'm processing that information as Marley's digital twin.", 
        isUser: false 
      }]);
    }, 1000);
  };

  if (!selectedEmployee) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Panel isOpen={isOpen}>
        <Header>
          <HeaderTitle>Ask Digital Twin</HeaderTitle>
          <HeaderActions>
            <ActionButton>
              <span>View profile</span>
              <OpenInNewIcon fontSize="small" />
            </ActionButton>
            <CloseButton onClick={onClose}>
              <CloseIcon fontSize="small" />
            </CloseButton>
          </HeaderActions>
        </Header>

        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
            <DigitalTwinBadge>DIGITAL TWIN</DigitalTwinBadge>
          </ProfileImageContainer>
          <ProfileInfo>
            <ProfileName>{selectedEmployee.name}</ProfileName>
            <ProfileRole>{selectedEmployee.role}</ProfileRole>
          </ProfileInfo>
        </ProfileSection>

        <ChatContent>
          {messages.length === 0 ? (
            prompts.map((prompt, index) => (
              <PromptButton key={index} onClick={() => handlePromptClick(prompt)}>
                {prompt}
              </PromptButton>
            ))
          ) : (
            <div>
              {messages.map((message, index) => (
                <div key={index} style={{ 
                  marginBottom: '12px', 
                  padding: '12px', 
                  borderRadius: '8px',
                  background: message.isUser ? '#3B82F6' : '#F3F4F6',
                  color: message.isUser ? '#fff' : '#374151',
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  marginLeft: message.isUser ? 'auto' : '0',
                  marginRight: message.isUser ? '0' : 'auto'
                }}>
                  {message.text}
                </div>
              ))}
            </div>
          )}
        </ChatContent>

        <ChatInputContainer>
          <form onSubmit={handleSendMessage}>
            <ChatInputWrapper>
              <ChatInput 
                placeholder={`Ask ${selectedEmployee.name} anything...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <SendButton type="submit">
                <KeyboardArrowUpIcon fontSize="small" />
              </SendButton>
            </ChatInputWrapper>
          </form>
          <Disclaimer>Use my digital twin responsibly</Disclaimer>
        </ChatInputContainer>
      </Panel>
    </>
  );
} 