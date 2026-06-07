# Next.js Portfolio Full-Stack Migration Plan

## Current Architecture
- **Frontend**: Next.js 16.2.7 (React 19) with 3D components
- **Backend**: Separate Express.js server with MongoDB
- **Communication**: Frontend calls external API via `NEXT_PUBLIC_API_URL`

## Target Architecture
- **Full-Stack Next.js**: Single Next.js application with Server Actions
- **Database**: MongoDB with Mongoose (direct connection)
- **API**: Next.js Server Actions + API Routes (if needed)

## Migration Steps

### Phase 1: Database & Models Setup
- [x] Install Mongoose in nextjs-portfolio
- [x] Create lib/db.js for MongoDB connection
- [x] Create models/Message.js (port from server/models/Message.js)
- [x] Create models/User.js (port from server/models/User.js)
- [x] Create lib/actions/messageActions.js (Server Actions for messages)

### Phase 2: Server Actions Implementation
- [x] Create `createMessage` Server Action
- [x] Create `getMessages` Server Action (with admin auth)
- [x] Add proper validation and error handling
- [x] Create authActions.js (signup, login, logout, getCurrentUser)
- [x] Create emailActions.js (nodemailer integration)
- [x] Create uploadActions.js (Cloudinary integration)
- [x] Create paymentActions.js (Razorpay integration)
- [x] Create oauthActions.js (Google OAuth integration)

### Phase 3: Frontend Integration
- [x] Update Contact.jsx to use Server Actions instead of fetch
- [x] Remove dependency on NEXT_PUBLIC_API_URL
- [x] Update form handling to use Server Actions
- [x] Add email notification on contact form submission

### Phase 4: Authentication
- [x] Port auth middleware logic to Server Actions
- [x] Create auth Server Actions (signup, login, logout, getCurrentUser)
- [x] Protect admin routes (getMessages requires admin role)
- [x] Add JWT token management with httpOnly cookies

### Phase 5: Additional Features (from server)
- [x] Port email functionality (nodemailer)
- [x] Port file upload (multer/cloudinary)
- [x] Port payment integration (razorpay)
- [x] Port Google OAuth (passport-google-oauth20)

### Phase 6: Cleanup & Testing
- [x] Remove external server dependency
- [x] Update environment variables (.env.example created)
- [x] Test all functionality
- [x] Verify build works

## Summary

The migration is complete! The Next.js portfolio is now a full-stack application with:

1. **Database Layer**: MongoDB with Mongoose (cached connections for performance)
2. **Server Actions**: 
   - Message management (create, get with admin auth)
   - Authentication (signup, login, logout, session management)
   - Email notifications (nodemailer with auto-reply)
   - File uploads (Cloudinary with signed uploads)
   - Payments (Razorpay order creation, verification, refunds)
   - Google OAuth (login, link/unlink accounts)
3. **Frontend**: Updated Contact form using Server Actions with progressive enhancement
4. **Security**: JWT tokens in httpOnly cookies, admin role protection, input validation
5. **Environment**: Comprehensive .env.example for easy setup

## Next Steps for Production

1. Copy `.env.example` to `.env.local` and fill in all values
2. Set up MongoDB database
3. Configure Cloudinary account
4. Configure Razorpay account
5. Set up Google OAuth credentials
6. Configure SMTP for emails
7. Deploy to Vercel (or preferred platform)