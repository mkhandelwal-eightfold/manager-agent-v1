import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SecurityIcon from '@mui/icons-material/Security';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 2000;
  display: flex;
`;

const Sidebar = styled.div`
  width: 280px;
  background: #F8F9FA;
  border-right: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #374151;
  cursor: pointer;
  padding: 8px 0;
  &:hover {
    color: #111827;
  }
`;

const AgentsList = styled.div`
  flex: 1;
  padding: 16px;
`;

const AgentSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  margin-bottom: 8px;
  padding: 0 8px;
`;

const AgentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.active ? '#E3F2FD' : 'transparent'};
  color: ${props => props.active ? '#1976D2' : '#374151'};
  
  &:hover {
    background: ${props => props.active ? '#E3F2FD' : '#F3F4F6'};
  }
`;

const AgentIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color || '#E5E7EB'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const AgentInfo = styled.div`
  flex: 1;
`;

const AgentName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const AgentDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ChatHeaderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const ChatHeaderInfo = styled.div`
`;

const ChatTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

const ChatSubtitle = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: #FAFBFC;
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
  font-size: 14px;
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

const InputArea = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E5E7EB;
  background: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 12px 16px;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const InputButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${props => props.primary ? '#3B82F6' : 'transparent'};
  color: ${props => props.primary ? '#fff' : '#6B7280'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.primary ? '#2563EB' : '#F3F4F6'};
  }
`;

const prompts = [
  "Build onboarding plan for backfill",
  "Detail the major projects Marley worked on and their specific contributions",
  "What knowledge or practices did Marley leave behind for the team?"
];

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

const agents = [
  {
    id: 'manager',
    name: 'Manager Agent',
    description: 'Strategic oversight and team management',
    icon: <BusinessIcon />,
    color: '#667EEA',
    category: 'primary'
  },
  {
    id: 'employee',
    name: 'Employee Agent',
    description: 'Individual contributor insights',
    icon: <PersonIcon />,
    color: '#3B82F6',
    category: 'primary'
  },
  {
    id: 'hr',
    name: 'HR Agent',
    description: 'People operations and policies',
    icon: <SupportAgentIcon />,
    color: '#10B981',
    category: 'secondary'
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    description: 'Data insights and reporting',
    icon: <AnalyticsIcon />,
    color: '#F59E0B',
    category: 'secondary'
  },
  {
    id: 'security',
    name: 'Security Agent',
    description: 'Compliance and access control',
    icon: <SecurityIcon />,
    color: '#EF4444',
    category: 'secondary'
  },
  {
    id: 'support',
    name: 'IT Support Agent',
    description: 'Technical assistance and troubleshooting',
    icon: <SupportAgentIcon />,
    color: '#8B5CF6',
    category: 'secondary'
  }
];

const detailedResponses = {
  "Build onboarding plan for backfill": [
    {
      text: "Based on Marley's role and responsibilities, here's a comprehensive onboarding plan for their backfill:",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Week 1-2: Foundation & Context**\n• Review Marley's project documentation and code repositories\n• Shadow current team members on ongoing initiatives\n• Meet with key stakeholders and cross-functional partners\n• Complete company-wide onboarding modules",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Week 3-4: Domain Knowledge**\n• Deep dive into our product architecture and technical stack\n• Review customer feedback and usage patterns\n• Understand our deployment processes and CI/CD pipeline\n• Begin contributing to smaller bug fixes and features",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Month 2: Ownership Transition**\n• Take ownership of 2-3 smaller features\n• Participate in planning and estimation sessions\n• Begin mentoring newer team members\n• Lead a small cross-team collaboration",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "Would you like me to detail any specific aspect of this onboarding plan?",
      isUser: false,
      timestamp: new Date()
    }
  ],
  "Detail the major projects Marley worked on and their specific contributions": [
    {
      text: "Let me walk you through Marley's major contributions over the past 18 months:",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Project Alpha - Customer Analytics Dashboard (Q2-Q3 2024)**\n• Led the redesign of our analytics interface\n• Improved user engagement by 45%\n• Implemented real-time data visualization\n• Coordinated with 3 different teams for seamless integration",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Project Beta - API Performance Optimization (Q4 2024)**\n• Reduced API response times by 60%\n• Implemented advanced caching strategies\n• Led code reviews and established new performance standards\n• Mentored 2 junior developers throughout the project",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Project Gamma - Mobile App Integration (Q1 2025)**\n• Architected the mobile-web sync functionality\n• Established cross-platform testing protocols\n• Worked directly with product managers on user experience\n• Delivered 2 weeks ahead of schedule",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Continuous Contributions:**\n• Reviewed 200+ pull requests\n• Reduced technical debt by 30% through refactoring initiatives\n• Established team coding standards and documentation practices\n• Led weekly tech talks and knowledge sharing sessions",
      isUser: false,
      timestamp: new Date()
    }
  ],
  "What knowledge or practices did Marley leave behind for the team?": [
    {
      text: "Marley established several valuable practices that continue to benefit our team:",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Documentation & Knowledge Sharing:**\n• Created comprehensive technical documentation for all major systems\n• Established 'Tech Talk Tuesdays' - weekly knowledge sharing sessions\n• Built a searchable team wiki with troubleshooting guides\n• Recorded video walkthroughs of complex processes",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Code Quality & Standards:**\n• Implemented automated code review guidelines\n• Created reusable component libraries that save 20+ hours/week\n• Established testing protocols that increased coverage to 85%\n• Mentored junior developers on clean code principles",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Process Improvements:**\n• Streamlined our deployment process, reducing release time by 40%\n• Created incident response playbooks\n• Established regular retrospectives and improvement cycles\n• Built monitoring dashboards that proactively catch issues",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "**Team Culture:**\n• Fostered a culture of psychological safety and open communication\n• Established peer programming sessions\n• Created onboarding buddy system for new hires\n• Advocated for work-life balance and sustainable development practices",
      isUser: false,
      timestamp: new Date()
    },
    {
      text: "These practices have become integral to how we operate and will continue to benefit future team members.",
      isUser: false,
      timestamp: new Date()
    }
  ]
};

