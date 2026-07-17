import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PageStat {
  path: string;
  views: number;
}

export interface TrafficPoint {
  time: string;
  visitors: number;
}

interface AnalyticsState {
  pageViews: number;
  uniqueVisitors: number;
  topPages: PageStat[];
  trafficData: TrafficPoint[];
  lastVisited: number | null;
  trackVisit: (path: string) => void;
}

// Generate base traffic data
const initialTrafficData: TrafficPoint[] = [
  { time: '00:00', visitors: 12 },
  { time: '04:00', visitors: 5 },
  { time: '08:00', visitors: 22 },
  { time: '12:00', visitors: 18 },
  { time: '16:00', visitors: 30 },
  { time: '20:00', visitors: 45 },
  { time: '23:59', visitors: 15 },
];

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      pageViews: 139,
      uniqueVisitors: 66,
      topPages: [
        { path: '/', views: 98 },
        { path: '/admin', views: 41 },
      ],
      trafficData: initialTrafficData,
      lastVisited: null,

      trackVisit: (path: string) => {
        const now = Date.now();
        const { lastVisited, pageViews, uniqueVisitors, topPages, trafficData } = get();
        
        // Count as unique visitor if last visit was more than 30 mins ago
        const isUnique = !lastVisited || (now - lastVisited > 30 * 60 * 1000);
        
        // Update top pages
        const updatedPages = [...topPages];
        const pageIndex = updatedPages.findIndex(p => p.path === path);
        if (pageIndex >= 0) {
          updatedPages[pageIndex].views += 1;
        } else {
          updatedPages.push({ path, views: 1 });
        }
        updatedPages.sort((a, b) => b.views - a.views);

        // Update traffic data (simple logic: increment the current 4-hour block)
        const hour = new Date().getHours();
        const blockIndex = Math.min(Math.floor(hour / 4), 6);
        const updatedTraffic = [...trafficData];
        if (blockIndex >= 0 && blockIndex < updatedTraffic.length) {
            updatedTraffic[blockIndex].visitors += 1;
        }

        set({
          pageViews: pageViews + 1,
          uniqueVisitors: isUnique ? uniqueVisitors + 1 : uniqueVisitors,
          topPages: updatedPages.slice(0, 5), // Keep top 5
          trafficData: updatedTraffic,
          lastVisited: now,
        });
      },
    }),
    {
      name: 'georeo-analytics-storage',
    }
  )
);
