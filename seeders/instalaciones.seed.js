import models from "../src/models/index.js";
const { instalaciones } = models;

export default async function seedInstalaciones() {
  console.log("🌱 Seeding Instalaciones...");

  await instalaciones.bulkCreate(
    [
      {
        id: 1,
        name: "JUAN MOSCOSO",
        latitude: -11.93820238292849,
        longitude: -76.9917686589275,
        images: [
          "https://i0.wp.com/camposdeportivosla10.wordpress.com/wp-content/uploads/2018/05/cede_anga_estadio_muni_005.jpg?ssl=1",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],

        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos", "Vestuarios"]
      },
      {
        id: 2,
        name: "PALMERAS",
        latitude: -11.99906693476323,
        longitude: -77.00314048518821,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipPJ9rMT0YmkqglMX89vRUBqNY1aCX-ja22Pp_WD=s387-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],

        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 3,
        name: "CHONTA",
        latitude: -11.96725483583813,
        longitude: -77.00195750912948,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipOZk5PpK3HXzvKTy8BD921D3NkmA_uGHpJDXh0r=w203-h114-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 3.3,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos", "Vestuarios"]
      },
      {
        id: 4,
        name: "COCHARCAS",
        latitude: -11.967546876052666,
        longitude: -76.98783086918472,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipOuTNQMXeDCXtP5vtoM2uOgbXPdT8skq161TkEC=w426-h240-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos"]
      },
      {
        id: 5,
        name: "LOS JARDINES",
        latitude: -12.011307428419716,
        longitude: -77.00424698267695,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipNwaH_5oDsKD-W4ak5NeCjmDz7S2WW9dadSieFD=w203-h270-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 3.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 6,
        name: "SAN CARLOS",
        latitude: -11.988312589605714,
        longitude: -77.00590578029356,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipMlA-5Uk9Afk02kFqAUXVmTwhlTgcRtlVTiH-9t=w203-h114-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol"],
        servicios: ["Servicios Higiénicos"]
      },
      {
        id: 7,
        name: "JOSE CARLOS MARIÁTEGUI",
        latitude: -11.93844432505125,
        longitude: -76.98844979748874,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipMN6BY0pxFYYBoIRH_eQ4NycWt4dIGmKY3OBBpZ=w203-h114-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 3.0,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 8,
        name: "NUEVA GENERACIÓN",
        latitude: -11.959124884534562,
        longitude: -76.99628710608631,
        images: [
          "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=k1Re0FaGAH-yBDKaIs8R1g&cb_client=maps_sv.tactile.gps&w=203&h=100&yaw=157.29813&pitch=0&thumbfov=100",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 9,
        name: "ISRAEL",
        latitude: -11.972921932105368,
        longitude: -76.98750121593955,
        images: [
          "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=FO8Cu6YHY_5Tgj79eyWDYQ&w=588&h=290&thumb=2&yaw=259.0392&pitch=0",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 3.2,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos", "Vestuarios"]
      },
      {
        id: 10,
        name: "JAVIER HERAUD",
        latitude: -12.022901127291291,
        longitude: -76.99520875340502,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipOfbt6kfiaXwxTjH5b0o6TRj7mVw1f9ah9xYyWZ=w203-h114-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos", "Vestuarios"]
      },
      {
        id: 11,
        name: "HUANCARAY",
        latitude: -11.96671140693121,
        longitude: -76.98977978829532,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipPnL2-htI1RIwuBTnZKOKRY-cPmKwb9Sp0vgg5Q=w203-h152-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.8,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 12,
        name: "MOTUPE",
        latitude: -11.934787278638401,
        longitude: -76.9762629201744,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipNS6goItcGys5HYgkPZNZSRMSDfc2vflysupr9v=w203-h114-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco"]
      },
      {
        id: 13,
        name: "PRIMERO DE MAYO (SEPILOMA)",
        latitude: -11.942073155417003,
        longitude: -76.97054898578405,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipOltIrZnzvjJlEMaEzgzhZKYF2z_uBCeSEh1Wv4=w203-h152-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 14,
        name: "MONTEVERDE",
        latitude: -11.935581398683256,
        longitude: -76.96917615701206,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipMHagoV3Ks3HfUWqAuJjMY2A2vY6tw7ktFmVD5r=w203-h116-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.3,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 15,
        name: "TOTORITAS",
        latitude: -11.995770408336769,
        longitude: -76.99720831800995,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipP4vbPyLizp_9fVVMKDOc_nzUESw4bWgPlbqEf6=w203-h152-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.2,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Chalecos"]
      },
      {
        id: 16,
        name: "SAN BENITO",
        latitude: -12.009616809562981,
        longitude: -77.01281205274525,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipMogYWSS9CcZYH5O6XqX6TZvWpuefJAGlCF6Ulb=w203-h152-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.0,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 17,
        name: "MARACANÁ",
        latitude: -11.950300064517002,
        longitude: -76.99272691217266,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipPF9K7r677v-kaEaD_ECj4zBpaqmd5wLCjLNAqR=w203-h152-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 3.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 18,
        name: "CHALAN",
        latitude: -12.012411498313195,
        longitude: -76.96422736137481,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipMTBLuU8Y1-GhVqI7vTL3IOE-Y9oqY9pLppMHlx=w203-h152-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.5,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Basquet"],
        servicios: ["Servicios Higiénicos", "Quiosco", "Chalecos"]
      },
      {
        id: 19,
        name: "LA 49",
        latitude: -12.026562334120877,
        longitude: -77.0202870648721,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipNchvv7mpvfAKY9mj1JNaXAOIRdoqY-UfAT3f18=w222-h100-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 3.8,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos", "Chalecos"]
      },
      {
        id: 20,
        name: "SAN MARCOS",
        latitude: -11.966365639586655,
        longitude: -77.0138657460311,
        images: [
          "https://lh5.googleusercontent.com/p/AF1QipOREvkcbKjfAMXAfvQ-UHm-neYMn0C0QPYHVgHv=w203-h114-k-no",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zd73RvDBdMFd-k73yPRzu_IaUSIsavwQ7w&s",
        ],
        rating: 4.0,
        id_admin: 1,
        address: "Av. Santa Rosa 5412",
        sports: ["Futbol", "Voley", "Basquet"],
        servicios: ["Servicios Higiénicos"]
      },
    ],
    { ignoreDuplicates: true }
  );

  console.log("✅ Instalaciones seeded successfully!");
}
