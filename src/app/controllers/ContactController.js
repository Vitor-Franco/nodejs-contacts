const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({
        error: 'User not found',
      });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar um novo registro

    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactsExists = await ContactsRepository.findByEmail(email);

    if (contactsExists) {
      return response.status(400).json({ error: 'This email already in use' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // Atualizar um registro
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactsExists = await ContactsRepository.findById(id);

    if (!contactsExists) {
      return response.status(400).json({ error: 'User not found' });
    }

    const contactByEmailExists = await ContactsRepository.findByEmail(email);

    if (contactByEmailExists && contactByEmailExists.id !== id) {
      return response.status(400).json({ error: 'This email already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
