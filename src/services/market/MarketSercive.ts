import api from '../api';

export async function getItems(page: number) {
    const response = await api.get(`/marketplace/?page=${page}&limit=30`);
    return response.data;
}

export async function sellItem(item: any, price: number) {
    const response = await api.post(`/marketplace/ `, {
        item,
        price
    });

    return response.data;
}

export async function buyItem(id: number) {
    const response = await api.post(`/marketplace/buy/${id}`);

    return response.data;
}

