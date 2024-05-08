export const categories = [
    {
        id: 1,
        category: "Desayuno",
    },
    {
        id: 2,
        category: "Comida",
    },
    {
        id: 3,
        category: "Cena",
    },
    {
        id: 4,
        category: "Colación",
    },
    {
        id: 5,
        category: "Vegetariana",
    },
    {
        id: 6,
        category: "Italiana",
    },
    {
        id: 7,
        category: "Asiática",
    },
    {
        id: 8,
        category: "Mexicana",
    },
        
];

export const recipeData = [
    {
        id: 1,
        imagenes: [
          {
            id: 1,
            imagen: require("./../../assets/Hamburguesa.jpg"),
            receta: 1
          }
        ],
        ingredientes: [1, 2],
        nombre_receta: "Hamburguesa",
        calorias: 500,
        origen_receta: "Estados Unidos",
        tipo_comida: "Almuerzo",
        dificultad: "Fácil",
        pasos: "1. Cocina la carne.\n 2. Arma la hamburguesa con los ingredientes. \n3. Disfruta.",
        tiempo: "20 min",
        calificacion: "5"
      },
      {
        id: 2,
        imagenes: [
          {
            id: 1,
            imagen: require("./../../assets/ensalada_cesar.jpg"),
            receta: 2
          }
        ],
        ingredientes: [3, 4],
        nombre_receta: "Ensalada César",
        calorias: 300,
        origen_receta: "Italia",
        tipo_comida: "Almuerzo",
        dificultad: "Intermedio",
        pasos: "1. Prepara la lechuga y los crutones. 2. Agrega el aderezo. 3. Mezcla bien.",
        tiempo: "20 min",
        calificacion: "4.3"
      },
      {
        id: 3,
        imagenes: [
          {
            id: 1,
            imagen: require("./../../assets/flautas-de-pollo-recipe.jpg"),
            receta: 3
          }
        ],
        ingredientes: [1, 2],
        nombre_receta: "Flautas",
        calorias: 500,
        origen_receta: "México",
        tipo_comida: "Comida",
        dificultad: "Media",
        pasos: "1. Cocina la carne. 2. Arma la hamburguesa con los ingredientes. 3. Disfruta.",
        tiempo: "20 min",
        calificacion: "3.2"
      },
      {
        id: 4,
        imagenes: [
          {
            id: 1,
            imagen: require("./../../assets/camarones-la-diabla.jpg"),
            receta: 4
          }
        ],
        ingredientes: [1, 2],
        nombre_receta: "Camarones a la diabla",
        calorias: 500,
        origen_receta: "México",
        tipo_comida: "Comida",
        dificultad: "Alta",
        pasos: "1. Cocina la carne. 2. Arma la hamburguesa con los ingredientes. 3. Disfruta.",
        tiempo: "20 min",
        calificacion: "3.9"
      },
      {
        id: 5,
        imagenes: [
          {
            id: 1,
            imagen: require("./../../assets/tacos_veganos.jpg"),
            receta: 1
          }
        ],
        ingredientes: [1, 2],
        nombre_receta: "Tacos de lentejas",
        calorias: 500,
        origen_receta: "Desconocido",
        tipo_comida: "Almuerzo",
        dificultad: "Fácil",
        pasos: "1. Cocina la carne. 2. Arma la hamburguesa con los ingredientes. 3. Disfruta.",
        tiempo: "20 min",
        calificacion: "3.6"
      },
      {
        id: 6,
        imagenes: [
          {
            id: 1,
            imagen: require("./../../assets/tiramisu.jpg"),
            receta: 6
          }
        ],
        ingredientes: [1, 2],
        nombre_receta: "Tiramisú",
        calorias: 500,
        origen_receta: "Italia",
        tipo_comida: "Postre",
        dificultad: "Fácil",
        pasos: "1. Cocina la carne. 2. Arma la hamburguesa con los ingredientes. 3. Disfruta.",
        tiempo: "20 min",
        calificacion: "5"
      },
      // Puedes agregar más recetas aquí
];