import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MENU_URL } from "../utils/constants";

const ResturantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_URL + resId);
      const json = await data.json();
      setResInfo(json);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  // Extract restaurant name and cuisines
  const restaurantInfo = resInfo?.data?.cards?.[2]?.card?.card?.info;
  const restaurantName = restaurantInfo?.name || "Restaurant";
  const cuisines = restaurantInfo?.cuisines?.join(", ") || "Various";
  const imageId = restaurantInfo?.imageId

  // Extract item cards
  const menuCards =
    resInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const itemCards = menuCards.flatMap((card) => card?.card?.card?.itemCards || []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{restaurantName}</h1>
      <h2>{cuisines}</h2>
      <h3>Menu</h3>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}        
      </ul>
    </div>
  );
};

export default ResturantMenu;
