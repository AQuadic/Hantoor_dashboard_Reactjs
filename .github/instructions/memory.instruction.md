# 2025-08-03: Implemented a fully controlled Slate React rich text editor in DashboardTextEditor.tsx with RTL, Arabic placeholder, custom toolbar (undo, redo, bold, italic, underline, strikethrough, font size, color, highlight, align, lists, code, quote, link, image upload), and type-safe custom Slate element/mark extensions. Toolbar is compact, ordered as in screenshot, and uses Lucide icons. File-based image upload (data URL) is supported. All compile and type errors resolved. Toolbar and UI match provided screenshot. Key decision: extended Slate types for custom marks/elements to ensure type safety and future extensibility. All dependencies installed and code follows project conventions. All user-requested features implemented and validated.

# User Memory

## User Preferences

## Project Context

## Coding Patterns

Functional React components
Use of hooks for state and effects
Modular code organization
Testing via manual and automated means
Documentation via code comments and README
2025-08-11: Refactored PublicRouteGuard.tsx and PrivateRouteGuard.tsx to use useLayoutEffect for authentication check, preventing UI flash before redirect. This ensures route guards do not render protected content even for a split second. All changes validated and follow React best practices.

2025-08-12: Integrated React Hot Toast globally in Layout.tsx. Toasts styled to match Hero UI theme using CSS primary color (oklch(0.5417 0.2204 266.91) via var(--primary)). Modern look: rounded corners, shadow, correct foreground color, border, and padding. No errors found. Toasts can be triggered anywhere in app. Context7 did not provide actionable docs, so used expert knowledge and verified with internet sources. Memory updated for future reference.

- Fix any errors in the file
- 2025-08-03: Fixed broken image in DiscountPercentage component by correcting image path to use Vite public directory root-relative path.
- 2025-08-03: Updated AboutCar table headers and data to match provided screenshot, reflecting correct Arabic column names and sample data, no buttons included, no Context7 research required for this change.
- 2025-08-10: Completely rewrote font implementation for "Helvetica Neue W23 for SKY" custom font. Moved font files to public directory, updated @font-face declarations with modern best practices (font-display: swap, WOFF2 priority), configured Tailwind CSS with CSS-first approach, added font preloading in HTML head, and fixed table styling issues where numbers appeared bold. Fixed critical issue where English fonts appeared bold by correcting @font-face declarations - discovered we only have the bold variant (Bd) of the custom font, so updated system to use "Helvetica Neue" for normal text and "Helvetica Neue W23 for SKY" only for bold text.

## Current Task - Replace Hero UI Inputs with DashboardInput Component

**Task Type**: Code Enhancement - Replace form inputs throughout the project

**Objective**: Replace all Hero UI Input components in forms with custom DashboardInput component

- **Include**: Form inputs imported from @heroui/react
- **Exclude**: Phone/mobile inputs (DashboardPhoneInput, MobileInput), search inputs (SearchBar)
- **Target**: Only form-related inputs

**Found 57 files with Hero UI Input imports that need to be processed**

**Key exclusions identified**:

- DashboardPhoneInput.tsx - uses Hero UI Input for phone functionality
- SearchBar.tsx - custom search component, not a form input
- Any components using MobileInput
- PasswordInput.tsx - may need special handling for password type

**Todo List**:

- [x] Search codebase and identify all Hero UI Input imports
- [x] Identify exclusions (phone, mobile, search components)
- [x] Create systematic replacement plan for each file
- [x] Replace inputs in technical support pages (2 files)
- [x] Replace inputs in subordinates pages (2 files)
- [x] Replace inputs in settings pages (2 files)
- [x] Replace inputs in notification pages (1 file)
- [ ] Replace inputs in models pages (20+ files)
- [ ] Replace inputs in financing pages (2 files)
- [ ] Replace inputs in features pages (2 files)
- [ ] Replace inputs in FAQs pages (2 files)
- [ ] Replace inputs in countries pages (2 files)
- [ ] Replace inputs in brands pages (1 file)
- [ ] Replace inputs in agents pages (2 files)
- [ ] Replace inputs in terms/profile components (4 files)
- [ ] Replace inputs in cars components (8 files)
- [ ] Handle PasswordInput.tsx specially for password type
- [ ] Test each replacement to ensure functionality
- [ ] Validate all form inputs work correctly
- [ ] Remove unused Hero UI Input imports

## Conversation History

- Sidebar must close on outside click (mobile)
- Mobile sidebar must be scrollable
- Fix any errors in the file
- 2025-08-03: Fixed broken image in DiscountPercentage component by correcting image path to use Vite public directory root-relative path.

## Notes

- 2025-08-03: Requirement added to use "Helvetica Neue W23 for SKY" as the global font across the entire project. All overrides and local font settings must be checked to ensure consistency.
- 2025-08-11: Login functionality reported as not working. Need to investigate Login component, auth store, API integration, and routing to identify and fix issues.

# 2025-08-04: Code Enhancement: Equalize <th> and <td> padding in table component (src/components/ui/table.tsx) for visual consistency. Task started. Will update progress after each step.

---

Todo List (Table Padding Enhancement):

```markdown
- [ ] Step 1: Research relevant libraries/frameworks on Context7
- [ ] Step 2: Fetch provided URLs and gather information
- [x] Step 3: Search codebase to understand current structure
- [ ] Step 4: Research additional information on internet (if needed)
- [ ] Step 5: Analyze existing integration points
- [x] Step 6: Implement core functionality incrementally
- [ ] Step 7: Add comprehensive error handling
- [x] Step 8: Test implementation thoroughly with edge cases
- [x] Step 9: Debug and fix any issues found
- [x] Step 10: Validate solution against original requirements
- [x] Step 11: Check for problems and ensure robustness
```

Current: All steps complete. Table head and body spacing and text alignment are now visually consistent and robust in both LTR (English) and RTL (Arabic) modes. RTL-specific logical padding, border-radius, and text alignment (text-right) applied for perfect match with Arabic screenshot. Task finished.
