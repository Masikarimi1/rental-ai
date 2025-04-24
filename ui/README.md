# Gebral: Agentic AI for Real Estate Intelligence

<div align="center">
  <img src="ui/public/assets/images/gebral-logo.png" alt="Gebral Logo" width="200" />
  <p><i>Intelligent real estate insights for Dubai's property market</i></p>
</div>

## 🏆 Dubai AI Week Hackathon Project

This project was created for the Dubai AI Week Hackathon: Agentic AI Challenge. Gebral uses a multi-agent system to deliver real-time market intelligence and actionable recommendations for key stakeholders in Dubai's real estate market.

## 📋 Overview

Gebral is an intelligent platform designed for three key stakeholders in Dubai's real estate market:

- **Robert (Portfolio Investor)**: Identifies acquisition opportunities across markets
- **Amina (Property Manager)**: Optimizes rent pricing and reduces vacancies
- **Faisal (Developer CFO)**: Provides scenario analysis and investment forecasting

The system uses multiple specialized AI agents that continuously analyze market data to deliver targeted recommendations.

## 🤖 Core AI Agents

The platform consists of several specialized agents:

1. **News Intelligence Agent**: Analyzes real estate news (metro expansion, new developments) and summarizes impact on rental markets
2. **Trends Spotter Agent**: Detects rent price changes across zones and identifies emerging hot/cold areas
3. **Construction Project Analyzer**: Monitors active/upcoming construction to predict neighborhood supply impact
4. **ROI Forecaster Agent**: Calculates top listings by ROI using current rent and estimated value with sensitivity analysis
5. **Price Advisor Agent**: Suggests optimal pricing based on market conditions and vacancy risk
6. **Strategy Agent**: Conversational AI that explains recommendations and provides strategic advice

## 🌟 Key Features

- **Real-time Market Monitoring**: Automatic data pipeline that checks and updates information every 5 minutes
- **Role-Based Dashboards**: Customized views for investors, property managers, and developers
- **Intelligent Alerts**: Proactive notifications based on market changes and opportunities
- **Actionable Recommendations**: Specific, data-driven suggestions rather than just market data
- **Interactive Chat**: Strategy Agent explains reasoning behind suggestions when questioned
- **Continuous Learning**: System improves recommendation accuracy based on outcomes and feedback

## 🎯 Differentiation

- Provides specific, actionable recommendations rather than just market data
- Explains reasoning behind suggestions when questioned
- Continuously monitors market to detect early warning signs before revenue drops
- Focuses on practical decision support for everyday real estate challenges
- Transforms raw market data into actionable intelligence

## 💻 Technical Implementation

### Architecture

The system follows a modern frontend architecture with these key components:

- **React Frontend**: Modern UI with responsive design and glassmorphism effects
- **Agent System**: Multiple specialized AI agents for different aspects of real estate analysis
- **Data Pipeline**: Automatic polling system that updates market data every 5 minutes
- **Role-Based Access**: Personalized experience based on user role (investor, manager, developer)

### Directory Structure

```
/gebral-Estate
├── ui/              # React UI
│   ├── public/      # Static assets
│   └── src/         # Source code
│       ├── components/  # UI components
│       ├── context/     # React context providers
│       ├── hooks/       # Custom React hooks
│       ├── pages/       # Page components
│       ├── styles/      # CSS styles
│       ├── utils/       # Utility functions
│       └── config/      # Configuration files
├── api/              # API services
├── data/             # Data storage
│   ├── raw/          # Raw input data
│   └── processed/    # Processed data
├── models/           # AI models
├── agents/           # LLM prompts and configurations
└── docs/             # Documentation
```

### Frontend Design Features

- **Glassmorphism UI**: Modern, sleek interface with frosted glass effect
- **Dynamic Data Visualization**: Real-time charts and metrics
- **Responsive Dashboards**: Optimized for desktop and mobile
- **Dark Mode**: Eye-friendly interface for professional use
- **Role-Based Views**: Custom interfaces for each user persona

## 🚀 Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gebral-estate.git
   cd gebral-estate
   ```

2. **Install dependencies**
   ```bash
   # Install UI dependencies
   cd ui
   npm install
   
   # Install API dependencies
   cd ../api
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start the UI server
   cd ui
   npm run dev
   
   # Start the API server (in another terminal)
   cd api
   npm run dev
   ```

4. **Open the application**
   Navigate to `http://localhost:5173` in your browser

## 📊 Demo Data

For the hackathon, the application uses simulated data that realistically represents Dubai's real estate market. In a production environment, it would connect to:

- Dubai Land Department (DLD) data
- Property listing websites (Property Finder, Bayut, Dubizzle)
- News sources (Gulf News, Khaleej Times, Zawya)
- Construction project databases

## 🔮 Future Roadmap

1. **Enhanced AI Models**: Implement more sophisticated prediction models
2. **Mobile Application**: Native mobile apps for iOS and Android
3. **Integration APIs**: Connect with property management systems
4. **Advanced Scenario Simulator**: More robust "what-if" analysis tools
5. **Expanded Market Coverage**: Add additional regional markets

## 👥 Team

| Name | Role | Responsibilities |
|------|------|------------------|
| 🎓 **Masi Karimi** | AI Specialist · Team Lead · QA Strategist · Pitch Designer | Project coordination · Prompt QA · AI logic tuning · Pitch design |
| 🧑‍💻 **Ehsan Rahimi** | Frontend Developer · Agent Architect · Product Strategist | UI/UX · API integration · Agent-user alignment |
| 🧠 **Rinisha Mohammed** | Data Scientist · RAG Dev · LLM Integrator | Vector DB setup · Prompt tuning · Slide content |
| 🏗️ **Thomas Sebastian** | Solution Architect · Backend Engineer | API dev · Backend logic · Deployment |
| 🧩 **Santhosh Mannilputhamadam** | Enterprise Architect · Strategy Lead | Technical roadmap · Q&A support · Scalability planning |
| 🎤 **Yag Nessh** | Business Strategist · Lead Presenter | Fundraising pitch · Business modeling · Final demo lead |

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built for Dubai AI Week Hackathon 2025 in collaboration with HackMasters</p>
</div>

----------------------------------------------
----------------------------------------------
----------------------------------------------

## Core UI Structure

Modern React frontend with Vite for fast development
Component-based architecture for maintainability and reusability
Context-based state management for application-wide data
Responsive design with mobile-first approach
Advanced UI with glassmorphism effects for a premium feel

## Key Features Implemented

1. Persona-Based Dashboards: Custom interfaces for investors, property managers, and developers

2. Agent Components:

News Intelligence Agent for market news analysis
Trend Spotter Agent for rental price change detection
ROI Forecaster Agent for investment opportunity identification
Construction Project Analyzer for development impact assessment
Price Advisor Agent for rental pricing optimization
Strategy Agent Chat for conversational AI assistance


3. Real-time Data Pipeline:

Automatic polling system (every 5 minutes)
Data visualization of market trends
Live notification system for alerts


4. UI/UX Highlights:

Modern glassmorphism design with frosted glass effects
Responsive layouts for all device sizes
Animated transitions for smooth user experience
Role-based navigation and content filtering



