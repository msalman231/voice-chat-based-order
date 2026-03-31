import { FormattedMenu, Variation } from "@/types/menu.types";

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
      type RawVariation = Record<string, unknown>;
      type RawProduct = {
        id?: string;
        prod_name?: string;
        spl_notes?: string;
        price?: string | number;
        type?: string;
        product_img?: string;
        is_active?: string;
        is_enable?: string;
        is_enable_online?: string;
        variation_list?: string;
        is_addon_group_enabled?: string;
      };

      type RawSubCategory = {
        sub_cat_name?: string;
        products?: RawProduct[];
      };

      type RawCategory = {
        id?: string;
        cat_name?: string;
        cat_image?: string;
        sub_categories?: RawSubCategory[];
      };

      categoriesData.forEach((category: RawCategory) => {
        formattedMenu.categories.push({
          id: String(category.id ?? ""),
          name: String(category.cat_name ?? ""),
          image: category.cat_image,
        });

        category.sub_categories?.forEach((subCategory: RawSubCategory) => {
          subCategory.products?.forEach((product: RawProduct) => {
            let variations: Variation[] = [];

            if (product.variation_list) {
              try {
                const parsed = JSON.parse(
                  product.variation_list,
                ) as RawVariation[];

                variations = parsed.map((v: RawVariation) => {
                  const id = String(v.id ?? "");
                  const name = String(v.name ?? "");
                  const price = parseFloat(String(v.price ?? "0"));
                  const is_default = String(v.default_price ?? "") === "1";

                  return { id, name, price, is_default } as Variation;
                });
              } catch {}
            }

            formattedMenu.items.push({
              id: String(product.id ?? ""),
              name: String(product.prod_name ?? ""),
              description: product.spl_notes || "",
              price: parseFloat(String(product.price ?? "0")),
              category_id: String(category.id ?? ""),
              category_name: String(category.cat_name ?? ""),
              sub_category: String(subCategory.sub_cat_name ?? ""),
              type: String(product.type ?? ""),
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
