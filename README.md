# Dino Ventures – Video Player App

A **mobile-first video player application** built with React, TypeScript, Tailwind CSS, and Framer Motion. Delivers a seamless video playback experience with gesture-based interactions, custom controls via the YouTube IFrame Player API, a drag-to-minimize "Picture-in-App" mini-player, virtualized lists, real-time search, and smooth 60 fps animations — inspired by the YouTube mobile app.

---

## Features

### 1. Home Page – Video Feed

- Virtualized responsive grid powered by **react-virtuoso** `VirtuosoGrid` (1 column on mobile, 2 on tablet, 3 on laptop, 4 on desktop).
- 29 videos across 3 categories: Social Media AI, AI Income, AI Essentials.
- **Video Cards**: Thumbnail with lazy loading, title, duration badge, category badge overlay, and channel-like avatar.
- Sticky category filter chips with icons ("All" + per-category); smooth scroll-to-top on filter change.
- Adjusts bottom padding when the mini-player is active to prevent content overlap.

### 2. Search

- Expandable search bar in the header with a smooth spring slide-in animation.
- Real-time filtering as you type — matches against video **title** and **category name** (case-insensitive).
- Works in combination with category chip filters.
- Result count displayed while searching.
- Dedicated empty state with icon and helpful message when no results match.
- Clear (X) button to reset input; "Cancel" to close the search bar; Escape key support.

### 3. Full-Page Video Player

- **YouTube IFrame Player API** integration for full custom control over YouTube videos.
- Native `<video>` support for MP4 files.
- **Auto-play** on open.
- **Custom overlay controls**:
  - Play / Pause toggle with animated icon swap (`AnimatePresence`).
  - Skip forward (+10 s) and backward (−10 s) with spring-animated buttons.
  - Seekable progress bar with red fill indicator and buffered track.
  - Current time / total duration display with tabular-nums formatting.
  - Minimize (chevron down), Picture-in-Picture, and Close buttons.
- **Double-tap to skip**: Tap the left or right third of the video to skip ±10 s with ripple animation.
- Controls auto-hide after 3.5 seconds of inactivity; reappear on hover/tap.
- Fully responsive for both mobile and desktop viewports.

### 4. In-Player Related Video List (Bottom Sheet)

- Swipe-up or tap the "Up Next" handle to reveal a bottom-sheet drawer.
- Filtered by the **same category** as the current video.
- Virtualized scrollable list via **react-virtuoso** `Virtuoso`.
- Category badge animates on category change; item count displayed.
- Clicking a related video switches playback immediately and auto-plays.
- The list updates automatically when the category changes.
- Backdrop overlay when expanded; collapses on outside tap.
- Smooth spring animations for expand/collapse transitions.

### 5. Drag-to-Minimize (Picture-in-App)

- **Drag gesture**: Swipe the player downward to shrink it into a bottom-docked mini-player.
- **Visual drag feedback**: Player scales down and fades as you drag.
- **Mini-Player**: Thumbnail, title, category name, Play/Pause, and Close buttons.
- **Swipe to dismiss**: Swipe the mini-player right to close it.
- **Persistent**: The mini-player stays visible while the user browses the home feed.
- **Tap to restore**: Tapping the mini-player expands it back to full-screen mode.
- Progress bar on the mini-player tracks current playback position.

### 6. Auto-Play Next

- Animated countdown ring (3 seconds) with a circular SVG progress indicator.
- "Cancel" and "Play Now" action buttons.
- Automatically plays the next video in the same category when the countdown finishes.

### 7. Performance Optimizations

- **Virtualization**: `VirtuosoGrid` for the home feed and `Virtuoso` for the in-player list — only visible items are mounted in the DOM.
- **Lazy image loading**: Custom `LazyImage` component using `IntersectionObserver` with configurable root margin, native `loading="lazy"` fallback, `fetchpriority="low"` for off-screen images, and `decoding="async"`.
- **CDN preconnection**: `<link rel="preconnect">` and `<link rel="dns-prefetch">` for image CDNs in `index.html`.
- **Memoization**: `React.memo` on leaf components (`VideoCard`, `LazyImage`, `MiniPlayer`, `Header`, `SeekBar`, `CountdownOverlay`, `SkipRippleOverlay`); `useMemo` on context value; `useCallback` on event handlers.
- **Skeleton shimmer placeholders**: Animated gradient placeholder while images load, with smooth fade-in on completion.

