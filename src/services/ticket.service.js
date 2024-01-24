import ticketDao from "../daos/mongodb/ticket.dao.js";
const ticketDAO = new ticketDao();

export const createTicket = async (info) => {
  try {
    return await ticketDAO.createTicket(info);
  } catch (error) {
    console.log(error);
  }
};
