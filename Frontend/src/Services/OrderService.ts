import axios from "axios";
import { OrderModel } from "../Models/OrderModel";
import { appConfig } from "../Utils/AppConfig";

class OrdersService {
  public async getAllOrders(): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(appConfig.ordersUrl);
    const orders = response.data;
    return orders;
  }

  public async getAllOrdersByUserId(userId: string): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(
      appConfig.ordersUrl + userId
    );
    const ordersByUser = response.data;
    return ordersByUser;
  }

  public async getOneOrder(_id: string): Promise<OrderModel> {
    const response = await axios.get<OrderModel>(appConfig.ordersUrl + _id);
    const order = response.data;
    return order;
  }

  public async addOrder(order: OrderModel): Promise<void> {
    await axios.post<OrderModel>(appConfig.ordersUrl, order);
  }

  public async updateOrder(order: OrderModel): Promise<void> {
    await axios.put<OrderModel>(appConfig.ordersUrl + order._id, order);
  }

  public async deleteOneOrder(_id: string): Promise<void> {
    await axios.delete<OrderModel>(appConfig.ordersUrl + _id);
  }
}

export const ordersService = new OrdersService();
