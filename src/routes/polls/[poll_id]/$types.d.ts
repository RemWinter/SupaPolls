import type { Load } from '@sveltejs/kit';

// Define the parameters in your route
type RouteParams = {
  poll_id: string;
};

// Define the data returned by your server-side logic, if any
type PageServerData = null; // or define your server-side data shape

// Define the output data shape for the page component
type OutputData = {
  poll: any; // Replace 'any' with your actual data type
  options: any[]; // Replace 'any[]' with your actual data type
};

// Define the shape of the page data
export type PageLoad = Load<RouteParams, PageServerData, OutputData>;

export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Awaited<ReturnType<PageLoad>>;

// Export types if needed
export type { RouteParams, PageServerData, OutputData };
