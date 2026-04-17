import { defineStore } from "pinia"
import { CategoryService } from "../services/CategoryService.js"

// instância do service (mantém separado da store)
const service = new CategoryService()

export default defineStore("category", {
    
    // estado reativo
    state: () => ({
        loading: false,
        error: null,
        products: []
    }),

    // ações (equivalente aos métodos da sua classe)
    actions: {
        async getById(id) {
            try {
                this.loading = true
                this.error = null

                const category = await service.getById(id)

                console.log("category", category)

                // ajusta conforme sua API
                this.products = category.data.result

            } catch (error) {
                console.error("Erro ao buscar categoria:", error)
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})