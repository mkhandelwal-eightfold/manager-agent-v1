import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChatPanel from './ChatPanel';
import FullScreenChat from './FullScreenChat';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #F8F9FA;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #F8F9FA;
`;

const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #E5E7EB;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  &:hover {
    background: #F3F4F6;
  }
`;

const Controls = styled.div`
  background: #fff;
  border-bottom: 1px solid #E5E7EB;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 280px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 40px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Toggle = styled.div`
  width: 44px;
  height: 24px;
  background: ${props => props.active ? '#3B82F6' : '#D1D5DB'};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const ToggleThumb = styled.div`
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${props => props.active ? '22px' : '2px'};
  transition: left 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  &:hover {
    background: #F9FAFB;
  }
`;

const ChartContainer = styled.div`
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Row = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  position: relative;
`;

const EmployeeCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 280px;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EmployeeName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const EmployeeRole = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const SectionLabel = styled.div`
  background: #F3F4F6;
  color: #6B7280;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin: 20px 0;
`;

const ConnectingLine = styled.div`
  position: absolute;
  background: ${props => props.dashed ? 'transparent' : '#E5E7EB'};
  ${props => props.dashed && `
    border-top: 2px dashed #D1D5DB;
    height: 0;
  `}
  ${props => !props.dashed && `
    height: 2px;
  `}
`;

const VerticalLine = styled.div`
  width: 2px;
  background: ${props => props.dashed ? 'transparent' : '#E5E7EB'};
  ${props => props.dashed && `
    border-left: 2px dashed #D1D5DB;
    width: 0;
  `}
  position: absolute;
`;

const ManagerAgentCTA = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const employees = [
  { id: 1, name: 'Omar Calzoni', role: 'Senior UX Designer', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', isPast: false },
  { id: 2, name: 'Allison Madisen', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b590?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b590?w=100&h=100&fit=crop&crop=face', isPast: false },
  { id: 3, name: 'Marley Bergson', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', isPast: true },
  { id: 4, name: 'James Dokidis', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', isPast: true },
  { id: 5, name: 'Jaiden Toriff', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', isPast: true },
  { id: 6, name: 'Alfredo Jameson', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face', isPast: true },
  { id: 7, name: 'Payton Passe', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop&crop=face', isPast: true },
  { id: 8, name: 'Miracle Watkins', role: 'UX Designer', photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face', isPast: true },
];

function App() {
  const [showPastEmployees, setShowPastEmployees] = useState(true);
  const [chatPanelOpen, setChatPanelOpen] = useState(false);
  const [selectedChatEmployee, setSelectedChatEmployee] = useState(null);
  const [fullScreenChatOpen, setFullScreenChatOpen] = useState(false);

  const currentEmployees = employees.filter(emp => !emp.isPast);
  const pastEmployees = employees.filter(emp => emp.isPast);

  const handleManagerAgentClick = () => {
    // Default to Marley Bergson for the Manager Agent
    const marley = employees.find(emp => emp.name === 'Marley Bergson');
    setSelectedChatEmployee(marley);
    setChatPanelOpen(true);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedChatEmployee(employee);
    setChatPanelOpen(true);
  };

  const handleCloseChatPanel = () => {
    setChatPanelOpen(false);
    setSelectedChatEmployee(null);
  };

  const handleOpenFullScreenChat = () => {
    setChatPanelOpen(false);
    setFullScreenChatOpen(true);
  };

  const handleCloseFullScreenChat = () => {
    setFullScreenChatOpen(false);
    // Keep selectedChatEmployee so user can return to panel
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>Organization chart</Title>
          <HeaderActions>
            <IconButton>
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <CloseIcon fontSize="small" />
            </IconButton>
          </HeaderActions>
        </Header>

        <Controls>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <SearchInput placeholder="Search people" />
          </SearchContainer>

          <RightControls>
            <ToggleContainer>
              <Toggle active={showPastEmployees} onClick={() => setShowPastEmployees(!showPastEmployees)}>
                <ToggleThumb active={showPastEmployees} />
              </Toggle>
              <ToggleLabel>Show past employees</ToggleLabel>
            </ToggleContainer>

            <Dropdown>
              Last 12 months
              <KeyboardArrowDownIcon fontSize="small" />
            </Dropdown>
          </RightControls>
        </Controls>

        <ChartContainer>
          <Row>
            {currentEmployees.map((employee) => (
              <EmployeeCard key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                <Avatar src={employee.avatar} alt={employee.name} />
                <EmployeeInfo>
                  <EmployeeName>{employee.name}</EmployeeName>
                  <EmployeeRole>{employee.role}</EmployeeRole>
                </EmployeeInfo>
              </EmployeeCard>
            ))}
          </Row>

          {showPastEmployees && pastEmployees.length > 0 && (
            <>
              <SectionLabel>Past employees</SectionLabel>
              
              <Row>
                {pastEmployees.slice(0, 2).map((employee) => (
                  <EmployeeCard key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                    <Avatar src={employee.avatar} alt={employee.name} />
                    <EmployeeInfo>
                      <EmployeeName>{employee.name}</EmployeeName>
                      <EmployeeRole>{employee.role}</EmployeeRole>
                    </EmployeeInfo>
                  </EmployeeCard>
                ))}
              </Row>

              <Row>
                {pastEmployees.slice(2, 4).map((employee) => (
                  <EmployeeCard key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                    <Avatar src={employee.avatar} alt={employee.name} />
                    <EmployeeInfo>
                      <EmployeeName>{employee.name}</EmployeeName>
                      <EmployeeRole>{employee.role}</EmployeeRole>
                    </EmployeeInfo>
                  </EmployeeCard>
                ))}
              </Row>

              <Row>
                {pastEmployees.slice(4, 6).map((employee) => (
                  <EmployeeCard key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                    <Avatar src={employee.avatar} alt={employee.name} />
                    <EmployeeInfo>
                      <EmployeeName>{employee.name}</EmployeeName>
                      <EmployeeRole>{employee.role}</EmployeeRole>
                    </EmployeeInfo>
                  </EmployeeCard>
                ))}
              </Row>
            </>
          )}
        </ChartContainer>

        <ManagerAgentCTA onClick={handleManagerAgentClick}>
          <AutoAwesomeIcon />
          Ask Manager Agent
        </ManagerAgentCTA>

        <ChatPanel 
          isOpen={chatPanelOpen}
          onClose={handleCloseChatPanel}
          selectedEmployee={selectedChatEmployee}
          onExpandChat={handleOpenFullScreenChat}
        />

        <FullScreenChat
          isOpen={fullScreenChatOpen}
          onClose={handleCloseFullScreenChat}
          selectedEmployee={selectedChatEmployee}
        />
      </Container>
    </>
  );
}

export default App;
