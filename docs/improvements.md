# CIHP Engineering Tasks

## 🚀 Deployment & Infrastructure
- [ ] 1. Create Vercel project, connect YoyoApplications GitHub org
- [ ] 2. Configure `main` → production environment on Vercel
- [ ] 3. Configure `dev` → staging environment on Vercel
- [ ] 4. Add production env vars to Vercel (DATABASE_URL, DIRECT_URL)
- [ ] 5. Add staging env vars to Vercel (staging Supabase connection strings)
- [ ] 6. Verify preview deployments work on PRs

## 🌐 DNS & Domain
- [ ] 7. Purchase domain
- [ ] 8. Set up Cloudflare as DNS provider
- [ ] 9. Point domain to Vercel production
- [ ] 10. Configure `staging.[domain]` subdomain → Vercel staging
- [ ] 11. SSL (automatic via Vercel + Cloudflare)

## 🔐 Auth
- [ ] 12. Create Auth0 production app
- [ ] 13. Create Auth0 staging app
- [ ] 14. Install Auth0 Next.js SDK (`@auth0/nextjs-auth0`)
- [ ] 15. Configure Auth0 callback URLs for prod + staging
- [ ] 16. Add Auth0 env vars to Vercel (prod + staging)
- [ ] 17. Implement Auth0 login/logout/callback routes in App Router
- [ ] 18. Implement session middleware to protect routes by role
- [ ] 19. Sync Auth0 user to Supabase on first login (create User record)
- [ ] 20. Admin invite flow — send invite email via Auth0
- [ ] 21. Client self-signup from invite link
- [ ] 22. Role assignment on signup (client default, coach/admin set by admin) + coach auto-assigned if invite link was coach-generated

## 🗄️ Data Models
- [ ] 23. Define `User` model (role enum: client/coach/admin, headshot URL, Auth0 ID)
- [ ] 24. Define `Exercise` model (name, description, created by)
- [ ] 25. Define `ExerciseMedia` model (exercise, URL, type: video/photo, order)
- [ ] 26. Define `Program` model (name, duration in weeks, created by, `isTemplate` boolean)
- [ ] 27. Define `Split` model (name, program, order)
- [ ] 28. Define `Section` model (label enum: W/A/B/C/D, split, order)
- [ ] 29. Define `ExerciseSlot` model (exercise, section, order, sets, reps, tempo, rest, coach note)
- [ ] 30. Define `SupersetGroup` model (groups ExerciseSlots e.g. A1+A2)
- [ ] 31. Define `ProgramAssignment` model (program → client, assigned by coach, start date, active)
- [ ] 32. Define `WorkoutSession` model (client, split, date, completed override boolean)
- [ ] 33. Define `SetLog` model (session, exercise slot, set number, reps, weight, status enum: completed/skipped/missed)
- [ ] 34. Define `SessionExerciseStatus` model (session, exercise slot, client override boolean)
- [ ] 35. Define `PersistentNote` model (client, exercise slot, note, created by)
- [ ] 36. Run initial migration to Supabase production
- [ ] 37. Run initial migration to Supabase staging

## 🎨 UI — Coach
- [ ] 38. Coach dashboard — client grid with at-a-glance status
- [ ] 39. Client profile page (coach view) — headshot, current program, recent sessions, full session logs
- [ ] 40. Exercise library — browse + search
- [ ] 41. Create/edit exercise form (name, media upload: YouTube URL or photo)
- [ ] 42. Program builder — create program, set duration, mark as template
- [ ] 43. Program builder — add/manage splits
- [ ] 44. Program builder — add/manage sections per split (W, A, B, C, D)
- [ ] 45. Program builder — add exercises to sections with sets/reps/tempo/rest + coach note
- [ ] 46. Program builder — superset grouping
- [ ] 47. Browse all templates (own + other coaches)
- [ ] 48. Clone template → new unassigned program (editable, saveable as own template)
- [ ] 49. Assign program to client with start date
- [ ] 50. Coach can view client workout session logs (set logs + override flags)
- [ ] 51. Coach headshot upload (point and shoot in clinic)

## 🎨 UI — Client
- [ ] 52. Client home — pick today's split from assigned programs
- [ ] 53. Workout screen — scrollable exercise cards grouped by section
- [ ] 54. Exercise card — name, media (YouTube embed or photo), set/rep/tempo/rest table
- [ ] 55. Exercise card — log reps + weight per set
- [ ] 56. Exercise card — set status (completed/skipped/missed) per set
- [ ] 57. Exercise card — client override "mark complete" button
- [ ] 58. Exercise card — session note field (that day only)
- [ ] 59. Exercise card — persistent note display (coach or client set)
- [ ] 60. History modal — last N sessions for exercise (paginated infinite scroll)
- [ ] 61. Autofill button — prefill weights from last session
- [ ] 62. Rest timer between sets
- [ ] 63. Mark entire workout complete (session-level override)
- [ ] 64. Client calendar view — browse past sessions
- [ ] 65. Client headshot upload (self)

## 🎨 UI — Admin
- [ ] 66. Admin dashboard — manage coaches (add/remove)
- [ ] 67. Unassigned client pool — coaches claim clients
- [ ] 68. Invite new client by email

## 🎨 UI — Shared
- [ ] 69. Navigation layout (role-aware — sidebar for coach/admin, bottom nav for client)
- [ ] 70. Auth pages (login, signup, error)
- [ ] 71. Loading states + error boundaries throughout
- [ ] 72. Mobile-responsive layout (clients will be on phone)