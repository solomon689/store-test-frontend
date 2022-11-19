# store-test-frontend
Tienda online construida con HTML, bootstrap y vanillaJS. Esta tienda tiene como objetivo ofrecer diferentes tipos de comidas, dandole la facilidad al cliente de filtrarlos por sus categorias
o más bien, buscar uno o más productos en específico.

### Visitar sitio web
https://store-test-frontend-teal.vercel.app/src/pages/index.html

### Actualización
- Al buscar un producto la página no se recargará. Se mantendrá en el mismo documento y los datos serán cargados de acuerdo con los parámetros de búsqueda.
- Al cambiar de página (por medio de la paginación), esta no recargará el sitio web, si no que volverá a cargar los productos de acuerdo con los parámetros indicados.
- Al apretar los botones de siguiente y retroceso del componente de paginación, no avanzará más allá del total de páginas y no retrocederá más alla del mínimo (1).
- Al buscar un producto se agregará una breve descripción por encima de las cartas de los productos, indicándole al usuario lo que buscó.

### Tecnologias utilizadas
Para la construcción de este proyecto se utilizaron tecnologías “puras”, es decir, sin frameworks a excepción de uno. Estas tecnologías son HTML, CSS, javascript y Bootstrap en su versión 5.2.2 para la rápida realización de componentes y clases CSS.

### Estructura del proyecto
![alt text](https://res.cloudinary.com/dnh6zyzds/image/upload/v1668289822/estructura_acnarh.png)

- **assets**: Aqui se organizan los archivos para css y javascript que seran utilizados en el sitio web.
  - **css**: Aqui se encuentran los archivos css utilizados.
  - **javascript**: Aqui se encuentra los archivos escritos en javascript.
    - **components**: Aqui se guardan componentes que pueden ser reutilizados globalmente dentro del proyecto.
    - **helpers**: Aqui se guardan funcionalidades de ayuda utilizados globalmente dentro del proyecto.
- **pages**: Aqui se encuentran los archivos html de cada página.
