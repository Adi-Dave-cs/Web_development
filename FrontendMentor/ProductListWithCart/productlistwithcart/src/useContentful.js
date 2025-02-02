import { createClient } from "contentful";

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

export const useContentful = () => {
  const getProducts = async (limit, skip) => {
    try {
      const entries = await client.getEntries({
        content_type: "productsCatalogue",
        limit,
        skip,
      });

      const sanitizedEntries = entries.items.map((items) => [
        items.fields,
        items?.sys?.id,
      ]);
      return [entries.total, sanitizedEntries];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const getFilteredProducts = async (query, limit, skip) => {
    try {
      const entries = await client.getEntries({
        content_type: "productsCatalogue",
        query,
        limit,
        skip,
      });

      const sanitizedEntries = entries.items.map((items) => [
        items.fields,
        items?.sys?.id,
      ]);
      // console.log(sanitizedEntries);
      return [entries.total, sanitizedEntries];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const getProduct = async (entry_id) => {
    try {
      const entries = await client.getEntry(entry_id);
      const sanitizedEntries = entries?.fields;
      return sanitizedEntries;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  return { getProducts, getProduct, getFilteredProducts };
};
