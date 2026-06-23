/**
 * Multi-Agent Skill Framework
 * Define agent capabilities for AI automation consulting
 */

export interface AgentSkill {
    id: string;
    name: string;
    description: string;
    category: string;
    capabilities: string[];
    outputType: string;
    requiredInputs: string[];
    estimatedDuration: string;
    complexity: 'basic' | 'intermediate' | 'advanced';
    icon?: string;
    examples?: string[];
}

export interface AgentWorkflow {
    id: string;
    name: string;
    description: string;
    agents: string[];
    sequence: AgentStep[];
    expectedOutcome: string;
    targetAudience: string;
}

export interface AgentStep {
    agentId: string;
    skillId: string;
    inputs?: Record<string, unknown>;
    dependsOn?: string[];
}

/**
 * Strategic Planning Agent
 * Analyzes business goals and creates AI automation roadmaps
 */
export const strategicPlanningSkills: AgentSkill[] = [
    {
        id: 'gap-analysis',
        name: 'AI Readiness Gap Analysis',
        description: 'Comprehensive assessment of current AI implementation gaps and opportunities',
        category: 'Strategic Planning',
        capabilities: [
            'Process audit',
            'Technology stack evaluation',
            'Capability mapping',
            'ROI projection',
        ],
        outputType: 'assessment-report',
        requiredInputs: ['company-overview', 'current-processes', 'business-goals'],
        estimatedDuration: '2-3 weeks',
        complexity: 'advanced',
        examples: [
            'Enterprise software audit',
            'Workflow efficiency analysis',
            'Technology debt assessment',
        ],
    },
    {
        id: 'roadmap-generation',
        name: 'AI Automation Roadmap',
        description: 'Create phased AI integration roadmap with milestones and KPIs',
        category: 'Strategic Planning',
        capabilities: [
            'Phase planning',
            'Risk assessment',
            'Resource allocation',
            'Timeline projection',
            'Budget estimation',
        ],
        outputType: 'roadmap-document',
        requiredInputs: ['gap-analysis', 'available-budget', 'team-size'],
        estimatedDuration: '3-4 weeks',
        complexity: 'advanced',
        examples: [
            '6-month automation roadmap',
            '12-month digital transformation',
            'Phased AI deployment plan',
        ],
    },
    {
        id: 'business-case',
        name: 'AI ROI Business Case',
        description: 'Build financial justification for AI automation initiatives',
        category: 'Strategic Planning',
        capabilities: [
            'Cost-benefit analysis',
            'Revenue impact modeling',
            'Payback period calculation',
            'Risk quantification',
        ],
        outputType: 'business-case-pdf',
        requiredInputs: ['implementation-plan', 'cost-estimates', 'efficiency-gains'],
        estimatedDuration: '2 weeks',
        complexity: 'intermediate',
    },
];

/**
 * Market Research Agent
 * Analyzes market trends, competitors, and customer insights
 */
export const marketResearchSkills: AgentSkill[] = [
    {
        id: 'competitor-analysis',
        name: 'AI Competitor Intelligence',
        description: 'Analyze competitor AI implementations and market positioning',
        category: 'Market Research',
        capabilities: [
            'Technology tracking',
            'Feature benchmarking',
            'Market share analysis',
            'Competitive advantage mapping',
        ],
        outputType: 'competitor-report',
        requiredInputs: ['industry', 'target-market', 'competitors-list'],
        estimatedDuration: '1-2 weeks',
        complexity: 'intermediate',
    },
    {
        id: 'market-trends',
        name: 'AI Trend Analysis',
        description: 'Identify emerging AI technologies relevant to your industry',
        category: 'Market Research',
        capabilities: [
            'Trend forecasting',
            'Technology adoption patterns',
            'Industry vertical analysis',
            'Opportunity identification',
        ],
        outputType: 'trend-report',
        requiredInputs: ['industry-vertical', 'target-regions'],
        estimatedDuration: '2-3 weeks',
        complexity: 'advanced',
    },
];

/**
 * AI Automation Analyst
 * Identifies specific automation opportunities and technical solutions
 */
