import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PageStat {
  path: string;
  views: number;
}

interface AnalyticsState {
  pageViews: number;
  uniqueVisitors: number;
  topPages: PageStat[];
  hasVisitedBefore: boolean;
  trackVisit: (path: string) => void;
}

// Removed dummy traffic data

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      pageViews: 139,
      uniqueVisitors: 66,
      topPages: [
        { path: '/', views: 98 },
        { path: '/admin', views: 41 },
      ],
      hasVisitedBefore: false,

      trackVisit: (path: string) => {
        const { hasVisitedBefore, pageViews, uniqueVisitors, topPages } = get();
        
        // Update top pages
        const updatedPages = [...topPages];
        const pageIndex = updatedPages.findIndex(p => p.path === path);
        if (pageIndex >= 0) {
          updatedPages[pageIndex].views += 1;
        } else {
          updatedPages.push({ path, views: 1 });
        }
        updatedPages.sort((a, b) => b.views - a.views);

        set({
          pageViews: pageViews + 1,
          uniqueVisitors: hasVisitedBefore ? uniqueVisitors : uniqueVisitors + 1,
          topPages: updatedPages.slice(0, 5), // Keep top 5
          hasVisitedBefore: true,
        });
      },
    }),
    {
      name: 'georeo-analytics-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            uniqueVisitors: 1, // Reset for the admin to see it correctly as 1 device = 1 user
            pageViews: persistedState.pageViews || 1,
            hasVisitedBefore: true,
            trafficData: undefined,
            lastVisited: undefined,
          };
        }
        return persistedState;
      }
    }
  )
);
