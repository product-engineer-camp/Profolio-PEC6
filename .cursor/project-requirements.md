`Project Requirements rules *@docs/project-requirements.md* You will use tools codebase to know what are the details of the files of this *@docs/project-requirements.md* directory files to check the project requirements and the project standards that you need to follow. This will be the guide for you to make sure you are following the project standards. So make sure to read this when planning and implementing the project to avoid duplications, conflicts, and errors. Don't touch that folder and files, you will only read it. Don't over do it to the point that you are not following the project requirements. DON'T REMOVE THIS LINE 1!!!!`

# Profile Create Service Project Requirements

## Core Features

1. **Profile Creation Flow**

   - Basic questionnaire system with skip option - step1
   - AI-generated follow-up questions based on basic questionnaire system with skip option - step2
   - Theme selection interface - step3
   - Profile preview functionality - step4
   - Profile image upload capability - step4
   - Final confirmation step - step4

2. **Profile Management**

   - Profile listing view
   - Detailed profile view
   - Profile editing capabilities
   - Profile deletion options

3. **Sharing System**

   - URL sharing functionality
   - QR code generation
   - Kakao social share integration
   - Share history tracking

4. **Theme Management**

   - Theme browsing interface
   - Theme creation wizard
   - Keyword selection system
   - Color & pattern generator based on keywords
   - Theme preview functionality
   - Theme application system

5. **Technical Requirements**
   - AI integration for question generation
   - Image processing for profile pictures
   - QR code generation API
   - Kakao SDK integration
   - Color pattern algorithm implementation
   - Responsive design for all devices
   - Secure data storage and handling

## Technical Specifications

**Frontend:**

- Mobile first approach
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI
- tanstack query

**Backend:**

- Next.js API routes
- Supabase (PostgreSQL Database)
- Supabase Auth
- Supabase Realtime
- Supabase Storage (for files)
- Prisma ORM (optional)
- Zod (validation) - implement if required, not required for now

## Documentation Standards

1. Inline TSDoc comments for all calculations
2. OpenAPI specification for APIs
3. ER diagrams for database schema
4. Audit trail documentation
5. Financial formula registry

## Implementation Benefits

1. Single provider for all backend needs
2. Unified authentication system
3. Direct database <> storage integration
4. Simplified billing and monitoring
5. Built-in rate limiting and security

### Server/Client Separation

- **Server Components**: Default to server components for:
  - Data fetching
  - Sensitive operations
  - Static content
- **Client Components**: Only use when needed for:
  - Interactivity
  - Browser APIs
  - State management
