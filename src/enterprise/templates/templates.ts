/**
 * Enterprise Product Templates
 * Reusable templates for creating future products and service offerings
 */

/**
 * Template 1: Service Module Template
 * Used to define new service offerings with consistent structure
 */
export interface ServiceModule {
    id: string;
    name: string;
    description: string;
    category: string;
    features: Feature[];
    pricing?: PricingTier[];
    targetAudience: string[];
    seo?: SEOConfig;
    theme?: ThemeConfig;
}

interface Feature {
    id: string;
    name: string;
    description: string;
    icon?: string;
    benefit: string;
}

interface PricingTier {
    name: string;
    price: number;
    description: string;
    includes: string[];
    highlighted?: boolean;
}

interface SEOConfig {
    title: string;
    metaDescription: string;
    keywords: string[];
    structuredData?: Record<string, unknown>;
}

interface ThemeConfig {
    primaryColor: string;
    accentColor: string;
    gradientStart: string;
    gradientEnd: string;
}

/**
 * Template 2: Landing Page Template
 * Quick-start template for new service landing pages
 */
export const createLandingPageTemplate = (config: {
    service: ServiceModule;
    heroTitle: string;
    heroSubtitle: string;
    heroImage?: string;
    sections: LandingPageSection[];
}) => ({
    title: config.service.name,
    hero: {
        title: config.heroTitle,
        subtitle: config.heroSubtitle,
        backgroundImage: config.heroImage,
    },
    sections: config.sections,
    metadata: config.service.seo,
});

interface LandingPageSection {
    id: string;
    type: 'features' | 'benefits' | 'testimonials' | 'pricing' | 'faq' | 'cta';
    title: string;
    content: unknown;
}

/**
 * Template 3: Multi-Agent Workflow Template
 * Define new workflows combining multiple agent skills
 */
export interface WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    stages: WorkflowStage[];
    estimatedDuration: string;
    teamSize: {
        consultants: number;
        engineers: number;
        support: number;
    };
    deliverables: Deliverable[];
    successMetrics: string[];
}

interface WorkflowStage {
    order: number;
    name: string;
    duration: string;
    agents: string[];
    skills: string[];
    inputs: string[];
    outputs: string[];
    gates?: Gate[];
}

interface Gate {
    type: 'approval' | 'quality-check' | 'stakeholder-review';
    criteria: string[];
}

interface Deliverable {
    name: string;
    type: string;
    format: string;
    description: string;
}

/**
 * Template 4: Component Template
 * Reusable UI component patterns
 */
export interface ComponentTemplate {
    name: string;
    category: string;
    description: string;
    variants: ComponentVariant[];
    accessibility: AccessibilityChecklist;
    responsive: boolean;
    darkModeSupport: boolean;
    animationLevel: 'none' | 'subtle' | 'moderate' | 'high';
}

interface ComponentVariant {
    name: string;
    props: Record<string, unknown>;
    preview?: string;
}

interface AccessibilityChecklist {
    keyboardNavigation: boolean;
    screenReaderSupport: boolean;
    colorContrast: boolean;
    labelAssociations: boolean;
    ariaAttributes: boolean;
}

/**
 * Template 5: Content Strategy Template
 * Framework for creating content across channels
 */
export interface ContentStrategyTemplate {
    id: string;
    name: string;
    targetAudience: string;
    channels: ContentChannel[];
    contentPillar: string;
    contentItems: ContentItem[];
    distribution: DistributionPlan;
    metrics: ContentMetric[];
}

interface ContentChannel {
    name: string;
    format: string[];
    frequency: string;
    audienceSegment: string;
}

interface ContentItem {
    id: string;
    title: string;
    type: string;
    channel: string;
    seoTargets: string[];
    estimatedSize: string;
    researchRequired?: string[];
}

interface DistributionPlan {
    channels: string[];
    timing: string;
    amplification: string[];
    partnerships?: string[];
}

interface ContentMetric {
    name: string;
    target: string;
    measurement: string;
    frequency: string;
}

/**
 * Template 6: Quick Implementation Guide
 * Step-by-step templates for executing engagements
 */
export interface ImplementationGuide {
    serviceId: string;
    name: string;
    duration: string;
    phases: Phase[];
    riskMitigation: RiskMitigation[];
    stakeholderCommunication: CommunicationPlan;
}

