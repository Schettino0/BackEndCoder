import { TicketModel } from "./models/ticket.model.js";

export default class ticketDao {
  async createTicket(info) {
    try {
      const response = await TicketModel.create(info);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
