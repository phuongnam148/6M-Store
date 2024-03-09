export const formatProducts = (prods) => {
    return prods.map((prod) => ({
        id: prod.id,
        category: prod.attribute_list.category,
        images: prod.product_description.description_assets.image_url,
        cover: prod.product_description.description_assets.image_url,
        price: prod.pricing_information.currentPrice,
        title: prod.name,
        badge_text: prod.attribute_list.badge_text,
    }));
};
