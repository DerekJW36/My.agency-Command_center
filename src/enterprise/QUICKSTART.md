# 🚀 Quick Start Guide - Enterprise AI Platform

## 5-Minute Setup

### Step 1: Review the Complete Package
All files are in: `src/enterprise/`

```
✅ Design System (theme.ts)
✅ Components (CircuitBoard.tsx)
✅ Multi-Agent Framework (skills-framework.ts)
✅ Landing Page (LandingPage.tsx)
✅ Templates System (templates.ts)
✅ 4 Comprehensive Docs
```

### Step 2: Import & Use the Landing Page

```typescript
// In your app.tsx or main component
import { EnterpriseLandingPage } from '@/enterprise/pages/LandingPage';

export default function App() {
  return <EnterpriseLandingPage theme="dark" />;
}
```

### Step 3: Try Dark Mode
```typescript
<EnterpriseLandingPage theme="dark" />  // Obsidian/Electric Blue/Gold
```

Or Light Mode:
```typescript
<EnterpriseLandingPage theme="light" /> // Ivory/Gunmetal/Gold
```

### Step 4: View the Results
- Circuit board animates on load
- Move your mouse to activate nodes
- Services display all 7 agent teams
- Workflows show example orchestrations
- Everything is responsive

---

## 📚 Key Files to Know

| File | Purpose | When to Use |
|------|---------|------------|
| `design-system/theme.ts` | All colors, fonts, spacing | Building components |
| `agents/skills-framework.ts` | 7 agents + 30 skills | Understanding capabilities |
| `components/CircuitBoard.tsx` | Animation component | Embedding animations |
| `pages/LandingPage.tsx` | Complete landing page | Homepage |
| `templates/templates.ts` | Template system | Creating new services |
| `README.md` | Full documentation | Detailed info |

---

## 🎨 Customize Colors

Edit `src/enterprise/design-system/theme.ts`:

```typescript
// Light mode
light: {
  background: '#F5F3F0',        // Change Ivory
  foreground: '#2C3E50',        // Change Gunmetal
  primary: '#D4AF37',           // Change Gold
},

// Dark mode
dark: {
  background: '#0A0E27',        // Change Obsidian
  foreground: '#00D9FF',        // Change Electric Blue
  primary: '#D4AF37',           // Change Gold
}
```

---

## 🤖 Add a New Agent

Edit `src/enterprise/agents/skills-framework.ts`:

```typescript
// Add to existing array or create new:
export const myNewAgentSkills: AgentSkill[] = [
  {
    id: 'my-skill',
    name: 'My New Skill',
    description: 'What it does',
    category: 'My Category',
    capabilities: ['capability 1', 'capability 2'],
    outputType: 'report',
    requiredInputs: ['input-name'],
    estimatedDuration: '2 weeks',
    complexity: 'advanced',
  },
];

// Add to allAgentSkills:
export const allAgentSkills = {
  // ... existing agents ...
  'my-category': myNewAgentSkills,
};
```

---

## 📋 Create a New Service

Using the template system:

```typescript
import { createNewServiceOffering } from '@/enterprise/templates/templates';

const newService = createNewServiceOffering({
  name: 'Your Service Name',
  description: 'What it does',
  category: 'Category',
  targetAudience: ['audience1', 'audience2'],
});

// Returns:
// - newService.serviceModule
// - newService.landingPage
// - newService.workflowTemplate
// - newService.contentStrategy
```

---

## 🎯 Common Tasks

### Display Circuit Board Alone
```typescript
import { CircuitBoard } from '@/enterprise/components/CircuitBoard';

<CircuitBoard theme="dark" intensity={0.7} interactive={true} />
```

### Access Design Tokens
```typescript
import { designTokens } from '@/enterprise/design-system/theme';

const colors = designTokens.dark;
const text = colors.text.primary;
```

### List All Agent Skills
```typescript
import { allAgentSkills } from '@/enterprise/agents/skills-framework';

Object.entries(allAgentSkills).forEach(([category, skills]) => {
  console.log(`${category}: ${skills.length} skills`);
});
```

---

## 📱 Responsive Breakpoints

Mobile-first approach with breakpoints:

```css
/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }
```

All components are fully responsive!

---

## ♿ Accessibility Features

✅ WCAG 2.1 Compliant
✅ Keyboard Navigation
✅ Screen Reader Support
✅ Color Contrast
✅ Reduced Motion Support

```css
/* Automatically respects user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 🚢 Deploy Steps

1. **Build:**
```bash
npm run build
```

2. **Test:**
```bash
npm run test
```

3. **Deploy:**
```bash
npm run deploy
```

See `README.md` for detailed deployment options.

---

## 📊 Performance Tips

- ✅ Circuit board intensity can be reduced on mobile
- ✅ Components use CSS variables for theming (no re-renders)
- ✅ Use React.memo() to prevent unnecessary re-renders
- ✅ Lazy-load components for better initial load

---

## 🆘 Need Help?

| Topic | File |
|-------|------|
| Everything | `README.md` |
| Design | `design-system/theme.ts` |
| Agents | `agents/skills-framework.ts` |
| Architecture | `ARCHITECTURE_ANALYSIS.md` |
| GitHub | `GITHUB_SETUP.md` |
| Index | `INDEX.ts` |

---

## 🎯 Next Goals

- [ ] Deploy landing page
- [ ] Customize with your branding
- [ ] Add your logo
- [ ] Update content for Portland location
- [ ] Add team information
- [ ] Connect to your CRM
- [ ] Set up analytics
- [ ] Test with clients

---

## 💡 Pro Tips

1. **Use design tokens** - Never hardcode colors
2. **Follow the structure** - Keep consistent organization
3. **Test both themes** - Ensure light/dark work
4. **Leverage templates** - Use them for new services
5. **Document changes** - Update README when modifying
6. **Commit regularly** - Small, atomic commits

---

## 🚀 You're Ready!

Your enterprise platform is production-ready. Start with:

1. **Import LandingPage** ← 2 minutes
2. **Customize colors** ← 5 minutes
3. **Add your content** ← 10 minutes
4. **Deploy** ← 5 minutes

**Total: ~30 minutes to have a live site!**

---

**Questions?** Check the [Complete Index](./INDEX.ts) for all resources.

**Ready to Scale?** See [Architecture Analysis](./ARCHITECTURE_ANALYSIS.md) for growth strategies.

Good luck! 🎉
