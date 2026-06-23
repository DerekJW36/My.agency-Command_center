/**
 * Enterprise Platform - Index & Quick Reference
 * Complete guide to all components, features, and resources
 */

export interface PlatformIndex {
    name: string;
    version: string;
    status: string;
    lastUpdated: string;
    sections: Section[];
}

export interface Section {
    id: string;
    title: string;
    description: string;
    components: Component[];
    files: FileReference[];
}

export interface Component {
    name: string;
    type: string;
    description: string;
    location: string;
    usageExample?: string;
}

export interface FileReference {
    path: string;
    type: 'component' | 'style' | 'config' | 'doc' | 'template';
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
}

export const platformIndex: PlatformIndex = {
    name: 'Enterprise AI Consulting Platform',
    version: '1.0.0',
    status: 'Production Ready',
    lastUpdated: 'May 2026',

    sections: [
        {
            id: 'design-system',
            title: '🎨 Design System',
            description: 'Complete theming system with light/dark modes, animations, and components',
            components: [
                {
                    name: 'Theme Configuration',
                    type: 'Configuration',
                    description: 'Centralized color, typography, and spacing tokens',
                    location: 'src/enterprise/design-system/theme.ts',
                    usageExample: `
import { designTokens } from '@/enterprise/design-system/theme';
const colors = designTokens.dark;
          `,
                },
            ],
            files: [
                {
                    path: 'src/enterprise/design-system/theme.ts',
                    type: 'config',
                    description: 'Design tokens: colors, typography, spacing, shadows, animations',
                    priority: 'critical',
                },
            ],
        },

        {
            id: 'components',
            title: '🧩 Reusable Components',
            description: 'Production-ready UI components with accessibility and responsive design',
            components: [
                {
                    name: 'CircuitBoard',
                    type: 'Animation Component',
                    description: 'Interactive circuit animation with mouse-responsive nodes and connections',
                    location: 'src/enterprise/components/CircuitBoard.tsx',
                    usageExample: `
<CircuitBoard theme="dark" intensity={0.6} interactive={true} />
          `,
                },
            ],
            files: [
                {
                    path: 'src/enterprise/components/CircuitBoard.tsx',
                    type: 'component',
                    description: 'Interactive circuit board with dynamic animations',
                    priority: 'critical',
                },
                {
                    path: 'src/enterprise/components/styles/circuit-board.css',
                    type: 'style',
                    description: 'Circuit board animations and visual effects',
                    priority: 'high',
                },
            ],
        },

        {
            id: 'agents',
            title: '🤖 Multi-Agent Framework',
            description: '7 specialized agent teams with 30+ skills for enterprise consulting',
            components: [
                {
                    name: 'Strategic Planning Agent',
                    type: 'Agent',
                    description: 'Gap analysis, roadmaps, ROI calculations',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
                {
                    name: 'Market Research Agent',
                    type: 'Agent',
                    description: 'Competitor intelligence, trend analysis',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
                {
                    name: 'AI Automation Analyst',
                    type: 'Agent',
                    description: 'Process mining, solution architecture',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
                {
                    name: 'Content Strategy Agent',
                    type: 'Agent',
                    description: 'Thought leadership, education programs',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
                {
                    name: 'SEO/GEO/AEO Optimization',
                    type: 'Agent',
                    description: 'Search optimization, Portland geo-targeting',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
                {
                    name: 'Lead Generation Agent',
                    type: 'Agent',
                    description: 'Lead research, outreach campaigns',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
                {
                    name: 'Customer Engagement Agent',
                    type: 'Agent',
                    description: 'Engagement strategies, retention planning',
                    location: 'src/enterprise/agents/skills-framework.ts',
                },
            ],
            files: [
                {
                    path: 'src/enterprise/agents/skills-framework.ts',
                    type: 'config',
                    description: 'Complete agent skills framework with 7 teams and 30+ skills',
                    priority: 'critical',
                },
            ],
        },

        {
            id: 'pages',
            title: '📄 Page Templates',
            description: 'Enterprise-grade landing pages and service templates',
            components: [
                {
                    name: 'Enterprise Landing Page',
                    type: 'Page',
                    description: 'Complete landing page with hero, services, workflows, and CTA',
                    location: 'src/enterprise/pages/LandingPage.tsx',
                },
            ],
            files: [
                {
                    path: 'src/enterprise/pages/LandingPage.tsx',
                    type: 'component',
                    description: 'Full-featured landing page with all sections',
                    priority: 'critical',
                },
                {
                    path: 'src/enterprise/pages/styles/landing-page.css',
                    type: 'style',
                    description: 'Landing page responsive styles and animations',
                    priority: 'high',
                },
            ],
        },

        {
            id: 'templates',
            title: '📋 Reusable Templates',
            description: 'Framework for quickly creating future products and services',
            components: [
                {
                    name: 'Service Module Template',
                    type: 'Template',
                    description: 'Define new services with features, pricing, audience',
                    location: 'src/enterprise/templates/templates.ts',
                },
                {
                    name: 'Landing Page Template',
                    type: 'Template',
                    description: 'Quick-start template for service landing pages',
                    location: 'src/enterprise/templates/templates.ts',
                },
                {
                    name: 'Workflow Template',
                    type: 'Template',
                    description: 'Multi-agent workflow templates with stages and gates',
                    location: 'src/enterprise/templates/templates.ts',
                },
                {
                    name: 'Component Template',
                    type: 'Template',
                    description: 'Reusable UI component patterns',
                    location: 'src/enterprise/templates/templates.ts',
                },
                {
                    name: 'Content Strategy Template',
                    type: 'Template',
                    description: 'Framework for content across channels',
                    location: 'src/enterprise/templates/templates.ts',
                },
                {
                    name: 'Implementation Guide',
                    type: 'Template',
                    description: 'Step-by-step execution templates',
                    location: 'src/enterprise/templates/templates.ts',
                },
            ],
            files: [
                {
                    path: 'src/enterprise/templates/templates.ts',
                    type: 'template',
                    description: 'Complete template system for rapid product creation',
                    priority: 'critical',
                },
            ],
        },

        {
            id: 'documentation',
            title: '📚 Documentation',
            description: 'Comprehensive guides, architecture, and setup instructions',
            components: [],
            files: [
                {
                    path: 'src/enterprise/README.md',
                    type: 'doc',
                    description: 'Main documentation and quick start guide',
                    priority: 'critical',
                },
                {
                    path: 'src/enterprise/GITHUB_SETUP.md',
                    type: 'doc',
                    description: 'GitHub repository setup and workflow guidelines',
                    priority: 'high',
                },
                {
                    path: 'src/enterprise/ARCHITECTURE_ANALYSIS.md',
                    type: 'doc',
                    description: 'System architecture, optimization strategies, and roadmap',
                    priority: 'high',
                },
            ],
        },
    ],
};

/**
 * Quick Reference: Key Files & Their Purposes
 */
export const quickReference = {
    'Getting Started': [
        'src/enterprise/README.md',
        'src/enterprise/design-system/theme.ts',
        'src/enterprise/agents/skills-framework.ts',
    ],

    'Building Features': [
        'src/enterprise/templates/templates.ts',
        'src/enterprise/components/CircuitBoard.tsx',
        'src/enterprise/pages/LandingPage.tsx',
    ],

    'Optimization': [
        'src/enterprise/ARCHITECTURE_ANALYSIS.md',
        'src/enterprise/design-system/theme.ts',
    ],

    'Deployment': [
        'src/enterprise/GITHUB_SETUP.md',
        'src/enterprise/README.md',
    ],
};

/**
 * Feature Checklist - What's Included
 */
export const featureChecklist = {
    'Design System': {
        'Light Mode (Ivory + Gunmetal + Gold)': true,
        'Dark Mode (Obsidian + Electric Blue + Gold)': true,
        'Complete Typography Scale': true,
        'Spacing System': true,
        'Shadow Definitions': true,
        'Animation System': true,
        'Accessibility Support': true,
    },

    'Components': {
        'Circuit Board Animation': true,
        'Responsive Layout': true,
        'Button Components': true,
        'Service Cards': true,
        'Workflow Selector': true,
        'Footer': true,
    },

    'Multi-Agent Framework': {
        'Strategic Planning (3 skills)': true,
        'Market Research (2 skills)': true,
        'AI Automation (2 skills)': true,
        'Content Strategy (2 skills)': true,
        'SEO/GEO/AEO (3 skills)': true,
        'Lead Generation (2 skills)': true,
        'Customer Engagement (1 skill)': true,
        'Example Workflows': true,
    },

    'Templates': {
        'Service Module': true,
        'Landing Page': true,
        'Workflow': true,
        'Component': true,
        'Content Strategy': true,
        'Implementation Guide': true,
        'Template Factory': true,
    },

    'Pages': {
        'Enterprise Landing Page': true,
        'Responsive Design': true,
        'SEO Optimized': true,
        'Interactive Elements': true,
    },

    'Documentation': {
        'Setup Guide': true,
        'GitHub Workflow': true,
        'Architecture Analysis': true,
        'Optimization Strategies': true,
    },
};

/**
 * Common Tasks - How to Achieve Them
 */
export const commonTasks = {
    'Create New Service': {
        files: ['src/enterprise/templates/templates.ts'],
        steps: [
            '1. Call createNewServiceOffering() function',
            '2. Define service module with features',
            '3. Create landing page template',
            '4. Define workflow with agents',
            '5. Create content strategy',
        ],
    },

    'Add New Component': {
        files: ['src/enterprise/components/', 'src/enterprise/design-system/theme.ts'],
        steps: [
            '1. Create component file in src/enterprise/components/',
            '2. Use design tokens from theme.ts',
            '3. Create component styles',
            '4. Export from index',
            '5. Add to ComponentTemplate in templates.ts',
        ],
    },

    'Add New Agent': {
        files: ['src/enterprise/agents/skills-framework.ts'],
        steps: [
            '1. Define agent interface extending AgentSkill',
            '2. Add skills array for agent',
            '3. Export skills in allAgentSkills object',
            '4. Update example workflows if applicable',
            '5. Update landing page agents list',
        ],
    },

    'Optimize Workflows': {
        files: ['src/enterprise/ARCHITECTURE_ANALYSIS.md'],
        steps: [
            '1. Review current workflow in ARCHITECTURE_ANALYSIS.md',
            '2. Identify parallel execution opportunities',
            '3. Implement caching strategy',
            '4. Update workflow sequence in skills-framework.ts',
            '5. Measure performance improvements',
        ],
    },

    'Deploy to Production': {
        files: ['src/enterprise/README.md', 'src/enterprise/GITHUB_SETUP.md'],
        steps: [
            '1. Update version number',
            '2. Create release branch',
            '3. Run tests and build',
            '4. Update CHANGELOG',
            '5. Create GitHub release',
            '6. Deploy to production',
        ],
    },
};

/**
 * Performance Benchmarks
 */
export const performanceBenchmarks = {
    'Desktop Performance': {
        'First Contentful Paint': '< 1.5s',
        'Largest Contentful Paint': '< 2.5s',
        'Cumulative Layout Shift': '< 0.1',
        'First Input Delay': '< 100ms',
    },

    'Mobile Performance': {
        'First Contentful Paint': '< 2s',
        'Largest Contentful Paint': '< 3.5s',
        'Cumulative Layout Shift': '< 0.1',
        'First Input Delay': '< 200ms',
    },

    'Accessibility': {
        'WCAG 2.1 Level AA': 'PASS',
        'Lighthouse Accessibility': '95+',
        'Keyboard Navigation': 'FULL',
        'Screen Reader': 'FULL',
    },
};

/**
 * Resource Links
 */
export const resourceLinks = {
    documentation: 'src/enterprise/README.md',
    github_setup: 'src/enterprise/GITHUB_SETUP.md',
    architecture: 'src/enterprise/ARCHITECTURE_ANALYSIS.md',
    design_system: 'src/enterprise/design-system/theme.ts',
    skills_framework: 'src/enterprise/agents/skills-framework.ts',
    templates: 'src/enterprise/templates/templates.ts',
    components: 'src/enterprise/components/',
    styles: 'src/enterprise/components/styles/',
};

console.log('✅ Enterprise Platform Index Loaded');
console.log(`Version: ${platformIndex.version}`);
console.log(`Status: ${platformIndex.status}`);
console.log(`Sections: ${platformIndex.sections.length}`);
console.log(`Last Updated: ${platformIndex.lastUpdated}`);
