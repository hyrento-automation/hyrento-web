// Sanity CMS Client Stub

export interface SanityPost {
  title: string;
  slug: string;
  publishedAt: string;
  body: string;
  excerpt: string;
}

const mockPosts: SanityPost[] = [
  {
    title: "How to Scale Your Car Rental Fleet in 2026",
    slug: "how-to-scale-car-rental-fleet-2026",
    publishedAt: "2026-06-10",
    excerpt: "Discover the fleet utilization strategies and automation setups that let independent operators scale efficiently.",
    body: "Scaling your fleet is about more than just buying cars..."
  },
  {
    title: "Reducing Double Bookings: A Complete Guide",
    slug: "reducing-double-bookings-complete-guide",
    publishedAt: "2026-05-28",
    excerpt: "Double bookings destroy client trust and waste operations budget. Learn how to eliminate them completely.",
    body: "Double bookings happen when data is unsynced..."
  }
];

export const getSanityClient = () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  
  if (!projectId) {
    return {
      fetch: async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
        console.log(`[Sanity Fetch Stub (No Project ID)] Query: ${query}`, params);
        if (query.includes("post")) {
          return mockPosts as unknown as T;
        }
        return [] as unknown as T;
      }
    };
  }

  // Real client initialization would go here (e.g. using @sanity/client)
  return {
    fetch: async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
      console.log(`[Sanity Fetch Real] Query: ${query}`, params);
      return [] as unknown as T;
    }
  };
};

export const fetchBlogPosts = async (): Promise<SanityPost[]> => {
  const client = getSanityClient();
  return client.fetch<SanityPost[]>('*[_type == "post"] | order(publishedAt desc)');
};
