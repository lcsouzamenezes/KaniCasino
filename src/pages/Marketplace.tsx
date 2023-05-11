import React, { useEffect, useState } from "react";
import ItemCard from "../components/market/MarketItem";
import { getItems } from "../services/market/MarketSercive";
import SellItemModal from "../components/market/SellItemModal";
import MainButton from "../components/MainButton";
import Title from "../components/Title";
import ConfirmPurchaseModal from "../components/market/ConfirmPuchaseModal";

interface MarketItem {
  _id: string;
  sellerId: string;
  item: {
    _id: string;
    name: string;
    image: string;
  };
  price: number;
  itemName: string;
  itemImage: string;
  __v: number;
}

interface ItemData {
  totalPages: number;
  currentPage: number;
  items: MarketItem[];
}

const Marketplace: React.FC = () => {
  const [items, setItems] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openSellModal, setOpenSellModal] = useState<boolean>(false);
  const [openBuyModal, setOpenBuyModal] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const defaultItem: MarketItem = {
    _id: "",
    sellerId: "",
    item: {
      _id: "",
      name: "",
      image: "",
    },
    price: 0,
    itemName: "",
    itemImage: "",
    __v: 0,
  };

  const [selectedItem, setSelectedItem] = useState<MarketItem>(defaultItem);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const items = await getItems(1);
      setItems(items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (refresh) {
      fetchItems();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div className="flex flex-col w-screen items-center justify-center">
      <SellItemModal
        isOpen={openSellModal}
        onClose={() => setOpenSellModal(false)}
        setRefresh={setRefresh}
      />
      <ConfirmPurchaseModal
        isOpen={openBuyModal}
        onClose={() => setOpenBuyModal(false)}
        item={selectedItem}
        setRefresh={setRefresh}
      />
      <div className="flex items-center justify-center w-full max-w-[1600px] relative">
        <Title title="Marketplace" />
        <div className="absolute right-0">
          <div className="w-52">
            {" "}
            <MainButton
              onClick={() => setOpenSellModal(true)}
              text="Sell an item"
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap items-center gap-4 justify-center">
          {items &&
            items.items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                click={() => {
                  setSelectedItem(item);
                  setOpenBuyModal(true);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