export default function FullScreenChat({ isOpen, onClose, selectedEmployee }) {
  const [activeAgent, setActiveAgent] = useState('manager');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Initialize messages when opening
  useEffect(() => {
    if (isOpen) {
      setMessages([{
        text: "Hello! I'm the Manager Agent. How can I help you with organizational insights today?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  // Update agent context when switching
  useEffect(() => {
    if (isOpen && activeAgent) {
      const currentAgent = agents.find(agent => agent.id === activeAgent);
      if (currentAgent && messages.length > 0) {
        // Update the first message when switching agents
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[0] && !newMessages[0].isUser) {
            newMessages[0] = {
              text: `Hello! I'm the ${currentAgent.name}. How can I help you today?`,
              isUser: false,
              timestamp: new Date()
            };
          }
          return newMessages;
        });
      }
    }
  }, [activeAgent, isOpen]);

  if (!isOpen) return null;

  const currentAgent = agents.find(agent => agent.id === activeAgent);
  const primaryAgents = agents.filter(agent => agent.category === 'primary');
  const secondaryAgents = agents.filter(agent => agent.category === 'secondary');

  const handlePromptClick = (prompt) => {
    // Add the user's prompt
    setMessages(prev => [...prev, {
      text: prompt,
      isUser: true,
      timestamp: new Date()
    }]);

    // Get detailed response for this prompt
    const responseMessages = detailedResponses[prompt] || [{
      text: `As the ${currentAgent.name}, I understand your question about "${prompt}". Let me provide you with comprehensive insights based on our organizational data${selectedEmployee ? ` regarding ${selectedEmployee.name}` : ''}.`,
      isUser: false,
      timestamp: new Date()
    }];

    // Add responses with realistic delays
    responseMessages.forEach((response, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          ...response,
          timestamp: new Date()
        }]);
      }, (index + 1) * 1500); // Stagger responses by 1.5 seconds each
    });
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
      setMessages(prev => [...prev, {
        text: `As the ${currentAgent.name}, I understand your question about "${userInput}". Let me provide you with comprehensive insights based on our organizational data.`,
        isUser: false,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <FullScreenContainer>
      <Sidebar>
        <SidebarHeader>
          <BackButton onClick={onClose}>
            <FullscreenExitIcon fontSize="small" />
            Collapse chat
          </BackButton>
        </SidebarHeader>

        <AgentsList>
          <AgentSection>
            <SectionTitle>Primary Agents</SectionTitle>
            {primaryAgents.map(agent => (
              <AgentItem 
                key={agent.id} 
                active={activeAgent === agent.id}
                onClick={() => setActiveAgent(agent.id)}
              >
                <AgentIcon color={agent.color}>
                  {agent.icon}
                </AgentIcon>
                <AgentInfo>
                  <AgentName>{agent.name}</AgentName>
                  <AgentDescription>{agent.description}</AgentDescription>
                </AgentInfo>
              </AgentItem>
            ))}
          </AgentSection>

          <AgentSection>
            <SectionTitle>Specialized Agents</SectionTitle>
            {secondaryAgents.map(agent => (
              <AgentItem 
                key={agent.id} 
                active={activeAgent === agent.id}
                onClick={() => setActiveAgent(agent.id)}
              >
                <AgentIcon color={agent.color}>
                  {agent.icon}
                </AgentIcon>
                <AgentInfo>
                  <AgentName>{agent.name}</AgentName>
                  <AgentDescription>{agent.description}</AgentDescription>
                </AgentInfo>
              </AgentItem>
            ))}
          </AgentSection>
        </AgentsList>
      </Sidebar>

      <ChatArea>
        <ChatHeader>
          <ChatHeaderIcon>
            {currentAgent?.icon || <AutoAwesomeIcon />}
          </ChatHeaderIcon>
          <ChatHeaderInfo>
            <ChatTitle>{currentAgent?.name || 'Manager Agent'}</ChatTitle>
            <ChatSubtitle>
              {selectedEmployee ? `Discussing ${selectedEmployee.name}` : 'Organizational insights and management support'}
            </ChatSubtitle>
          </ChatHeaderInfo>
        </ChatHeader>

        <MessagesArea>
          {messages.length <= 1 && (
            <div style={{ marginBottom: '24px' }}>
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
                {message.isUser ? 'U' : <AutoAwesomeIcon fontSize="small" />}
              </MessageAvatar>
              <MessageContent>
                {message.text}
              </MessageContent>
            </Message>
          ))}
        </MessagesArea>

        <InputArea>
          <form onSubmit={handleSendMessage}>
            <InputContainer>
              <InputButton type="button">
                <AttachFileIcon fontSize="small" />
              </InputButton>
              <InputField
                placeholder={`Ask ${currentAgent?.name || 'Manager Agent'} anything...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <InputButton type="submit" primary>
                <SendIcon fontSize="small" />
              </InputButton>
            </InputContainer>
          </form>
        </InputArea>
      </ChatArea>
    </FullScreenContainer>
  );
} 