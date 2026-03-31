import { FormattedMenu } from "@/types/menu.types";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT!;

const TOKEN = process.env.GRAPHQL_TOKEN!;

export async function getMenu(): Promise<FormattedMenu> {
  try {
    const query = `
      query getProducts(
        $outlet_id: ID!
        $business_id: ID!
        $cat_id: ID!
        $offset: ID!
        $request_from: String
      ) {
        getProducts(
          outlet_id: $outlet_id
          business_id: $business_id
          cat_id: $cat_id
          offset: $offset
          request_from: $request_from
        ) {
          successful
          data
          message
        }
      }
    `;

    const variables = {
      business_id: Number(process.env.BUSINESS_ID),
      outlet_id: Number(process.env.OUTLET_ID),
      cat_id: "",
      offset: 0,
      request_from: "1",
    };

    console.log("GRAPHQL TOKEN:", TOKEN ? "EXISTS" : "MISSING");

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        // most common
        Authorization: `Bearer ${TOKEN}`,

        // your n8n style
        token: TOKEN,
      },

      body: JSON.stringify({
        query,
        variables,
      }),

      cache: "no-store",
    });

    const result = await response.json();

    console.log("GRAPHQL RESULT:", result);

    const categoriesData = result?.data?.getProducts?.data;

    if (!categoriesData) {
      throw new Error(result?.message || "Invalid GraphQL response");
    }

    const formattedMenu: FormattedMenu = {
      categories: [],
      items: [],
    };

    if (Array.isArray(categoriesData)) {
      categoriesData.forEach((category: any) => {
        formattedMenu.categories.push({
          id: category.id,
          name: category.cat_name,
          image: category.cat_image,
        });

        category.sub_categories?.forEach((subCategory: any) => {
          subCategory.products?.forEach((product: any) => {
            let variations: any[] = [];

            if (product.variation_list) {
              try {
                const parsed = JSON.parse(product.variation_list);

                variations = parsed.map((v: any) => ({
                  id: v.id,
                  name: v.name,
                  price: parseFloat(v.price || 0),
                  is_default: v.default_price === "1",
                }));
              } catch {}
            }

            formattedMenu.items.push({
              id: product.id,
              name: product.prod_name,
              description: product.spl_notes || "",
              price: parseFloat(product.price || 0),
              category_id: category.id,
              category_name: category.cat_name,
              sub_category: subCategory.sub_cat_name,
              type: product.type,
              image: product.product_img || "",
              is_available:
                product.is_active === "1" && product.is_enable === "1",
              is_online_enabled: product.is_enable_online === "1",
              variations,
              has_variations: variations.length > 0,
              has_addons: product.is_addon_group_enabled === "1",
            });
          });
        });
      });
    }

    return formattedMenu;
  } catch (error) {
    console.error("MENU SERVICE ERROR:", error);
    throw error;
  }
}