export const automationAnalystSkills: AgentSkill[] = [
    {
        id: 'process-mining',
        name: 'Process Mining & Automation Opportunities',
        description: 'Discover high-impact automation candidates using process intelligence',
        category: 'AI Automation',
        capabilities: [
            'Process discovery',
            'Bottleneck identification',
            'Automation scoring',
            'Impact estimation',
        ],
        outputType: 'automation-opportunities',
        requiredInputs: ['process-logs', 'business-data', 'performance-metrics'],
        estimatedDuration: '2-3 weeks',
        complexity: 'advanced',
    },
    {
        id: 'ai-solution-design',
        name: 'AI Solution Architecture',
        description: 'Design custom AI solutions for identified automation opportunities',
        category: 'AI Automation',
        capabilities: [
            'Model selection',
            'Data architecture design',
            'Integration planning',
            'Scalability assessment',
        ],
        outputType: 'technical-specification',
        requiredInputs: ['automation-scope', 'data-availability', 'performance-requirements'],
        estimatedDuration: '3-4 weeks',
        complexity: 'advanced',
    },
];

/**
 * Content Strategy Agent
 * Develops content for thought leadership and customer education
 */
export const contentStrategySkills: AgentSkill[] = [
    {
        id: 'thought-leadership',
        name: 'AI Thought Leadership Content',
        description: 'Generate industry-leading content demonstrating AI expertise',
        category: 'Content Strategy',
        capabilities: [
            'Blog post generation',
            'Whitepaper writing',
            'Case study development',
            'Research publishing',
        ],
        outputType: 'content-package',
        requiredInputs: ['expertise-area', 'target-audience', 'key-messages'],
        estimatedDuration: '2-4 weeks',
        complexity: 'intermediate',
    },
    {
        id: 'customer-education',
        name: 'Customer Education Program',
        description: 'Build training materials and educational resources',
        category: 'Content Strategy',
        capabilities: [
            'Course development',
            'Video script writing',
            'Interactive tutorials',
            'Knowledge base creation',
        ],
        outputType: 'education-program',
        requiredInputs: ['learning-objectives', 'target-skill-level', 'delivery-format'],
        estimatedDuration: '4-6 weeks',
        complexity: 'intermediate',
    },
];

/**
 * SEO/GEO/AEO Optimization Agent
 * Optimizes visibility across search, maps, and AI-powered discovery
 */
export const searchOptimizationSkills: AgentSkill[] = [
    {
        id: 'seo-audit',
        name: 'Enterprise SEO Audit',
        description: 'Comprehensive SEO analysis for Portland-based AI consulting',
        category: 'Search Optimization',
        capabilities: [
            'Technical SEO audit',
            'Content optimization',
            'Backlink analysis',
            'Local SEO assessment',
        ],
        outputType: 'seo-report',
        requiredInputs: ['website-url', 'target-keywords'],
        estimatedDuration: '1-2 weeks',
        complexity: 'intermediate',
    },
    {
        id: 'geo-optimization',
        name: 'GEO Optimization - Portland Focus',
        description: 'Optimize local presence for Portland market with AI automation angle',
        category: 'Search Optimization',
        capabilities: [
            'Local listing optimization',
            'Map ranking improvement',
            'Review management',
            'Local content strategy',
        ],
        outputType: 'geo-strategy',
        requiredInputs: ['business-address', 'service-areas', 'local-competitors'],
        estimatedDuration: '2-3 weeks',
        complexity: 'intermediate',
    },
    {
        id: 'aeo-strategy',
        name: 'AEO Strategy - AI Discovery',
        description: 'Optimize for AI-powered search engines and LLM discovery',
        category: 'Search Optimization',
        capabilities: [
            'AI search optimization',
            'LLM-friendly content',
            'Knowledge graph optimization',
            'Entity optimization',
        ],
        outputType: 'aeo-strategy',
        requiredInputs: ['target-topics', 'content-inventory'],
        estimatedDuration: '3-4 weeks',
        complexity: 'advanced',
    },
];

