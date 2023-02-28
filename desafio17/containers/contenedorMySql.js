
export default class ContenedorMySql {
    #client
    #table
    constructor(client, table) {
      this.#client = client
      this.#table = table
    }
  
    async save(item) {
      try {
        await this.#client(this.#table).insert(item)
      } catch (err) {
        throw new Error(err)
      }
    }
  
    async getAll() {
      try {
        return this.#client(this.#table).select()
      } catch (err) {
        throw new Error(err)
      }
    }
  
    async getById(id) {
      try {
        const allItems = await this.getAll();
        return allItems.find(item => item.id === id)
      } catch (err) {
        throw new Error(err)
      }
    }
  
    async updateById(id, item) {
      try {
        await this.#client(this.#table).update(item).where('id', id)
      } catch (err) {
        throw new Error(err)
      }
    }
  
    async deleteAll() {
      try {
        await this.#client(this.#table).delete()
      } catch (err) {
        throw new Error(err)
      }
    }
  
    async deleteById(id) {
      try {
        await this.#client(this.#table).delete().where('id', id)
      } catch (err) {
        throw new Error(err);
      }
    }
  }