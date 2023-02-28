const Messages = require("../models/messages.model");

class MessageServices {
  static async getByUserAndConversation(car_id, sender_id) {
    try {
      const result = await Messages.findAll({
        where: { car_id: car_id, sender_id: sender_id },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async sendMessage(body) {
    try {
      const result = await Messages.create(body);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async editMessage(newMessage, id) {
    try {
      const message = await Messages.findOne({ where: { id } });

      if (!message) {
        throw new Error("Mensaje no encontrado");
      }

      await message.update(newMessage);

      return message;
    } catch (error) {
      throw error;
    }
  }
  static async deleteMessage(id) {
    try {
      const result = await Messages.destroy({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessageServices;