interface Phase {
    order: number;
    name: string;
    duration: string;
    activities: Activity[];
    deliverables: string[];
    successCriteria: string[];
}

interface Activity {
    name: string;
    owner: string;
    duration: string;
    dependencies?: string[];
    resources: Resource[];
}

interface Resource {
    type: string;
    quantity: number;
    costEstimate?: number;
}

interface RiskMitigation {
    risk: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
    owner: string;
}

interface CommunicationPlan {
    stakeholders: Stakeholder[];
    frequency: string;
    channels: string[];
    contentType: string[];
}

interface Stakeholder {
    role: string;
    frequency: string;
    contentNeeds: string[];
}

/**
 * Template Factory Function
 * Create a new service offering using the templates
 */
export const createNewServiceOffering = (baseConfig: {
    name: string;
    description: string;
    category: string;
    targetAudience: string[];
}) => {
    const serviceId = baseConfig.name.toLowerCase().replace(/\s+/g, '-');

    return {
        serviceModule: {
            id: serviceId,
            name: baseConfig.name,
            description: baseConfig.description,
            category: baseConfig.category,
            targetAudience: baseConfig.targetAudience,
            features: [],
            pricing: [],
        },
        landingPage: createLandingPageTemplate({
            service: {
                id: serviceId,
                name: baseConfig.name,
                description: baseConfig.description,
                category: baseConfig.category,
                features: [],
                targetAudience: baseConfig.targetAudience,
            },
            heroTitle: baseConfig.name,
            heroSubtitle: baseConfig.description,
            sections: [],
        }),
        workflowTemplate: {
            id: `workflow-${serviceId}`,
            name: `${baseConfig.name} Workflow`,
            description: `Implementation workflow for ${baseConfig.name}`,
            category: baseConfig.category,
            stages: [],
            estimatedDuration: 'TBD',
            teamSize: {
                consultants: 1,
                engineers: 1,
                support: 0,
            },
            deliverables: [],
            successMetrics: [],
        } as WorkflowTemplate,
        contentStrategy: {
            id: `content-${serviceId}`,
            name: `${baseConfig.name} Content Strategy`,
            targetAudience: baseConfig.targetAudience[0] || 'general',
            channels: [],
            contentPillar: baseConfig.name,
            contentItems: [],
            distribution: {
                channels: [],
                timing: 'TBD',
                amplification: [],
            },
            metrics: [],
        } as ContentStrategyTemplate,
    };
};

/**
 * Example: Using templates to define a new service
 */
export const exampleNewService = createNewServiceOffering({
    name: 'AI Customer Analytics',
    description: 'Advanced customer analytics powered by AI insights',
    category: 'Analytics',
    targetAudience: ['marketing-leaders', 'product-managers', 'data-teams'],
});

/**
 * Template Registry
 * Keep track of all templates for management
 */
export const templateRegistry = {
    services: new Map<string, ServiceModule>(),
    workflows: new Map<string, WorkflowTemplate>(),
    components: new Map<string, ComponentTemplate>(),
    contentStrategies: new Map<string, ContentStrategyTemplate>(),
    implementationGuides: new Map<string, ImplementationGuide>(),

    registerService: (module: ServiceModule) => {
        templateRegistry.services.set(module.id, module);
    },

    registerWorkflow: (workflow: WorkflowTemplate) => {
        templateRegistry.workflows.set(workflow.id, workflow);
    },

    registerComponent: (component: ComponentTemplate) => {
        templateRegistry.components.set(component.name, component);
    },

    registerContentStrategy: (strategy: ContentStrategyTemplate) => {
        templateRegistry.contentStrategies.set(strategy.id, strategy);
    },

    registerImplementationGuide: (guide: ImplementationGuide) => {
        templateRegistry.implementationGuides.set(guide.serviceId, guide);
    },

    getAll: () => ({
        services: Array.from(templateRegistry.services.values()),
        workflows: Array.from(templateRegistry.workflows.values()),
        components: Array.from(templateRegistry.components.values()),
        contentStrategies: Array.from(templateRegistry.contentStrategies.values()),
        implementationGuides: Array.from(templateRegistry.implementationGuides.values()),
    }),
};
