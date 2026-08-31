import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'b6tru9bi',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});