/**
 * Lead Generation Agent
 * Identifies and qualifies potential clients
 */
export const leadGenerationSkills: AgentSkill[] = [
    {
        id: 'lead-research',
        name: 'AI-Qualified Lead Research',
        description: 'AI-powered research to identify high-value prospects',
        category: 'Lead Generation',
        capabilities: [
            'Company profiling',
            'Decision-maker identification',
            'Budget estimation',
            'Pain point analysis',
        ],
        outputType: 'lead-list',
        requiredInputs: ['industry', 'company-size', 'location', 'revenue-range'],
        estimatedDuration: '1-2 weeks',
        complexity: 'intermediate',
    },
    {
        id: 'outreach-campaign',
        name: 'Personalized Outreach Campaign',
        description: 'Generate personalized outreach for qualified leads',
        category: 'Lead Generation',
        capabilities: [
            'Email personalization',
            'Message optimization',
            'A/B testing strategies',
            'Follow-up automation',
        ],
        outputType: 'campaign-plan',
        requiredInputs: ['lead-list', 'value-proposition', 'call-to-action'],
        estimatedDuration: '1-2 weeks',
        complexity: 'intermediate',
    },
];

/**
 * Customer Engagement Agent
 * Builds relationships and drives adoption
 */
export const customerEngagementSkills: AgentSkill[] = [
    {
        id: 'engagement-strategy',
        name: 'Customer Engagement Strategy',
        description: 'Develop multi-channel engagement programs for customers',
        category: 'Customer Engagement',
        capabilities: [
            'Touchpoint mapping',
            'Channel strategy',
            'Messaging optimization',
            'Retention planning',
        ],
        outputType: 'engagement-plan',
        requiredInputs: ['customer-segments', 'engagement-goals'],
        estimatedDuration: '2-3 weeks',
        complexity: 'intermediate',
    },
];

/**
 * Aggregate all agent skills
 */
export const allAgentSkills: Record<string, AgentSkill[]> = {
    'strategic-planning': strategicPlanningSkills,
    'market-research': marketResearchSkills,
    'ai-automation': automationAnalystSkills,
    'content-strategy': contentStrategySkills,
    'search-optimization': searchOptimizationSkills,
    'lead-generation': leadGenerationSkills,
    'customer-engagement': customerEngagementSkills,
};

/**
 * Example workflows combining multiple agents
 */
export const exampleWorkflows: AgentWorkflow[] = [
    {
        id: 'enterprise-transformation',
        name: 'Enterprise AI Transformation',
        description: 'Complete AI automation transformation program',
        agents: [
            'strategic-planning',
            'market-research',
            'ai-automation',
            'content-strategy',
        ],
        sequence: [
            {
                agentId: 'strategic-planning',
                skillId: 'gap-analysis',
            },
            {
                agentId: 'ai-automation',
                skillId: 'process-mining',
                dependsOn: ['gap-analysis'],
            },
            {
                agentId: 'strategic-planning',
                skillId: 'roadmap-generation',
                dependsOn: ['gap-analysis', 'process-mining'],
            },
            {
                agentId: 'content-strategy',
                skillId: 'thought-leadership',
                dependsOn: ['gap-analysis'],
            },
        ],
        expectedOutcome: 'Comprehensive AI transformation roadmap with thought leadership assets',
        targetAudience: 'Enterprise executives, CIO, CFO',
    },
    {
        id: 'market-expansion',
        name: 'Market Expansion with AI',
        description: 'AI-powered market research and lead generation',
        agents: ['market-research', 'lead-generation', 'search-optimization'],
        sequence: [
            {
                agentId: 'market-research',
                skillId: 'market-trends',
            },
            {
                agentId: 'search-optimization',
                skillId: 'aeo-strategy',
                dependsOn: ['market-trends'],
            },
            {
                agentId: 'lead-generation',
                skillId: 'lead-research',
                dependsOn: ['market-trends'],
            },
        ],
        expectedOutcome: 'Qualified lead pipeline with SEO/GEO/AEO optimization',
        targetAudience: 'Growth teams, Marketing directors',
    },
];
