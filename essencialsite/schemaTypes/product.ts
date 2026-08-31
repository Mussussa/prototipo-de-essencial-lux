export default {
  name: 'product',
  title: 'Produtos',
  type: 'document',
  fields: [

    { name: 'name', title: 'Nome do Produto', type: 'string' },
    { name: 'price', title: 'Preço (MZN)', type: 'number' },
    { 
      name: 'category', 
      title: 'Categoria', 
      type: 'string',
      options: {
        list: [
          { title: 'Camisas', value: 'Camisas' },
          { title: 'Calças', value: 'Calças' },
          { title: 'Relógios', value: 'Relógios' },
          { title: 'Carteiras', value: 'Carteira' },
          { title: 'Calçados', value: 'Calçados' },
          { title: 'Bolsas', value: 'Bolsas' },
          { title: 'Calcões', value: 'calcões' }
        ],
        layout: 'dropdown'
      }
    },
    { 
      name: 'subcategory', 
      title: 'Subcategoria', 
      type: 'string',
      options: {
        list: [
          { title: 'Manga Comprida', value: 'Manga comprida' },
          { title: 'Manga Curta', value: 'Manga curta' },
          { title: 'Social', value: 'Social' },
          { title: 'Desportivos', value: 'Desportivos' },
          { title: 'Clássicos', value: 'Clássicos' },
          { title: 'Casual', value: 'Casual' }
        ],
        layout: 'dropdown'
      }
    },
    { name: 'description', title: 'Descrição', type: 'text' },
    { 
      name: 'badge', 
      title: 'Etiqueta (Badge)', 
      type: 'string',
      initialValue: true,

      options: {
        list: [
          { title: 'Disponível', value: 'Disponivel' },
          { title: 'Indisponível', value: 'indsponivel' }
        ],
        layout: 'radio' 
      }
    },
    { name: 'available', title: 'Disponível em Stock', type: 'boolean', initialValue: true },
    { name: 'image', title: 'Foto do Produto', type: 'image', options: { hotspot: true } },
  ],
}