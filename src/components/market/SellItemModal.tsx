import React, { useContext, useEffect, useState } from "react";
import { sellItem } from "../../services/market/MarketSercive";
import { getInventory } from "../../services/users/UserServices";
import UserContext from "../../UserContext";
import Item from "../Item";
import MainButton from "../MainButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setRefresh?: (value: boolean) => void;
}

interface InventoryItem {
  _id: string;
  name: string;
  image: string;
  rarity: number;
}

interface Inventory {
  totalPages: number;
  currentPage: number;
  items: InventoryItem[];
}

const SellItemModal: React.FC<Props> = ({ isOpen, onClose, setRefresh }) => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [inventory, setInventory] = useState<Inventory>();
  const [invItems, setInvItems] = useState<InventoryItem[]>([]);
  const [loadingInventory, setLoadingInventory] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const { userData } = useContext(UserContext);

  const handleSubmit = async () => {
    setLoadingButton(true);
    try {
      await sellItem(selectedItem, price);
      setRefresh && setRefresh(true);
      onClose();
    } catch (error) {
      console.log(error);
    }
    setLoadingButton(false);
  };

  const getInventoryInfo = async (newPage?: boolean) => {
    try {
      !newPage && setLoadingInventory(true);
      const response = await getInventory(
        userData.id,
        newPage ? (inventory && inventory.currentPage + 1) || 1 : 1
      );
      setInventory(response);
      newPage
        ? setInvItems((prev) => [...prev, ...response.items])
        : setInvItems(response.items);
    } catch (error) {
      console.log(error);
    }
    setLoadingInventory(false);
  };

  useEffect(() => {
    if (isOpen) {
      getInventoryInfo(true);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed  flex items-center justify-center w-screen z-50 ">
      <div className="bg-[#17132B] p-8 rounded w-[800px] h-[680px]">
        <h2 className="text-lg font-semibold mb-2">Sell an Item</h2>
        <div className="flex justify-between">
          <div className="mb-4 w-1/2">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Set Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              min={0}
              placeholder="Price in CP"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          {selectedItem && (
            <div className="flex  items-center">
              <span className="text-white text-lg font-semibold mr-2">
                {selectedItem.name}
              </span>
              <img src={selectedItem.image} alt="" className=" h-20" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center overflow-auto max-h-[450px]">
          {loadingInventory ? (
            <div>Loading...</div>
          ) : (
            invItems.map((item, index) => (
              <div
                className="w-1/4 p-2 cursor-pointer"
                key={item._id + index}
                onClick={() => setSelectedItem(item)}
              >
                <Item item={item} />
              </div>
            ))
          )}

          {inventory && inventory.currentPage < inventory.totalPages && (
            <div className="w-60 self-center">
              {" "}
              <MainButton
                onClick={() => getInventoryInfo(true)}
                text="Load More"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 mt-4">
          {" "}
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Close
          </button>{" "}
          <div className="w-44">
            <MainButton
              text="Sell Item"
              onClick={handleSubmit}
              loading={loadingButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellItemModal;
