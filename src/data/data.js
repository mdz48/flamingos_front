export const data = {
  navhome: [
    {
     site: "Home",
     URL: "/"
    },
    {
      site: "Contacto",
      URL: "/contact"
     },
     {
      site: "Cotizar",
      URL: "/cotizacion"
     },
     {
     site:"Login",
     URL:"/login"
     },
  ],
  cards: [
    {
      image: 'card1.jpg',
      head: "Celebra tu boda deseada con nosotros!",
      text: 'Sumérgete en un entorno mágico y romántico. Ofrecemos paquetes personalizados que transformarán tu día especial en una experiencia inolvidable. ¡Haz realidad la boda de tus sueños con nosotros!',
    },
    {
      image: 'public/Information/chula_vista_birthday_image.jpg',
      head: "Cumpleaños",
      text: '¡Haz que tu cumpleaños sea memorable! Disfruta de una fiesta llena de sorpresas y momentos inolvidables en un ambiente encantador. ¡Celebra con estilo y alegría!',
    },
    {
      image: 'Slider2.jpg',
      head: 'Reuniones',
      text: 'Organiza tus reuniones en un lugar único y especial. Ofrecemos el escenario perfecto para cualquier tipo de evento, desde reuniones íntimas hasta grandes celebraciones. ¡Crea recuerdos inolvidables con nosotros!'
    }
  ],
  links: [
    {
      site: "Facebook",
      link: "https://www.facebook.com/SalonFlamingosTuxtla"
    },
    {
      site: "Instagram",
      link: "https://www.instagram.com/salonflamingos/"
    }
  ],
  salones: [
    {
      title: 'Flamingo',
      services: `
        Evento por 6 horas con banquete a dos tiempos que incluye entrada, plato fuerte, botanas, refrescos de Coca Cola y hielos, mobiliario, sillas tiffany, mantelería, loza y cristalería. Personal: encargado de salón, capitán de meseros, meseros y ayudante de cocina. Precio desde $259 por persona. Servicios adicionales: decoración floral y de globos, música DJ y pista.
      `,
      image: '/Information/flamingos_salon_presentation_image.jpg'
    },
    {
      title: 'Chula Vista ',
      services: `
        Evento por 6 horas con banquete a dos tiempos que incluye entrada, plato fuerte, botanas, refrescos de Coca Cola y hielos, mobiliario, sillas tiffany, mantelería, loza y cristalería. Personal: encargado de salón, capitán de meseros, meseros y ayudante de cocina. Precio desde $259 por persona. Servicios adicionales: decoración floral y de globos, música DJ y pista.
      `,
      image: '/Information/chulavista_love_image.jpg'
    }
  ],
  packages: [
    {
      title: "Básico",
      price: "MXN $259 por persona",
      features: [
        "💥 Entrada de cremas.",
        "💥 Plato fuerte con dos guarniciones.",
        "💥 Pan o tortilla",
        "💥 Meseros",
        "💥 Botanas a dos tiempos",
        "💥 Mobiliario (Sillas Tiffany) y Mantelería",
        "💥 Loza y Cristalería",
        "💥 Agua mineral",
        "💥 Refresco de la marca coca cola",
        "💥 Prueba de platillo 2 opciones",
        "💥 Uso de las instalaciones por 6 horas",
        "💥 Uso de Alberca"
      ]
    },
    {
      title: "Premium",
      price: "MXN 369 por persona",
      features: [
        "💥 Banquete",
        "💥 Entrada de cremas",
        "💥 Plato fuerte con dos guarniciones.",
        "💥 Pan o tortilla",
        "💥 Meseros",
        "💥 Botanas",
        "💥 Mobiliario y Mantelería (Sillas Tiffany)",
        "💥 Loza y Cristalería",
        "💥 Refresco y agua mineral sin límite por 6 horas.",
        "💥 Hielos",
        "💥 Prueba de platillo 2 opciones",
        "💥 Uso de las instalaciones por 6 horas",
        "💥 Uso de Alberca",
        "💥 Set de fotos",
        "💥 Mesa de honor",
        "💥 Luces en el techo",
        "💥 Flores en el techo",
        "💥 Arco de entrada"
      ]
    },
    {
      title: "Personalizado",
      price: "Varía según el número de personas",
      features: [
        "💥 Mobiliario y mantelería",
        "💥 Mesas de jardín",
        "💥 Uso de Alberca",
        "💥 Estufa",
        "💥 Hielera",
        "💥 Refrigerador",
        "💥 WiFi",
        "💥 6 horas de servicio",
        "💥 Tiempo para decorar el salón, o meter bebidas y alimentos."
      ]
    }
  ],
  footer: {
    flamingos: {
      name: "Flamingos",
      address: "Plaza Poliforum; Calle Halcón #371 Col. Los Pájaros",
      phone: "961 451 2438"
    },
    chulavista: {
      name: "Chula Vista",
      address: "Plaza Poliforum; Calle Halcón #371 Col. Los Pájaros",
      phone: "961 217 6999"
    },
    socialLinks: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/SalonFlamingosTuxtla",
        icon: "FaFacebook"
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/salonflamingos/",
        icon: "FaInstagram"
      }
    ]
  },
  preciosSalones: {
    flamingos: 3500,
    chulaVista: 2600,
  },
  preciosPaquetes: {
    flamingos: 259,
    premium: 369,
    personalizado: 0 // Asume que personalizado tiene un precio dinámico
  },
};

export const headers = ['Moviliario', 'Cantidad', 'Estado', 'Id'];
export const rows = [
  [
    { content: 'sillas', className: 'text-center' },
    { content: 25, className: 'text-center' },
    { content: 'rotas', className: 'text-center' },
    { content: '123', className: 'text-center' },
  ],
  [
    { content: 'mesas', className: 'text-center' },
    { content: 28, className: 'text-center' },
    { content: 'buen estado', className: 'text-center' },
    { content: '345', className: 'text-center' },
  ],
];
export const insumos = ['Nombre', 'Cantidad', 'Precio c/u', 'Id', 'Descripcion'];
export const infoData = [
  'En Flamingos, te ofrecemos estupendos destinos, instalaciones accesibles y el mejor servicio para que tus eventos sean inolvidables.',
  'Ya sea que estés organizando reuniones sociales como bautizos, cumpleaños o bodas, o bien conferencias, congresos y juntas de trabajo, nuestros amplios y flexibles salones están a tu disposición.',
];
export const content = [
  [
    { content: 'spageti', className: 'text-center' },
    { content: 25, className: 'text-center' },
    { content: '50', className: 'text-center' },
    { content: '123', className: 'text-center' },
    { content: 'pasta hecha a mano', className: 'text-center' },
  ],
  [
    { content: 'pechugas', className: 'text-center' },
    { content: 28, className: 'text-center' },
    { content: '60', className: 'text-center' },
    { content: '345', className: 'text-center' },
    { content: 'pechuga rellena de queso', className: 'text-center' },
  ],
];