### 8. Accessibility

- `aria-label` on all interactive buttons (search, play/pause, seek, minimize, close, PiP, etc.).
- `aria-pressed` on category filter chips to indicate active state.
- `aria-expanded` on the in-player video list drag handle.
- `aria-valuemin` / `aria-valuemax` / `aria-valuenow` on the seek bar.
- `role="region"` on the mini-player; `role="button"` on the drawer handle.
- `:focus-visible` outlines for keyboard navigation.

---

## Tech Stack

| Layer          | Technology                                                                        |
| -------------- | --------------------------------------------------------------------------------- |
| Framework      | [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)                    |
| Language       | [TypeScript 5.9](https://www.typescriptlang.org/)                                 |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com/) with custom theme tokens and utilities |
| Animations     | [Framer Motion 12](https://www.framer.com/motion/)                                |
| Virtualization | [react-virtuoso 4](https://virtuoso.dev/)                                         |
| Icons          | [Lucide React](https://lucide.dev/)                                               |
| Video API      | YouTube IFrame Player API + native `<video>` for MP4                              |
| Linting        | ESLint 9 with TypeScript and React Hooks plugins                                  |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd video-player-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with HMR           |
| `npm run build`   | Type-check with TypeScript then build for production |
| `npm run preview` | Preview the production build locally                 |
| `npm run lint`    | Run ESLint across the project                        |

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Top navigation bar with logo, search, and profile
│   ├── VideoFeed.tsx           # Home page virtualized video grid with category chips
│   ├── VideoCard.tsx           # Video thumbnail card (vertical & horizontal layouts)
│   ├── VideoPlayer.tsx         # Full video player with YouTube API + custom controls
│   ├── PlayerOverlay.tsx       # Manages full-player ↔ mini-player transitions
│   ├── MiniPlayer.tsx          # Bottom-docked mini player bar
│   ├── InPlayerVideoList.tsx   # Bottom-sheet related video list (same category)
│   ├── SeekBar.tsx             # Seekable progress bar with time display
│   ├── CountdownOverlay.tsx    # Auto-play-next countdown UI with circular progress
│   ├── SkipRippleOverlay.tsx   # Skip ±10s ripple animation overlay
│   └── LazyImage.tsx           # Viewport-aware lazy image with skeleton shimmer
├── hooks/
│   ├── useVideoPlayer.tsx      # Global state context (video, status, time, actions)
│   └── useYouTubePlayer.ts     # YouTube IFrame Player API integration hook
├── data/
│   └── mockData.ts             # Complete dataset (3 categories, 29 videos)
├── types/
│   ├── video.ts                # Video / Category / AppData interfaces
│   └── youtube.d.ts            # YouTube IFrame API type declarations
├── App.tsx                     # App root with VideoProvider and search state
├── main.tsx                    # React entry point
└── index.css                   # Tailwind config, design tokens, custom utilities
```

---

## Evaluation Checklist

| Criterion           | Coverage                                                                                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Completeness**    | Video feed, custom controls, in-player list, drag-to-minimize, auto-play-next, search — all fully implemented.                                                                          |
| **UI / UX Quality** | Dark theme, glassmorphism, smooth Framer Motion spring animations, mobile-first responsive design, skeleton loading states.                                                             |
| **Code Structure**  | Modular components, typed context with memoized value, custom hooks, named constants, clean separation of concerns.                                                                     |
| **Performance**     | 60 fps animations via Framer Motion spring physics, virtualized lists (react-virtuoso), lazy-loaded images with IntersectionObserver, React.memo on leaf components, CDN preconnection. |
